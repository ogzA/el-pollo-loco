import { AudioHub } from "./AudioHub.class.js";
import { ImageHub } from "./image-hub.class.js";
import { IntervalHub } from "./intervalhub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class ChickenSmall extends MovableObject {
	IMAGES_WALKING = ImageHub.CHICKEN_SMALL.move;
	IMAGES_DEAD = ImageHub.CHICKEN_SMALL.dead;
	showFrame = true;
	offset = {
		top: 5,
		right: 7,
		bottom: 5,
		left: 7,
	};

	constructor(_index) {
		super();
		this.loadImage(this.IMAGES_WALKING[0]);
		this.loadImages(this.IMAGES_WALKING);
		this.loadImages(this.IMAGES_DEAD);

		this.height = 60;
		this.width = 60;
		this.y = 380;
		this.x = 675 + _index * 150 + Math.random() * 60;
		this.speed = 0.25 + Math.random() * 0.3;

		this.animate();
	}

	die() {
		this.energy = 0;
		AudioHub.playOne(AudioHub.CHICKEN_SMALL_DEAD);
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
