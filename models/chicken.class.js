import { ImageHub } from "./image-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Chicken extends MovableObject {
	IMAGES_WALKING = [];
	IMAGES_WALKING = ImageHub.CHICKEN.move;
	showFrame = true;

	constructor() {
		super();
		this.loadImage(this.IMAGES_WALKING[0]);
		this.loadImages(this.IMAGES_WALKING);

		this.height = 100;
		this.y = 340;
		this.x = 500 + Math.random() * 500;
		this.speed = 0.15 + Math.random() * 0.25;

		this.animate();
	}

	animate() {
		setInterval(() => {
			this.moveLeft();
		}, 1000 / 60);

		setInterval(() => {
			this.walkAnimation(this.IMAGES_WALKING);
		}, 200);
	}
}
