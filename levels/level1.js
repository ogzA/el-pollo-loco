import { BackgroundObject } from "../models/background-object.class.js";
import { Cloud } from "../models/cloud.class.js";
import { Chicken } from "../models/chicken.class.js";
import { ChickenSmall } from "../models/chicken-small.class.js";
import { Level } from "../models/level.class.js";
import { Endboss } from "../models/endboss.class.js";
import { BottleObject } from "../models/bottle-object.class.js";
import { CoinObject } from "../models/coin-object.class.js";

export let level1;

/**
 * Creates level1 with new enemies and collectables (on start and restart).
 */
export function initLevel() {
	level1 = new Level(
		createEnemies(),
		[new Cloud()],
		backgroundObjects,
		createCollectables(),
	);
}

/**
 * Creates all enemies: 7 chickens, 7 small chickens and the endboss.
 * @returns {Array<MovableObject>} list with all enemies
 */
function createEnemies() {
	const enemies = [];
	for (let i = 0; i < 7; i++) {
		enemies.push(new Chicken(i));
	}
	for (let i = 0; i < 7; i++) {
		enemies.push(new ChickenSmall(i));
	}
	enemies.push(new Endboss());
	return enemies;
}

/**
 * Creates 12 bottles and 20 coins to collect.
 * @returns {Array<CollectableObject>} list with all collectables
 */
function createCollectables() {
	const collectables = [];
	for (let i = 0; i < 12; i++) {
		collectables.push(new BottleObject());
	}
	for (let i = 0; i < 20; i++) {
		collectables.push(new CoinObject());
	}
	return collectables;
}

const backgroundObjects = [
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
];
