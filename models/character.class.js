import { ImageHub } from "./image-hub.class.js";

import { MovableObject } from "./movable-object.class.js";

export class Character extends MovableObject {
	IMAGES_WALKING = ImageHub.PEPE.move;
	IMAGES_JUMPING = ImageHub.PEPE.jump;
	IMAGES_DEAD = ImageHub.PEPE.dead;
	IMAGES_HURT = ImageHub.PEPE.hurt;

	world;
	y = -100;
	speed = 10;
	height = 350;
	width = 150;
	showFrame = true;

	constructor() {
		super();
		this.loadImage(this.IMAGES_WALKING[0]);

		this.loadImages(this.IMAGES_WALKING);
		this.loadImages(this.IMAGES_JUMPING);
		this.loadImages(this.IMAGES_HURT);
		this.loadImages(this.IMAGES_DEAD);

		this.applyGravity();

		this.animate();
	}

	animate() {
		setInterval(() => {
			if (
				this.world.keyboard.RIGHT &&
				this.x < this.world.level.level_end_x
			) {
				this.moveRight();
				this.otherDirection = false;
			}

			if (this.world.keyboard.LEFT && this.x > 0) {
				this.moveLeft();
				this.otherDirection = true;
			}

			if (this.world.keyboard.UP && !this.isAboveGround()) {
				this.jump();
			}

			this.world.camera_x = -this.x + 100;
		}, 1000 / 30);

		setInterval(() => {
			if (this.isDead()) {
				this.walkAnimation(this.IMAGES_DEAD);
			} else if (this.isHurt()) {
				this.walkAnimation(this.IMAGES_HURT);
			} else if (this.isAboveGround()) {
				this.walkAnimation(this.IMAGES_JUMPING);
			} else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
				this.walkAnimation(this.IMAGES_WALKING);
			}
		}, 50);
	}
}
