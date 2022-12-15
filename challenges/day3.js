const fs = require('fs');
const path = require('path');

const part1 = () => {
	const rucksacks = fs.readFileSync(path.join(__dirname, '..', 'inputs', 'rucksacks.txt'), 'utf-8').split('\n');
	// const rucksacks = ['vJrwpWtwJgWrhcsFMMfFFhFp',
	// 	'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
	// 	'PmmdzqPrVvPwwTWBwg',
	// 	'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
	// 	'ttgJtRGJQctTZtZT',
	// 	'CrZsJsPPZsGzwwsLwLmpwMDw']
	let firstCompartment, secondCompartment;
	let sum = 0;
	for (let rucksack of rucksacks) {
		firstCompartment = Array.from(rucksack.slice(0, rucksack.length / 2));
		secondCompartment = rucksack.slice(rucksack.length / 2);
		for (let type of firstCompartment) {
			if (secondCompartment.includes(type)) {
				if (type.charCodeAt(0) < 97) { // Capital cas
					sum += type.charCodeAt(0) - 65 + 27;
				} else { // Lowercase
					sum += type.charCodeAt(0) - 96;
				}
				break;
			}
		}
	}
	return sum;
}

const part2 = () => {
	const rucksacks = fs.readFileSync(path.join(__dirname, '..', 'inputs', 'rucksacks.txt'), 'utf-8').split('\n');
	// const rucksacks = ['vJrwpWtwJgWrhcsFMMfFFhFp',
	// 	'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
	// 	'PmmdzqPrVvPwwTWBwg',
	// 	'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
	// 	'ttgJtRGJQctTZtZT',
	// 	'CrZsJsPPZsGzwwsLwLmpwMDw']
	const groups = rucksacks.map((_, index) => {
		if (index % 3 === 0)
			return rucksacks.slice(index, index + 3);
	}).filter(e => !!e);
	return groups.reduce((acc, [r1, r2, r3]) => {
		for (let type of r1) {
			if (r2.includes(type) && r3.includes(type)) {
				if (type.charCodeAt(0) < 97) { // Capital cas
					return acc + type.charCodeAt(0) - 65 + 27;
				} else { // Lowercase
					return acc + type.charCodeAt(0) - 96;
				}
			}
		}
		return false;
	}, 0)
}

module.exports = { part1, part2 };