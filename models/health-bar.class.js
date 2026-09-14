import { DrawableObject } from "./drawable-object.class.js";
import { ImageHub } from "./image-hub.class.js";

export class HealthBar extends DrawableObject {
	STATUS_IMAGES = ImageHub.STATUS_BAR.health;

	percentage = 100;

	/**
	 * Creates the health bar of the character (starts full).
	 */
	constructor() {
		super();
		this.loadImages(this.STATUS_IMAGES);
		this.x = 20;
		this.y = 0;
		this.width = 200;
		this.height = 70;
		this.setPercentage(100);
	}

	/**
	 * Sets the percentage and the matching image of the status bar.
	 * @param {number} percentage - value between 0 and 100
	 */
	setPercentage(percentage) {
		this.percentage = percentage; // => 0 ... 5
		let path = this.STATUS_IMAGES[this.resolveImageIndex()];
		this.img = this.imageCache[path];
	}

	/**
	 * Finds the image index for the current percentage.
	 * @returns {number} index from 0 to 5
	 */
	resolveImageIndex() {
		if (this.percentage >= 100) {
			return 5;
		} else if (this.percentage > 80) {
			return 4;
		} else if (this.percentage > 60) {
			return 3;
		} else if (this.percentage > 40) {
			return 2;
		} else if (this.percentage > 20) {
			return 1;
		} else {
			return 0;
		}
	}
}
