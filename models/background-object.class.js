import { MovableObject } from "./movable-object.class.js";

export class BackgroundObject extends MovableObject {
	canvasHeight = 480;
	width = 1024;
	height = 480;

	/**
	 * Creates a background image at the bottom of the canvas.
	 * @param {string} imagePath - path to the image
	 * @param {number} x - x position of the image
	 */
	constructor(imagePath, x) {
		super().loadImage(imagePath);
		this.x = x;
		this.y = this.canvasHeight - this.height;
	}
}
