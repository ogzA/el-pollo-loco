import { level1 } from "../levels/level1.js";
import { AudioHub } from "./audio-hub.class.js";
import { BottleBar } from "./bottle-bar.class.js";
import { Character } from "./character.class.js";
import { CoinBar } from "./coin-bar.class.js";
import { EndbossBar } from "./endboss-bar.class.js";
import { IntervalHub } from "./interval-hub.class.js";

import { HealthBar } from "./health-bar.class.js";
import { ThrowableObject } from "./throwable-object.class.js";

export class World {
	character = new Character();
	canvas;
	level = level1;
	ctx;
	keyboard;
	cameraX = 0;
	healthBar = new HealthBar();
	coinBar = new CoinBar();
	bottleBar = new BottleBar();
	endbossBar = new EndbossBar();
	throwableObjects = [];
	MAX_COINS = 20;
	gameOver = false;
	animationFrame;

	/**
	 * Creates the game world and starts drawing and the game logic.
	 * @param {HTMLCanvasElement} _canvas - canvas of the game
	 * @param {Keyboard} _keyboard - keyboard object
	 */
	constructor(_canvas, _keyboard) {
		this.ctx = _canvas.getContext("2d");
		this.canvas = _canvas;
		this.keyboard = _keyboard;
		this.setWorld();
		this.draw();
		this.run();
	}

	/**
	 * Gives the character a reference to the world.
	 */
	setWorld() {
		this.character.world = this;
	}

	/**
	 * Starts the interval that runs all checks of the game.
	 */
	run() {
		IntervalHub.startInterval(() => {
			this.checkCollisions();
			this.checkBottleCollisions();
			this.checkBottleChickenCollisions();
			this.removeBottles();
			this.checkThrowObjects();
			this.checkCollectableCollisions();
			this.checkEndbossAlert();
			this.checkCharacterDead();
		}, 50);
	}

	/**
	 * Checks if the character collects coins or bottles.
	 */
	checkCollectableCollisions() {
		for (let i = this.level.collectables.length - 1; i >= 0; i--) {
			const item = this.level.collectables[i];
			if (!this.character.isColliding(item)) continue;

			if (item.isCoin) {
				this.collectCoin(i);
			} else if (item.isBottle && this.character.canCollectBottle()) {
				this.collectBottle(i);
			}
		}
	}

	/**
	 * Collects a coin and updates the coin status bar.
	 * @param {number} i - index in the collectables array
	 */
	collectCoin(i) {
		this.character.coins++;
		this.level.collectables.splice(i, 1);
		this.coinBar.setPercentage(this.getCoinPercentage());
		AudioHub.playOne(AudioHub.COIN_COLLECT);
	}

	/**
	 * Collects a bottle and updates the bottle status bar.
	 * @param {number} i - index in the collectables array
	 */
	collectBottle(i) {
		this.character.bottles++;
		this.level.collectables.splice(i, 1);
		this.bottleBar.setPercentage(this.getBottlePercentage());
		AudioHub.playOne(AudioHub.BOTTLE_COLLECT);
	}

	/**
	 * Converts the bottles into a percentage.
	 * @returns {number} percentage for the status bar
	 */
	getBottlePercentage() {
		return (this.character.bottles / this.character.MAX_BOTTLES) * 100;
	}

	/**
	 * Converts the coins into a percentage.
	 * @returns {number} percentage for the status bar
	 */
	getCoinPercentage() {
		return (this.character.coins / this.MAX_COINS) * 100;
	}

	/**
	 * Throws a bottle when D is pressed, bottles are available and the character is allowed to throw.
	 */
	checkThrowObjects() {
		if (
			this.keyboard.D &&
			this.character.bottles > 0 &&
			this.character.canThrow()
		) {
			this.throwBottle();
		}
	}

	/**
	 * Creates a new bottle in front of the character and updates the status bar.
	 */
	throwBottle() {
		const bottle = new ThrowableObject(
			this.character.x + 100,
			this.character.y + 100,
			this.character.otherDirection,
		);
		this.throwableObjects.push(bottle);
		this.character.bottles--;
		this.character.lastThrow = new Date().getTime();

		this.bottleBar.setPercentage(this.getBottlePercentage());
	}

	/**
	 * Checks collisions with enemies: from above the enemy dies, otherwise the character gets damage.
	 */
	checkCollisions() {
		let stomped = false;
		this.level.enemies.forEach((enemy) => {
			if (enemy.isDead()) return;

			if (!enemy.isEndboss && this.character.isCollidingFromTop(enemy)) {
				enemy.die();
				stomped = true;
			} else if (this.canHurtCharacter(enemy)) {
				this.character.hit(enemy.damage);
				this.healthBar.setPercentage(this.character.energy);
			}
		});
		// Nach der Schleife springen, sonst zählt ein Nachbar-Huhn als seitlicher Treffer
		if (stomped) this.character.jump();
	}

	/**
	 * Checks if an enemy can hurt the character.
	 * @param {MovableObject} enemy - enemy
	 * @returns {boolean} true on a collision when the character is not hurt right now
	 */
	canHurtCharacter(enemy) {
		return this.character.isColliding(enemy) && !this.character.isHurt();
	}

	/**
	 * Checks if a bottle hits the endboss.
	 */
	checkBottleCollisions() {
		const boss = this.getEndboss();

		if (!boss) return;

		this.throwableObjects.forEach((bottle) => {
			if (bottle.isBroken) return;
			if (bottle.isColliding(boss)) {
				this.hitEndboss(bottle, boss);
			}
		});
	}

