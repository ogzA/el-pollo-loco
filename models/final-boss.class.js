import { ImageHub } from "./image-hub.class.js";
import { IntervalHub } from "./intervalhub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class FinalBoss extends MovableObject {
	IMAGES_ALERT = ImageHub.FINALBOSS.alert;
	IMAGES_WALKING = ImageHub.FINALBOSS.move;
	IMAGES_HURT = ImageHub.FINALBOSS.hurt;
	IMAGES_DEAD = ImageHub.FINALBOSS.dead;
	height = 500;
	width = 400;
	y = -40;
	speed = 0.5;
	showFrame = true;
	isEndboss = true;
	isAlerted = false;
	alertStarted = 0;

	constructor() {
		super();
		this.loadImage(this.IMAGES_ALERT[0]);
		this.loadImages(this.IMAGES_ALERT);
		this.loadImages(this.IMAGES_WALKING);
		this.loadImages(this.IMAGES_HURT);
		this.loadImages(this.IMAGES_DEAD);

		this.x = 2500;
		this.animate();
	}

	hit() {
		super.hit(20);
		this.currentImage = 0;
	}

	startAlert() {
		this.isAlerted = true;
		this.currentImage = 0;
		this.alertStarted = new Date().getTime();
	}

	isAlertRunning() {
		const timepassed = (new Date().getTime() - this.alertStarted) / 1000;
		return timepassed < 1;
	}

	canWalk() {
		return this.isAlerted && !this.isAlertRunning() && !this.isDead();
	}

	animate() {
		IntervalHub.startInterval(() => {
			if (this.canWalk()) {
				this.moveLeft();
			}
		}, 1000 / 60);

		IntervalHub.startInterval(() => {
			if (this.isDead()) {
				this.playAnimation(this.IMAGES_DEAD);
			} else if (this.isHurt()) {
				this.playAnimation(this.IMAGES_HURT);
			} else if (this.canWalk()) {
				this.playAnimation(this.IMAGES_WALKING);
			} else {
				this.playAnimation(this.IMAGES_ALERT);
			}
		}, 100);
	}
}
