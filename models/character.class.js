import { AudioHub } from "./AudioHub.class.js";
import { ImageHub } from "./image-hub.class.js";
import { IntervalHub } from "./intervalhub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Character extends MovableObject {
	IMAGES_WALKING = ImageHub.PEPE.move;
	IMAGES_JUMPING = ImageHub.PEPE.jump;
	IMAGES_DEAD = ImageHub.PEPE.dead;
	IMAGES_HURT = ImageHub.PEPE.hurt;
	IMAGES_IDLE = ImageHub.PEPE.idle;
	IMAGES_LONG_IDLE = ImageHub.PEPE.long_idle;

	world;
	y = -100;
	speed = 10;
	height = 350;
	width = 150;
	showFrame = true;
	offset = {
		top: 135,
		right: 20,
		bottom: 20,
		left: 20,
	};
	lastThrow = 0;
	lastJump = 0;
	lastMove = new Date().getTime();
	deadImage = 0;
	MAX_BOTTLES = 8;

	constructor() {
		super();
		this.loadImage(this.IMAGES_WALKING[0]);

		this.loadImages(this.IMAGES_WALKING);
		this.loadImages(this.IMAGES_JUMPING);
		this.loadImages(this.IMAGES_HURT);
		this.loadImages(this.IMAGES_DEAD);
		this.loadImages(this.IMAGES_IDLE);
		this.loadImages(this.IMAGES_LONG_IDLE);

		this.applyGravity();
		this.animate();
		this.animateIdle();
		this.canThrow();
	}

	animate() {
		IntervalHub.startInterval(() => {
			this.playLoopSound(AudioHub.CHARACTER_RUN, this.isWalking());
			if (this.isDead()) return;
			this.updateLastMove();

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

		IntervalHub.startInterval(() => {
			if (this.isDead()) {
				this.playDeadAnimation();
			} else if (this.isHurt()) {
				this.playAnimation(this.IMAGES_HURT);
			} else if (this.isAboveGround()) {
				this.playJumpAnimation();
			} else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
				this.playAnimation(this.IMAGES_WALKING);
			}
		}, 50);
	}

	animateIdle() {
		IntervalHub.startInterval(() => {
			const isSnoring = this.isIdle() && this.isSleeping();
			this.playLoopSound(AudioHub.CHARACTER_SNORING, isSnoring);
			if (!this.isIdle()) return;
			if (this.isSleeping()) {
				this.playAnimation(this.IMAGES_LONG_IDLE);
			} else {
				this.playAnimation(this.IMAGES_IDLE);
			}
		}, 200);
	}

	isIdle() {
		const keyboard = this.world.keyboard;
		return (
			!this.isDead() &&
			!this.isHurt() &&
			!this.isAboveGround() &&
			!keyboard.RIGHT &&
			!keyboard.LEFT
		);
	}

	isSleeping() {
		const timepassed = (new Date().getTime() - this.lastMove) / 1000;
		return timepassed > 10;
	}

	updateLastMove() {
		const keyboard = this.world.keyboard;
		if (keyboard.RIGHT || keyboard.LEFT || keyboard.UP || keyboard.D) {
			this.lastMove = new Date().getTime();
		}
	}

	isWalking() {
		const keyboard = this.world.keyboard;
		return (
			(keyboard.RIGHT || keyboard.LEFT) &&
			!this.isAboveGround() &&
			!this.isDead()
		);
	}

	playLoopSound(sound, shouldPlay) {
		if (!shouldPlay) {
			AudioHub.stopOne(sound);
		} else if (sound.file.paused) {
			AudioHub.playOne(sound);
		}
	}

	jump() {
		super.jump();
		this.lastJump = new Date().getTime();
		AudioHub.playOne(AudioHub.CHARACTER_JUMP);
	}

	hit() {
		if (this.isDead()) return;
		super.hit();
		if (this.isDead()) {
			AudioHub.playOne(AudioHub.CHARACTER_DEAD);
		} else {
			AudioHub.playOne(AudioHub.CHARACTER_DAMAGE);
		}
	}

	playJumpAnimation() {
		const timepassed = new Date().getTime() - this.lastJump;
		let i = Math.floor(timepassed / 110);
		if (i >= this.IMAGES_JUMPING.length) {
			i = this.IMAGES_JUMPING.length - 1;
		}
		this.img = this.imageCache[this.IMAGES_JUMPING[i]];
	}

	playDeadAnimation() {
		if (this.deadImage < this.IMAGES_DEAD.length) {
			this.img = this.imageCache[this.IMAGES_DEAD[this.deadImage]];
			this.deadImage++;
		}
	}

	canThrow() {
		const timepassed = (new Date().getTime() - this.lastThrow) / 1000;
		return timepassed > 0.8 && !this.isDead();
	}

	canCollectBottle() {
		return this.bottles < this.MAX_BOTTLES;
	}
}
