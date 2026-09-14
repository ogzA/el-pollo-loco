import { CollectableObject } from "./collectable-object.class.js";

export class CoinObject extends CollectableObject {
	isCoin = true;

	/**
	 * Creates a coin at a random position that can be reached with a jump.
	 */
	constructor() {
		super();
		this.width = 100;
		this.height = 100;

		this.loadImage("./assets/img/8_coin/coin_1.png");

		this.x = 500 + Math.random() * 2000;
		this.y = 100 + Math.random() * 250;
	}
}
