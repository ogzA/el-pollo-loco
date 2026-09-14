import { AudioHub } from "./audio-hub.class.js";
import { ImageHub } from "./image-hub.class.js";
import { IntervalHub } from "./interval-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class ThrowableObject extends MovableObject {
	alwaysFalls = true;
	isBroken = false;
	brokenTime = 0;

	FLYING_BOTTLES = ImageHub.BOTTLES.flying;
	SPLASH_BOTTLES = ImageHub.BOTTLES.splash;

	/**
	 * Creates a thrown bottle and starts the throw and the animation.
	 * @param {number} _x - start x position
	 * @param {number} _y - start y position
	 * @param {boolean} _otherDirection - true if the bottle is thrown to the left
	 */
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

	/**
	 * Throws the bottle up and to the right or left.
	 */
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

	/**
	 * Plays the flying or splash animation.
	 */
	animate() {
		IntervalHub.startInterval(() => {
			if (this.isBroken) {
				this.playAnimation(this.SPLASH_BOTTLES);
			} else {
				this.playAnimation(this.FLYING_BOTTLES);
			}
		}, 50);
	}

	/**
	 * Breaks the bottle: splash animation, stop moving and play the sound.
	 */
	breakBottle() {
		this.isBroken = true;
		this.brokenTime = new Date().getTime();
		this.currentImage = 0;
		this.speedY = 0;
		this.speed = 0;
		AudioHub.playOne(AudioHub.BOTTLE_BREAK);
	}

	/**
	 * Checks if the splash animation is finished.
	 * @returns {boolean} true if the bottle is broken and 0.3 seconds have passed
	 */
	isSplashOver() {
		const timepassed = (new Date().getTime() - this.brokenTime) / 1000;
		return this.isBroken && timepassed > 0.3;
	}
}
