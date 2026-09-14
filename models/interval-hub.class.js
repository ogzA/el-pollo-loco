export class IntervalHub {
	// Speichert alle registrierten Interval-IDs
	static allIntervals = [];

	/**
	 * Starts a new interval and adds it to the allIntervals array.
	 * @param {Function} func - function that is repeated
	 * @param {number} timer - time in milliseconds
	 * @returns {number} id of the interval
	 */
	static startInterval(func, timer) {
		const newInterval = setInterval(func, timer);
		IntervalHub.allIntervals.push(newInterval);
		return newInterval;
	}

	/**
	 * Stops all registered intervals and clears the registry.
	 */
	static stopAllIntervals() {
		IntervalHub.allIntervals.forEach(clearInterval);
		IntervalHub.allIntervals = [];
	}
}
