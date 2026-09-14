export class Level {
	enemies;
	clouds;
	backgroundObjects;
	collectables;
	levelEndX = 2500;

	/**
	 * Creates a level with all objects.
	 * @param {Array<MovableObject>} _enemies - enemies
	 * @param {Array<Cloud>} _clouds - clouds
	 * @param {Array<BackgroundObject>} _backgroundObjects - background images
	 * @param {Array<CollectableObject>} _collectables - bottles and coins
	 */
	constructor(_enemies, _clouds, _backgroundObjects, _collectables) {
		this.enemies = _enemies;
		this.clouds = _clouds;
		this.backgroundObjects = _backgroundObjects;
		this.collectables = _collectables;
	}
}
