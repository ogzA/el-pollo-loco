import { ImageHub } from "./image-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Chicken extends MovableObject {
	IMAGES_WALKING = [];
	IMAGES_WALKING = ImageHub.CHICKEN.move;

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
		this.moveLeft();

		setInterval(() => {
			const i = this.currentImage % this.IMAGES_WALKING.length;
			let path = this.IMAGES_WALKING[i];
			this.img = this.imageCache[path];
			this.currentImage++;
		}, 200);
	}
}

// http://127.0.0.1:5500/assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png,../assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png,../assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png
