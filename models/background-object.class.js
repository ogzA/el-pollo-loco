import { MovableObject } from "./movable-object.class.js";
import { CANVAS_HEIGHT } from "../js/game.js";

export class BackgroundObject extends MovableObject {
	width = 1024;
	height = 480;

	constructor(imagePath, x) {
		super().loadImage(imagePath);
		this.x = x;
		this.y = CANVAS_HEIGHT - this.height;
	}
}
