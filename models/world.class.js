import { level1 } from "../levels/level1.js";
import { BottleBar } from "./bottle-bar.class.js";
import { BottleObject } from "./bottle-object.class.js";
import { Character } from "./character.class.js";
import { CoinBar } from "./coin-bar.class.js";
import { EndbossBar } from "./endboss-bar.class.js";

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
	MAX_BOTTLES = 8;

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
		setInterval(() => {
			this.checkCollisions();
			this.checkBottleCollisions();
			this.checkThrowObjects();
			this.checkCollectableCollisions();
		}, 50);
	}

	checkCollectableCollisions() {
		for (let i = this.level.collectables.length - 1; i >= 0; i--) {
			const item = this.level.collectables[i];
			if (this.character.isColliding(item)) {
				this.character.bottles++;
				this.level.collectables.splice(i, 1);
				this.bottleBar.setPercentage(this.getBottlePercentage());
			}
		}
	}

	getBottlePercentage() {
		return (this.character.bottles / this.MAX_BOTTLES) * 100;
	}

	checkThrowObjects() {
		if (
			this.keyboard.D &&
			this.character.bottles > 0 &&
			this.character.canThrow()
		) {
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
	}

	checkCollisions() {
		this.level.enemies.forEach((enemy) => {
			if (this.character.isColliding(enemy) && !this.character.isHurt()) {
				this.character.hit();
				this.statusBar.setPercentage(this.character.energy);
			}
		});
	}

	checkBottleCollisions() {
		const boss = this.getEndboss();

		if (!boss) return;

		this.throwableObjects.forEach((bottle) => {
			if (bottle.isBroken) return;
			if (bottle.isColliding(boss)) {
				bottle.breakBottle();
				boss.hit();
				this.endbossBar.setPercentage(boss.energy);
			}
		});
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
		// -------------- Space for fixed objects ------------
		this.addToMap(this.statusBar);
		this.addToMap(this.coinBar);
		this.addToMap(this.bottleBar);
		this.addToMap(this.endbossBar);
		// -------------- Space for fixed objects ------------
		this.ctx.translate(this.camera_x, 0); // Forwardss

		this.addObjectsToMap(this.level.enemies);
		this.addObjectsToMap(this.throwableObjects);
		this.addObjectsToMap(this.level.collectables);
		this.addToMap(this.character);

		this.ctx.translate(-this.camera_x, 0);

		// Arrow Function bindet `this` an die World-Instanz.
		// Bei ...function(){this.draw}  ginge der Kontext verloren und die Schleife bricht ab.
		requestAnimationFrame(() => this.draw());
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
