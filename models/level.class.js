export class Level {
	enemies;
	clouds;
	backgroundObjects;
	collectables;
	level_end_x = 2500;

	constructor(_enemies, _clouds, _backgroundObjects, _collectables) {
		this.enemies = _enemies;
		this.clouds = _clouds;
		this.backgroundObjects = _backgroundObjects;
		this.collectables = _collectables;
	}
}