	/**
	 * The bottle breaks and the endboss gets damage. If the endboss is dead, the game is won.
	 * @param {ThrowableObject} bottle - thrown bottle
	 * @param {Endboss} boss - endboss
	 */
	hitEndboss(bottle, boss) {
		bottle.breakBottle();
		boss.hit();
		this.endbossBar.setPercentage(boss.energy);
		if (boss.isDead()) {
			this.endGame(true);
		}
	}

	/**
	 * Checks if a bottle hits a chicken. The chicken dies.
	 */
	checkBottleChickenCollisions() {
		this.throwableObjects.forEach((bottle) => {
			this.level.enemies.forEach((enemy) => {
				if (bottle.isBroken || enemy.isEndboss || enemy.isDead()) return;
				if (bottle.isColliding(enemy)) {
					bottle.breakBottle();
					enemy.die();
				}
			});
		});
	}

	/**
	 * Removes bottles after the splash animation or when they fell out of the screen.
	 */
	removeBottles() {
		for (let i = this.throwableObjects.length - 1; i >= 0; i--) {
			const bottle = this.throwableObjects[i];
			if (bottle.isSplashOver() || bottle.y > 480) {
				this.throwableObjects.splice(i, 1);
			}
		}
	}

	/**
	 * Starts the alert of the endboss when the character is close enough.
	 */
	checkEndbossAlert() {
		const boss = this.getEndboss();
		if (!boss || boss.isAlerted) return;
		if (this.character.x > boss.x - 500) {
			boss.startAlert();
		}
	}

	/**
	 * Ends the game as lost when the character is dead.
	 */
	checkCharacterDead() {
		if (this.character.isDead()) {
			this.endGame(false);
		}
	}

	/**
	 * Ends the game only once: after 1.5 seconds intervals, sounds and drawing stop and the end screen appears.
	 * @param {boolean} isWon - true if the game is won
	 */
	endGame(isWon) {
		if (this.gameOver) return;
		this.gameOver = true;
		setTimeout(() => {
			IntervalHub.stopAllIntervals();
			AudioHub.stopAll();
			cancelAnimationFrame(this.animationFrame);
			this.showEndScreen(isWon);
		}, 1500);
	}

	/**
	 * Shows the end screen with the win or game over image.
	 * @param {boolean} isWon - true if the game is won
	 */
	showEndScreen(isWon) {
		const endImage = document.getElementById("end-image");
		if (isWon) {
			endImage.src = "./assets/img/You won, you lost/You Won B.png";
			endImage.alt = "You won";
		} else {
			endImage.src = "./assets/img/You won, you lost/Game Over.png";
			endImage.alt = "Game over";
		}
		document.getElementById("end-screen").classList.remove("d-none");
	}

	/**
	 * Finds the endboss in the list of enemies.
	 * @returns {Endboss} the endboss
	 */
	getEndboss() {
		return this.level.enemies.find((enemy) => enemy.isEndboss);
	}

	/**
	 * Draws all objects and calls itself again with requestAnimationFrame.
	 * The order is important here! Note: the elements overlap.
	 */
	draw() {
		this.clearCanvas(this.canvas);
		this.ctx.translate(this.cameraX, 0);
		this.addObjectsToMap(this.level.backgroundObjects);
		this.addObjectsToMap(this.level.clouds);
		this.ctx.translate(-this.cameraX, 0); // Back
		this.drawFixedObjects();
		this.ctx.translate(this.cameraX, 0); // Forwardss
		this.drawMovableObjects();
		this.ctx.translate(-this.cameraX, 0);

		// Arrow Function bindet `this` an die World-Instanz.
		// Bei ...function(){this.draw}  ginge der Kontext verloren und die Schleife bricht ab.
		this.animationFrame = requestAnimationFrame(() => this.draw());
	}

	// -------------- Space for fixed objects ------------
	/**
	 * Draws the status bars that do not move with the camera.
	 */
	drawFixedObjects() {
		this.addToMap(this.healthBar);
		this.addToMap(this.coinBar);
		this.addToMap(this.bottleBar);
		this.addToMap(this.endbossBar);
	}

	/**
	 * Draws enemies, bottles, collectables and the character.
	 */
	drawMovableObjects() {
		this.addObjectsToMap(this.level.enemies);
		this.addObjectsToMap(this.throwableObjects);
		this.addObjectsToMap(this.level.collectables);
		this.addToMap(this.character);
	}

	/**
	 * Draws all objects of a list.
	 * @param {Array<DrawableObject>} objects - objects to draw
	 */
	addObjectsToMap(objects) {
		objects.forEach((o) => {
			this.addToMap(o);
		});
	}

	/**
	 * Draws an object and mirrors it when it looks to the left.
	 * @param {DrawableObject} mo - object to draw
	 */
	addToMap(mo) {
		if (mo.otherDirection) {
			this.flipImage(mo);
		}

		mo.draw(this.ctx);

		if (mo.otherDirection) {
			this.flipImageBack(mo);
		}
	}

	/**
	 * Mirrors the image for objects that look to the left.
	 * @param {DrawableObject} mo - object to mirror
	 */
	flipImage(mo) {
		this.ctx.save();
		this.ctx.translate(mo.width, 0);
		this.ctx.scale(-1, 1);
		mo.x = mo.x * -1;
	}

	/**
	 * Undoes the mirroring again.
	 * @param {DrawableObject} mo - mirrored object
	 */
	flipImageBack(mo) {
		mo.x = mo.x * -1;
		this.ctx.restore();
	}

	/**
	 * Clears the whole canvas before the next frame.
	 * @param {HTMLCanvasElement} canvas - canvas of the game
	 */
	clearCanvas(canvas) {
		this.ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
}
