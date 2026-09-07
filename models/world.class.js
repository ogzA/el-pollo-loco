import { level1 } from "../levels/level1.js";
import { Character } from "./character.class.js";

export class World {
	character = new Character();
	canvas;
	level = level1;
	ctx;
	keyboard;
	camera_x = 0;

	constructor(_canvas, _keyboard) {
		this.ctx = _canvas.getContext("2d");
		this.canvas = _canvas;
		this.keyboard = _keyboard;
		this.draw();
		this.setWorld();
	}

	setWorld() {
		this.character.world = this;
	}

	// Reihenfolge ist hier wichtig! Hinweis: Überlappung der Elemente
	draw() {
		this.clearCanvas(this.canvas);

		this.ctx.translate(this.camera_x, 0);

		this.addObjectsToMap(this.level.backgroundObjects);
		this.addObjectsToMap(this.level.clouds);
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

		this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);

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
