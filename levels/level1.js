import { BackgroundObject } from "../models/background-object.class.js";
import { Cloud } from "../models/cloud.class.js";
import { Chicken } from "../models/chicken.class.js";
import { Level } from "../models/level.class.js";
import { FinalBoss } from "../models/final-boss.class.js";
import { BottleObject } from "../models/bottle-object.class.js";
import { CoinObject } from "../models/coin-object.js";

const enemies = [];
for (let i = 0; i < 7; i++) {
	enemies.push(new Chicken(i));
}
enemies.push(new FinalBoss());

const collectables = [];
for (let i = 0; i < 12; i++) {
	collectables.push(new BottleObject());
}
for (let i = 0; i < 20; i++) {
	collectables.push(new CoinObject());
}

export const level1 = new Level(
	enemies,
	[new Cloud()],
	[
		new BackgroundObject("./assets/img/5_background/layers/air.png", -1024),
		new BackgroundObject(
			"./assets/img/5_background/layers/3_third_layer/2.png",
			-1024,
		),
		new BackgroundObject(
			"./assets/img/5_background/layers/2_second_layer/2.png",
			-1024,
		),
		new BackgroundObject(
			"./assets/img/5_background/layers/1_first_layer/2.png",
			-1024,
		),

		new BackgroundObject("./assets/img/5_background/layers/air.png", 0),
		new BackgroundObject(
			"./assets/img/5_background/layers/3_third_layer/1.png",
			0,
		),
		new BackgroundObject(
			"./assets/img/5_background/layers/2_second_layer/1.png",
			0,
		),
		new BackgroundObject(
			"./assets/img/5_background/layers/1_first_layer/1.png",
			0,
		),
		new BackgroundObject("./assets/img/5_background/layers/air.png", 1024),
		new BackgroundObject(
			"./assets/img/5_background/layers/3_third_layer/2.png",
			1024,
		),
		new BackgroundObject(
			"./assets/img/5_background/layers/2_second_layer/2.png",
			1024,
		),
		new BackgroundObject(
			"./assets/img/5_background/layers/1_first_layer/2.png",
			1024,
		),

		new BackgroundObject(
			"./assets/img/5_background/layers/air.png",
			1024 * 2,
		),
		new BackgroundObject(
			"./assets/img/5_background/layers/3_third_layer/1.png",
			1024 * 2,
		),
		new BackgroundObject(
			"./assets/img/5_background/layers/2_second_layer/1.png",
			1024 * 2,
		),
		new BackgroundObject(
			"./assets/img/5_background/layers/1_first_layer/1.png",
			1024 * 2,
		),
		new BackgroundObject(
			"./assets/img/5_background/layers/air.png",
			1024 * 3,
		),
		new BackgroundObject(
			"./assets/img/5_background/layers/3_third_layer/2.png",
			1024 * 3,
		),
		new BackgroundObject(
			"./assets/img/5_background/layers/2_second_layer/2.png",
			1024 * 3,
		),
		new BackgroundObject(
			"./assets/img/5_background/layers/1_first_layer/2.png",
			1024 * 3,
		),
	],
	collectables,
);
