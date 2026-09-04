import { ImageHub } from "./image-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Character extends MovableObject {
	IMAGES_WALKING = [];
	IMAGES_WALKING = ImageHub.PEPE.move;

	constructor() {
		super();
		this.loadImage(this.IMAGES_WALKING[0]);
		this.loadImages(this.IMAGES_WALKING);

		this.height = 350;
		this.width = 150;
		this.y = 90;

		this.animate();
	}

	animate() {
		setInterval(() => {
			const i = this.currentImage % this.IMAGES_WALKING.length;
			const path = this.IMAGES_WALKING[i];
			this.img = this.imageCache[path];
			this.currentImage++;
		}, 100);
	}

	moveRight() {
		console.log("hello from moveRight");
	}

	jump() {
		console.log("Jumped!");
	}
}
