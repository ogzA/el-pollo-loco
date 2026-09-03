import { BackgroundObject } from "./background-object.class.js";
import { Character } from "./character.class.js";
import { Chicken } from "./chicken.class.js";
import { Cloud } from "./cloud.class.js";

export class World {
	character = new Character();
	enemies = [new Chicken(), new Chicken(), new Chicken()];
	clouds = [new Cloud()];
	backgroundObjects = [
		new BackgroundObject("./assets/img/5_background/layers/air.png", 0),
		new BackgroundObject(
			"./assets/img/5_background/layers/3_third_layer/1.png",
			0,
		),
		new BackgroundObject(
			"./assets/img/5_background/layers/2_second_layer/1.png",
			0,
		),
		new BackgroundObject(
			"./assets/img/5_background/layers/1_first_layer/1.png",
			0,
		),
	];
	canvas;
	ctx;

	constructor(_canvas) {
		this.ctx = _canvas.getContext("2d");
		this.canvas = _canvas;
		this.draw();
	}

	// Reihenfolge ist hier wichtig! Hinweis: Überlappung der Elemente
	draw() {
		this.clearCanvas(this.canvas);

		this.addObjectsToMap(this.backgroundObjects);
		this.addObjectsToMap(this.clouds);
		this.addObjectsToMap(this.enemies);
		this.addToMap(this.character);

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
		this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
	}

	clearCanvas(canvas) {
		this.ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
}
