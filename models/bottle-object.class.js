import { Collectable } from "./collectable-objects.class.js";

export class BottleObject extends Collectable {
	constructor() {
		super();
		this.y = 350;
		this.width = 70;
		this.height = 100;

		this.loadImage(
			"./assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
		);

		this.x = 500 + Math.random() * 2000;
	}
}
