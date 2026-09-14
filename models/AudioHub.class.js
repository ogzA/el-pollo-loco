// Fixed Audiohub

class MyAudio {
	file;
	isLoaded;

	constructor(_file) {
		this.file = new Audio(_file);
		this.file.volume = 0.3;
	}
}

export class AudioHub {
	// Audiodateien für das Spiel
	static CHARACTER_JUMP = new MyAudio(
		"./assets/sounds/character/characterJump.wav",
	);
	static CHARACTER_DAMAGE = new MyAudio(
		"./assets/sounds/character/characterDamage.mp3",
	);
	static CHARACTER_DEAD = new MyAudio(
		"./assets/sounds/character/characterDead.wav",
	);
	static CHARACTER_RUN = new MyAudio(
		"./assets/sounds/character/characterRun.mp3",
	);
	static CHARACTER_SNORING = new MyAudio(
		"./assets/sounds/character/characterSnoring.mp3",
	);
	static CHICKEN_DEAD = new MyAudio(
		"./assets/sounds/chicken/chickenDead.mp3",
	);
	static CHICKEN_SMALL_DEAD = new MyAudio(
		"./assets/sounds/chicken/chickenDead2.mp3",
	);
	static ENDBOSS_HURT = new MyAudio(
		"./assets/sounds/chicken/chickenDead.mp3",
	);
	static ENDBOSS_APPROACH = new MyAudio(
		"./assets/sounds/endboss/endbossApproach.wav",
	);
	static COIN_COLLECT = new MyAudio(
		"./assets/sounds/collectibles/collectSound.wav",
	);
	static BOTTLE_COLLECT = new MyAudio(
		"./assets/sounds/collectibles/bottleCollectSound.wav",
	);
	static BOTTLE_BREAK = new MyAudio(
		"./assets/sounds/throwable/bottleBreak.mp3",
	);
	static GAME_START = new MyAudio("./assets/sounds/game/gameStart.mp3");

	// Array, das alle definierten Audio-Dateien enthält
	static allSounds = [
		AudioHub.CHARACTER_JUMP,
		AudioHub.CHARACTER_DAMAGE,
		AudioHub.CHARACTER_DEAD,
		AudioHub.CHARACTER_RUN,
		AudioHub.CHARACTER_SNORING,
		AudioHub.CHICKEN_DEAD,
		AudioHub.CHICKEN_SMALL_DEAD,
		AudioHub.ENDBOSS_HURT,
		AudioHub.ENDBOSS_APPROACH,
		AudioHub.COIN_COLLECT,
		AudioHub.BOTTLE_COLLECT,
		AudioHub.BOTTLE_BREAK,
		AudioHub.GAME_START,
	];

	// Am Anfang stumm, der Nutzer kann den Ton selbst einschalten (Local Storage)
	static isMuted = localStorage.getItem("isMuted") !== "false";

	// Spielt eine einzelne Audiodatei ab
	static playOne(sound) {
		if (AudioHub.isMuted) return;
		sound.file.currentTime = 0;

		if (sound.file.readyState > 0 || sound.isLoaded) {
			sound.isLoaded = true;
			// Fehler ignorieren, wenn play() direkt von pause() unterbrochen wird
			sound.file.play().catch(() => {});
		}
	}

	// Stoppt das Abspielen aller Audiodateien
	static stopAll() {
		AudioHub.allSounds.forEach((sound) => {
			sound.file.pause();
		});
	}

	// Stoppt das Abspielen einer einzelnen Audiodatei
	static stopOne(sound) {
		sound.file.pause();
	}
}
