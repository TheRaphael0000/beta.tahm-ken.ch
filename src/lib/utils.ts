export function intersectSets(sets: Set<any>[]) {
	if (!sets || sets.length === 0) {
		return new Set();
	}

	let intersection = new Set(sets[0]);

	for (let i = 1; i < sets.length; i++) {
		intersection = intersection.intersection(sets[i]);
	}

	return intersection;
}

export function* chain(...iterables: any[]) {
	for (const iterable of iterables) {
		for (const item of iterable) {
			yield item;
		}
	}
}
