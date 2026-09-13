import { DrawableObject } from "./drawable-object.class.js";
import { IntervalHub } from "./intervalhub.class.js";

export class MovableObject extends DrawableObject {
	speed = 0.15;
	otherDirection = false;
	speedY = 0;
	acceleration = 2.5;
	showFrame = false;
	energy = 100;
	bottles = 0;
	coins = 0;
	lastHit = 0;

	applyGravity() {
		IntervalHub.startInterval(() => {
			if (this.isAboveGround() || this.speedY > 0) {
				this.y -= this.speedY;
				this.speedY -= this.acceleration;
			} else {
				// Am Boden zurücksetzen, damit speedY < 0 wirklich "fällt" bedeutet
				this.speedY = 0;
			}
		}, 1000 / 25);
	}

	isAboveGround() {
		if (this.alwaysFalls) {
			// Throwable Objects should always fall
			return true;
		} else {
			return this.y < 90;
		}
	}

	isColliding(mo) {
		// In draw() ist x beim Spiegeln negativ, deshalb hier frisch berechnen
		this.getRealFrame();
		mo.getRealFrame();
		return (
			this.rX + this.rW > mo.rX &&
			this.rY + this.rH > mo.rY &&
			this.rX < mo.rX + mo.rW &&
			this.rY < mo.rY + mo.rH
		);
	}

	isCollidingFromTop(mo) {
		return this.isColliding(mo) && this.speedY < 0;
	}

	hit(damage = 2) {
		this.energy -= damage;
		if (this.energy < 0) {
			this.energy = 0;
		} else {
			this.lastHit = new Date().getTime();
		}
	}

	isHurt() {
		let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
		timepassed = timepassed / 1000;
		return timepassed < 1;
	}

	isDead() {
		return this.energy == 0;
	}

	playAnimation(images) {
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
