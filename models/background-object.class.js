import { MovableObject } from "./movable-object.class.js";

export class BackgroundObject extends MovableObject {
	canvas_height = 480;
	width = 1024;
	height = 480;

	constructor(imagePath, x) {
		super().loadImage(imagePath);
		this.x = x;
		this.y = this.canvas_height - this.height;
	}
}
