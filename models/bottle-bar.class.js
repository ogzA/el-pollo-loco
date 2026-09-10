import { DrawableObject } from "./drawable-object.class.js";
import { ImageHub } from "./image-hub.class.js";

export class BottleBar extends DrawableObject {
	STATUS_IMAGES = ImageHub.STATUS_BAR.bottles;

	percentage = 40;

	constructor() {
		super();
		this.loadImages(this.STATUS_IMAGES);
		this.x = 20;
		this.y = 100;
		this.width = 200;
		this.height = 70;
		this.setPercentage(40);
	}

	setPercentage(percentage) {
		this.percentage = percentage; // => 0 ... 5
		let path = this.STATUS_IMAGES[this.resolveImageIndex()];
		this.img = this.imageCache[path];
	}

	resolveImageIndex() {
		if (this.percentage == 40) {
			return 4;
		} else if (this.percentage > 0) {
			return 1;
		} else if (this.percentage > 20) {
			return 2;
		} else if (this.percentage > 40) {
			return 3;
		} else if (this.percentage > 60) {
			return 4;
		} else if (this.percentage > 80) {
			return 5;
		}
	}
}
