import { level1 } from "../levels/level1.js";
import { Character } from "./character.class.js";

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

	constructor(_canvas, _keyboard) {
		this.ctx = _canvas.getContext("2d");
		this.canvas = _canvas;
		this.keyboard = _keyboard;
		this.draw();
		this.setWorld();
		this.checkCollisions();
	}

	setWorld() {
		this.character.world = this;
	}

	checkCollisions() {
		setInterval(() => {
	checkCollisions() {
		this.level.enemies.forEach((enemy) => {
			if (this.character.isColliding(enemy)) {
				this.character.hit();
				console.log(this.character.energy);
				this.statusBar.setPercentage(this.character.energy);
			}
		});
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
		this.ctx.translate(this.camera_x, 0); // Forwards

		this.addObjectsToMap(this.level.enemies);
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
