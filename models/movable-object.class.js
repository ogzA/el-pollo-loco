export class MovableObject {
	x = 120;
	y = 280;
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

	// Verständnisfrage hier zu "this.imageCache[path] = img": Ticket via Loom erstellen
	loadImages(arr) {
		arr.forEach((path) => {
			const img = new Image();
			img.src = path;
			this.imageCache[path] = img;
		});
	}

	moveRight() {
		console.log("is moving to right ...");
	}

	moveLeft() {
		setInterval(() => {
			this.x -= this.speed;
		}, 1000 / 60);
	}
}
