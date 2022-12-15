const fs = require('fs');
const path = require('path');

const fullyContains = (elf1, elf2) =>
	(elf1[0] <= elf2[0]) && (elf1[1] >= elf2[1])


const overlaps = (elf1, elf2) =>
	(elf1[0] <= elf2[0]) && (elf1[1] >= elf2[0])

const part1 = () => {
	const pairs = fs.readFileSync(path.join(__dirname, '..', 'inputs', 'sections.txt'), 'utf-8').split('\n');
	let pair;
	return pairs.reduce((pairsContaining, nextPair) => {
		pair = nextPair.split(',');
		pair = pair.map((elf) =>
			elf.split('-').map((digit) => Number.parseInt(digit))
		)
		let increment = (fullyContains(pair[0], pair[1]) || fullyContains(pair[1], pair[0])) ? 1 : 0;
		return pairsContaining + increment;
	}, 0)
}


const part2 = () => {
	const pairs = fs.readFileSync(path.join(__dirname, '..', 'inputs', 'sections.txt'), 'utf-8').split('\n');
	let pair;
	return pairs.reduce((pairsOverlaping, nextPair) => {
		pair = nextPair.split(',');
		pair = pair.map((elf) =>
			elf.split('-').map((digit) => Number.parseInt(digit))
		)
		let increment = (overlaps(pair[0], pair[1]) || overlaps(pair[1], pair[0])) ? 1 : 0;
		return pairsOverlaping + increment;
	}, 0)
}

module.exports = { part1, part2 };