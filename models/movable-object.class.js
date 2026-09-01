export class MovableObject {
	x = 120;
	y = 400;
	img;
	height = 150;
	width = 100;
	imageCache = {};
	currentImage = 0;
	speed = 0.15;

	moveRight() {
		console.log("is moving to right ...");
	}

	moveLeft() {
		console.log("is moving to left");
	}
}
