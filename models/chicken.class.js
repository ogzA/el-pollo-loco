import { ImageHub } from "./image-hub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Chicken extends MovableObject {
	constructor() {
		super().loadImage(ImageHub.CHICKEN.move[0]);
	}
}
