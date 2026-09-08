export class MovableObject {
	x = 120;
	y = 280;
	img;
	height = 150;
	width = 100;
	imageCache = {};
	currentImage = 0;
	speed = 0.15;
	otherDirection = false;
	speedY = 0;
	acceleration = 2.5;
	applyGravity() {
		setInterval(() => {
			if (this.isAboveGround() || this.speedY > 0) {
				this.y -= this.speedY;
				this.speedY -= this.acceleration;
			}
		}, 1000 / 25);
	}

	isAboveGround() {
		return this.y < 90;
	}

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

	walkAnimation(images) {
		const i = this.currentImage % images.length;
		const path = images[i];
		this.img = this.imageCache[path];
		this.currentImage++;
	}

	moveRight() {
		this.x += this.speed;
	}

	moveLeft() {
		this.x -= this.speed;
	}

	jump() {
		this.speedY = 30;
	}
}
