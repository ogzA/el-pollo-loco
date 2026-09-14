import { AudioHub } from "./audio-hub.class.js";
import { ImageHub } from "./image-hub.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Chicken extends MovableObject {
	IMAGES_WALKING = ImageHub.CHICKEN.move;
	IMAGES_DEAD = ImageHub.CHICKEN.dead;
	damage = 10;
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
		this.loadImages(this.IMAGES_DEAD);

		this.height = 100;
		this.y = 340;
		this.x = 700 + _index * 200 + Math.random() * 150;
		this.speed = 0.15 + Math.random() * 0.25;

		this.animate();
	}

	die() {
		this.energy = 0;
		AudioHub.playOne(AudioHub.CHICKEN_DEAD);
	}

	animate() {
		IntervalHub.startInterval(() => {
			if (!this.isDead()) {
				this.moveLeft();
			}
		}, 1000 / 60);

		IntervalHub.startInterval(() => {
			if (this.isDead()) {
				this.playAnimation(this.IMAGES_DEAD);
			} else {
				this.playAnimation(this.IMAGES_WALKING);
			}
		}, 200);
	}
}
