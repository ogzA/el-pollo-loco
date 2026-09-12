import { ImageHub } from "./image-hub.class.js";
import { IntervalHub } from "./intervalhub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class FinalBoss extends MovableObject {
	IMAGES_WALKING = [...ImageHub.FINALBOSS.alert, ...ImageHub.FINALBOSS.move];
	IMAGES_HURT = ImageHub.FINALBOSS.hurt;
	IMAGES_DEAD = ImageHub.FINALBOSS.dead;
	height = 500;
	width = 400;
	y = -40;
	showFrame = true;
	isEndboss = true;

	constructor() {
		super();
		this.loadImage(this.IMAGES_WALKING[0]);
		this.loadImages(this.IMAGES_WALKING);
		this.loadImages(this.IMAGES_HURT);
		this.loadImages(this.IMAGES_DEAD);

		this.x = 2500;
		this.hit();
		this.animate();
	}

	hit() {
		this.energy -= 20;
	}

	animate() {
		// Hier muss moveLeft gefixt werden!
		IntervalHub.startInterval(() => this.moveLeft());
		setInterval(() => {
			if (this.isDead()) {
				this.playAnimation(this.IMAGES_DEAD);
			} else if (this.isHurt()) {
				this.playAnimation(this.IMAGES_HURT);
			} else {
				this.playAnimation(this.IMAGES_WALKING);
			}
		}, 200);
	}
}
