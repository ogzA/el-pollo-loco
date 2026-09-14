import { level1 } from "../levels/level1.js";
import { AudioHub } from "./AudioHub.class.js";
import { BottleBar } from "./bottle-bar.class.js";
import { Character } from "./character.class.js";
import { CoinBar } from "./coin-bar.class.js";
import { EndbossBar } from "./endboss-bar.class.js";
import { IntervalHub } from "./intervalhub.class.js";

import { StatusBar } from "./status-bar.class.js";
import { ThrowableObject } from "./throwable-object.class.js";

export class World {
	character = new Character();
	canvas;
	level = level1;
	ctx;
	keyboard;
	camera_x = 0;
	statusBar = new StatusBar();
	coinBar = new CoinBar();
	bottleBar = new BottleBar();
	endbossBar = new EndbossBar();
	throwableObjects = [];
	MAX_COINS = 20;
	gameOver = false;
	animationFrame;

	constructor(_canvas, _keyboard) {
		this.ctx = _canvas.getContext("2d");
		this.canvas = _canvas;
		this.keyboard = _keyboard;
		this.setWorld();
		this.draw();
		this.run();
	}

	setWorld() {
		this.character.world = this;
	}

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

	collectCoin(i) {
		this.character.coins++;
		this.level.collectables.splice(i, 1);
		this.coinBar.setPercentage(this.getCoinPercentage());
		AudioHub.playOne(AudioHub.COIN_COLLECT);
	}

	collectBottle(i) {
		this.character.bottles++;
		this.level.collectables.splice(i, 1);
		this.bottleBar.setPercentage(this.getBottlePercentage());
		AudioHub.playOne(AudioHub.BOTTLE_COLLECT);
	}

	getBottlePercentage() {
		return (this.character.bottles / this.character.MAX_BOTTLES) * 100;
	}

	getCoinPercentage() {
		return (this.character.coins / this.MAX_COINS) * 100;
	}

	checkThrowObjects() {
		if (
			this.keyboard.D &&
			this.character.bottles > 0 &&
			this.character.canThrow()
		) {
			this.throwBottle();
		}
	}

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

	checkCollisions() {
		let stomped = false;
		this.level.enemies.forEach((enemy) => {
			if (enemy.isDead()) return;

			if (!enemy.isEndboss && this.character.isCollidingFromTop(enemy)) {
				enemy.die();
				stomped = true;
			} else if (this.canHurtCharacter(enemy)) {
				this.character.hit(enemy.damage);
				this.statusBar.setPercentage(this.character.energy);
			}
		});
		// Nach der Schleife springen, sonst zählt ein Nachbar-Huhn als seitlicher Treffer
		if (stomped) this.character.jump();
	}

	canHurtCharacter(enemy) {
		return this.character.isColliding(enemy) && !this.character.isHurt();
	}

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

	hitEndboss(bottle, boss) {
		bottle.breakBottle();
		boss.hit();
		this.endbossBar.setPercentage(boss.energy);
		if (boss.isDead()) {
			this.endGame(true);
		}
	}

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

	removeBottles() {
		for (let i = this.throwableObjects.length - 1; i >= 0; i--) {
			const bottle = this.throwableObjects[i];
			if (bottle.isSplashOver() || bottle.y > 480) {
				this.throwableObjects.splice(i, 1);
			}
		}
	}

	checkEndbossAlert() {
		const boss = this.getEndboss();
		if (!boss || boss.isAlerted) return;
		if (this.character.x > boss.x - 500) {
			boss.startAlert();
		}
	}

	checkCharacterDead() {
		if (this.character.isDead()) {
			this.endGame(false);
		}
	}

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

	getEndboss() {
		return this.level.enemies.find((enemy) => enemy.isEndboss);
	}

	// Reihenfolge ist hier wichtig! Hinweis: Überlappung der Elemente
	draw() {
		this.clearCanvas(this.canvas);
		this.ctx.translate(this.camera_x, 0);
		this.addObjectsToMap(this.level.backgroundObjects);
		this.addObjectsToMap(this.level.clouds);
		this.ctx.translate(-this.camera_x, 0); // Back
		this.drawFixedObjects();
		this.ctx.translate(this.camera_x, 0); // Forwardss
		this.drawMovableObjects();
		this.ctx.translate(-this.camera_x, 0);

		// Arrow Function bindet `this` an die World-Instanz.
		// Bei ...function(){this.draw}  ginge der Kontext verloren und die Schleife bricht ab.
		this.animationFrame = requestAnimationFrame(() => this.draw());
	}

	// -------------- Space for fixed objects ------------
	drawFixedObjects() {
		this.addToMap(this.statusBar);
		this.addToMap(this.coinBar);
		this.addToMap(this.bottleBar);
		this.addToMap(this.endbossBar);
	}

	drawMovableObjects() {
		this.addObjectsToMap(this.level.enemies);
		this.addObjectsToMap(this.throwableObjects);
		this.addObjectsToMap(this.level.collectables);
		this.addToMap(this.character);
	}

	addObjectsToMap(objects) {
		objects.forEach((o) => {
			this.addToMap(o);
		});
	}

	addToMap(mo) {
		if (mo.otherDirection) {
			this.flipImage(mo);
		}

		mo.draw(this.ctx);
		mo.drawFrame(this.ctx);

		if (mo.otherDirection) {
			this.flipImageBack(mo);
		}
	}

	flipImage(mo) {
		this.ctx.save();
		this.ctx.translate(mo.width, 0);
		this.ctx.scale(-1, 1);
		mo.x = mo.x * -1;
	}

	flipImageBack(mo) {
		mo.x = mo.x * -1;
		this.ctx.restore();
	}

	clearCanvas(canvas) {
		this.ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
}
