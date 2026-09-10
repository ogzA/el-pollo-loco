import { ImageHub } from "./image-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class ThrowableObject extends MovableObject {
	alwaysFalls = true;

	FLYING_BOTTLES = ImageHub.BOTTLES.flying;

	constructor(_x, _y, _otherDirection) {
		super();
		this.loadImage(ImageHub.BOTTLES.straight[0]);
		this.loadImages(ImageHub.BOTTLES.flying);
		this.x = _x;
		this.y = _y;
		this.width = 70;
		this.height = 80;
		this.otherDirection = _otherDirection;
		this.throw();
		this.animate();
	}

	throw() {
		this.speedY = 30;
		this.applyGravity();

		setInterval(() => {
			console.log("otherDirection", this.otherDirection);
			if (this.otherDirection) {
				this.x -= 15;
			} else {
				this.x += 10;
			}
		}, 25);
	}

	animate() {
		setInterval(() => {
			this.playAnimation(this.FLYING_BOTTLES);
		}, 50);
	}
}
