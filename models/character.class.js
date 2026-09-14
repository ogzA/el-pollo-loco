import { AudioHub } from "./audio-hub.class.js";
import { ImageHub } from "./image-hub.class.js";
import { IntervalHub } from "./interval-hub.class.js";
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

	/**
	 * Loads all images of the character and starts gravity and animations.
	 */
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
	}

	/**
	 * Starts the intervals for movement and animation.
	 */
	animate() {
		IntervalHub.startInterval(() => this.moveCharacter(), 1000 / 30);
		IntervalHub.startInterval(() => this.playCharacterAnimation(), 50);
	}

	/**
	 * Moves the character with the keyboard and sets the camera. After death the character does not move anymore.
	 */
	moveCharacter() {
		this.playLoopSound(AudioHub.CHARACTER_RUN, this.isWalking());
		if (this.isDead()) return;
		this.updateLastMove();
		this.moveWithKeyboard();
		this.world.cameraX = -this.x + 100;
	}

	/**
	 * Walks right or left and jumps, depending on the pressed key.
	 */
	moveWithKeyboard() {
		const keyboard = this.world.keyboard;
		if (keyboard.RIGHT && this.x < this.world.level.levelEndX) {
			this.moveRight();
			this.otherDirection = false;
		}
		if (keyboard.LEFT && this.x > 0) {
			this.moveLeft();
			this.otherDirection = true;
		}
		if (keyboard.UP && !this.isAboveGround()) {
			this.jump();
		}
	}

	/**
	 * Plays the matching animation: dead, hurt, jumping or walking.
	 */
	playCharacterAnimation() {
		if (this.isDead()) {
			this.playDeadAnimation();
		} else if (this.isHurt()) {
			this.playAnimation(this.IMAGES_HURT);
		} else if (this.isAboveGround()) {
			this.playJumpAnimation();
		} else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
			this.playAnimation(this.IMAGES_WALKING);
		}
	}

	/**
	 * Starts the interval for the idle and sleep animation (with snoring).
	 */
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

	/**
	 * Checks if the character is doing nothing right now.
	 * @returns {boolean} true if no other animation is running
	 */
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

	/**
	 * Checks if no key was pressed for more than 10 seconds.
	 * @returns {boolean} true if the character is sleeping
	 */
	isSleeping() {
		const timepassed = (new Date().getTime() - this.lastMove) / 1000;
		return timepassed > 10;
	}

	/**
	 * Saves the time of the last movement when a key is pressed.
	 */
	updateLastMove() {
		const keyboard = this.world.keyboard;
		if (keyboard.RIGHT || keyboard.LEFT || keyboard.UP || keyboard.D) {
			this.lastMove = new Date().getTime();
		}
	}

	/**
	 * Checks if the character is walking on the ground.
	 * @returns {boolean} true if left or right is pressed and the character is on the ground and alive
	 */
	isWalking() {
		const keyboard = this.world.keyboard;
		return (
			(keyboard.RIGHT || keyboard.LEFT) &&
			!this.isAboveGround() &&
			!this.isDead()
		);
	}

	/**
	 * Plays a sound as long as it is needed and stops it otherwise.
	 * @param {MyAudio} sound - sound from the AudioHub
	 * @param {boolean} shouldPlay - true if the sound should play
	 */
	playLoopSound(sound, shouldPlay) {
		if (!shouldPlay) {
			AudioHub.stopOne(sound);
		} else if (sound.file.paused) {
			AudioHub.playOne(sound);
		}
	}

	/**
	 * Lets the character jump, saves the time for the jump animation and plays the sound.
	 */
	jump() {
		super.jump();
		this.lastJump = new Date().getTime();
		AudioHub.playOne(AudioHub.CHARACTER_JUMP);
	}

	/**
	 * Removes energy and plays the damage or death sound. After death nothing happens anymore.
	 * @param {number} damage - damage from the enemy
	 */
	hit(damage) {
		if (this.isDead()) return;
		super.hit(damage);
		if (this.isDead()) {
			AudioHub.playOne(AudioHub.CHARACTER_DEAD);
		} else {
			AudioHub.playOne(AudioHub.CHARACTER_DAMAGE);
		}
	}

	/**
	 * Shows the jump image that matches the time since the jump, so the animation plays only once.
	 */
	playJumpAnimation() {
		const timepassed = new Date().getTime() - this.lastJump;
		let i = Math.floor(timepassed / 110);
		if (i >= this.IMAGES_JUMPING.length) {
			i = this.IMAGES_JUMPING.length - 1;
		}
		this.img = this.imageCache[this.IMAGES_JUMPING[i]];
	}

	/**
	 * Plays the death animation once and stays on the last image.
	 */
	playDeadAnimation() {
		if (this.deadImage < this.IMAGES_DEAD.length) {
			this.img = this.imageCache[this.IMAGES_DEAD[this.deadImage]];
			this.deadImage++;
		}
	}

	/**
	 * Checks if the character is allowed to throw a bottle again.
	 * @returns {boolean} true if the last throw was more than 0.8 seconds ago and the character is alive
	 */
	canThrow() {
		const timepassed = (new Date().getTime() - this.lastThrow) / 1000;
		return timepassed > 0.8 && !this.isDead();
	}

	/**
	 * Checks if there is still space for a bottle.
	 * @returns {boolean} true if fewer than MAX_BOTTLES bottles are collected
	 */
	canCollectBottle() {
		return this.bottles < this.MAX_BOTTLES;
	}
}
