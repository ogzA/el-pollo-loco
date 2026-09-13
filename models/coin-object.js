import { Collectable } from "./collectable-objects.class.js";

export class CoinObject extends Collectable {
	isCoin = true;

	constructor() {
		super();
		this.width = 100;
		this.height = 100;

		this.loadImage("./assets/img/8_coin/coin_1.png");

		this.x = 500 + Math.random() * 2000;
		this.y = 100 + Math.random() * 400;
	}
}
