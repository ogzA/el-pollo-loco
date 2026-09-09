export class DrawableObject {
	x = 120;
	y = 280;

	height = 150;
	width = 100;
	img;
	imageCache = {};
	currentImage = 0;

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

	loadImages(arr) {
		arr.forEach((path) => {
			const img = new Image();
			img.src = path;
			img.style = "transform: scaleX(-1)";
			this.imageCache[path] = img;
		});
	}
}
