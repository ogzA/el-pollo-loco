import { ImageHub } from "./image-hub.class.js";
import { IntervalHub } from "./intervalhub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Chicken extends MovableObject {
	IMAGES_WALKING = ImageHub.CHICKEN.move;
	showFrame = true;
	offset = {
		top: 6,
		right: 3,
		bottom: 6,
		left: 2,
	};

	constructor(_index) {
		super();
		this.loadImage(this.IMAGES_WALKING[0]);
		this.loadImages(this.IMAGES_WALKING);

		this.height = 100;
		this.y = 340;
		this.x = 600 + _index * 150 + Math.random() * 60;
		this.speed = 0.15 + Math.random() * 0.25;

		this.animate();
	}

	animate() {
		IntervalHub.startInterval(() => {
			this.moveLeft();
		}, 1000 / 60);

		IntervalHub.startInterval(() => {
			this.playAnimation(this.IMAGES_WALKING);
		}, 200);
	}
}
