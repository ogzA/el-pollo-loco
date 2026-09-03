import { ImageHub } from "./image-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Chicken extends MovableObject {
	constructor() {
		super().loadImage(ImageHub.CHICKEN.move[0]);
		this.y = 340;
		this.height = 100;
		this.x = 250 + Math.random() * 500;
	}
}
