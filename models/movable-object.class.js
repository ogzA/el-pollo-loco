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
	showFrame = false;

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

	draw(ctx) {
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}

	// blauer Rahmen
	drawFrame(ctx) {
		if (this.showFrame) {
			ctx.beginPath();
			ctx.lineWidth = 5;
			ctx.strokeStyle = "blue";
			ctx.rect(this.x, this.y, this.width, this.height);
			ctx.stroke();
		}
	}

	isColliding(mo) {
		return (
			this.x + this.width > mo.x &&
			this.y + this.height > mo.y &&
			this.x < mo.x + mo.width &&
			this.y < mo.y + mo.height
		);
	}

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
