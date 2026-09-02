export class MovableObject {
	x = 120;
	y = 250;
	img;
	height = 150;
	width = 100;
	imageCache = {};
	currentImage = 0;
	speed = 0.15;

	loadImage(path) {
		this.img = new Image();
		this.img.src = path;
	}

	moveRight() {
		console.log("is moving to right ...");
	}

	moveLeft() {
		console.log("is moving to left");
	}
}
