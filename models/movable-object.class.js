import { DrawableObject } from "./drawable-object.class.js";
import { IntervalHub } from "./interval-hub.class.js";

export class MovableObject extends DrawableObject {
	speed = 0.15;
	otherDirection = false;
	speedY = 0;
	acceleration = 2.5;
	energy = 100;
	bottles = 0;
	coins = 0;
	lastHit = 0;

	/**
	 * Starts the gravity. On the ground speedY is set to 0.
	 */
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

	/**
	 * Checks if the object is in the air. Bottles always fall.
	 * @returns {boolean} true if the object is above the ground
	 */
	isAboveGround() {
		if (this.alwaysFalls) {
			// Throwable Objects should always fall
			return true;
		} else {
			return this.y < 90;
		}
	}

	/**
	 * Checks if this object overlaps with another object.
	 * @param {MovableObject} mo - other object
	 * @returns {boolean} true on a collision
	 */
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

	/**
	 * Checks if the object falls on another object from above.
	 * @param {MovableObject} mo - other object
	 * @returns {boolean} true if it collides while falling
	 */
	isCollidingFromTop(mo) {
		return this.isColliding(mo) && this.speedY < 0;
	}

	/**
	 * Removes energy and saves the time of the hit.
	 * @param {number} [damage=2] - damage
	 */
	hit(damage = 2) {
		this.energy -= damage;
		if (this.energy < 0) {
			this.energy = 0;
		} else {
			this.lastHit = new Date().getTime();
		}
	}

	/**
	 * Checks if the last hit was less than 1 second ago.
	 * @returns {boolean} true if the object is hurt right now
	 */
	isHurt() {
		let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
		timepassed = timepassed / 1000;
		return timepassed < 1;
	}

	/**
	 * Checks if there is no energy left.
	 * @returns {boolean} true if energy is 0
	 */
	isDead() {
		return this.energy == 0;
	}

	/**
	 * Shows the next image of an image list.
	 * @param {Array<string>} images - image paths of the animation
	 */
	playAnimation(images) {
		const i = this.currentImage % images.length;
		const path = images[i];
		this.img = this.imageCache[path];
		this.currentImage++;
	}

	/**
	 * Moves the object to the right.
	 */
	moveRight() {
		this.x += this.speed;
	}

	/**
	 * Moves the object to the left.
	 */
	moveLeft() {
		this.x -= this.speed;
	}

	/**
	 * Lets the object jump up.
	 */
	jump() {
		this.speedY = 30;
	}
}
