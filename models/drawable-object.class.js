export class DrawableObject {
	x = 120;
	y = 280;

	height = 150;
	width = 100;
	img;
	imageCache = {};
	currentImage = 0;

	rX;
	rY;
	rW;
	rH;
	offset = {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
	};

	loadImage(path) {
		this.img = new Image();
		this.img.src = path;
	}

	draw(ctx) {
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}

	getRealFrame() {
		this.rX = this.x + this.offset.left;
		this.rY = this.y + this.offset.top;
		this.rW = this.width - this.offset.left - this.offset.right;
		this.rH = this.height - this.offset.top - this.offset.bottom;
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
