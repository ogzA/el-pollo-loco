import { ImageHub } from "./image-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class FinalBoss extends MovableObject {
	IMAGES_WALKING = [...ImageHub.FINALBOSS.alert, ...ImageHub.FINALBOSS.move];
	height = 500;
	width = 400;
	y = -40;
	showFrame = true;

	constructor() {
		super();
		this.loadImage(this.IMAGES_WALKING[0]);
		this.loadImages(this.IMAGES_WALKING);

		this.x = 2500;
		this.speed = 0.05;
		this.animate();
	}

	animate() {
		this.moveLeft();
		setInterval(() => {
			this.playAnimation(this.IMAGES_WALKING);
		}, 200);
	}
}
