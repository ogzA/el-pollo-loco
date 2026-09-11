import { ImageHub } from "./image-hub.class.js";
import { IntervalHub } from "./intervalhub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class ThrowableObject extends MovableObject {
	alwaysFalls = true;
	isBroken = false;

	FLYING_BOTTLES = ImageHub.BOTTLES.flying;
	SPLASH_BOTTLES = ImageHub.BOTTLES.splash;

	constructor(_x, _y, _otherDirection) {
		super();
		this.loadImage(ImageHub.BOTTLES.straight[0]);
		this.loadImages(this.FLYING_BOTTLES);
		this.loadImages(this.SPLASH_BOTTLES);
		this.x = _x;
		this.y = _y;
		this.width = 70;
		this.height = 80;
		this.otherDirection = _otherDirection;
		this.speed = 10;
		this.throw();
		this.animate();
	}

	throw() {
		this.speedY = 30;
		this.applyGravity();

		IntervalHub.startInterval(() => {
			if (this.otherDirection) {
				this.x -= this.speed;
			} else {
				this.x += this.speed;
			}
		}, 25);
	}

	animate() {
		IntervalHub.startInterval(() => {
			if (this.isBroken) {
				this.playAnimation(this.SPLASH_BOTTLES);
			} else {
				this.playAnimation(this.FLYING_BOTTLES);
			}
		}, 50);
	}

	breakBottle() {
		this.isBroken = true;
		this.currentImage = 0;
		this.speedY = 0;
		this.speed = 0;
	}
}
