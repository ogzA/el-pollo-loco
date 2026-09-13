import { ImageHub } from "./image-hub.class.js";
import { IntervalHub } from "./intervalhub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class ChickenSmall extends MovableObject {
	IMAGES_WALKING = ImageHub.CHICKEN_SMALL.move;
	showFrame = true;

	constructor(_index) {
		super();
		this.loadImage(this.IMAGES_WALKING[0]);
		this.loadImages(this.IMAGES_WALKING);

		this.height = 60;
		this.width = 60;
		this.y = 380;
		this.x = 675 + _index * 150 + Math.random() * 60;
		this.speed = 0.25 + Math.random() * 0.3;

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
