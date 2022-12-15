const fs = require('fs');
const path = require('path');

const part1 = () => {
	const calories = fs.readFileSync(path.join(__dirname, '..', 'inputs', 'calories.txt'), 'utf-8').split('\r\n');
	const { elfCal, maxCal } = calories.reduce(({ elfCal, maxCal }, line) =>
		line === '' ?
			{
				elfCal: 0,
				maxCal: elfCal >= maxCal ? elfCal : maxCal
			}
			:
			{
				elfCal: elfCal + Number.parseInt(line),
				maxCal: maxCal
			}
		, { elfCal: 0, maxCal: 0 })
	return elfCal > maxCal ? elfCal : maxCal;
}

const part2 = () => {
	const calories = fs.readFileSync(path.join(__dirname, '..', 'inputs', 'calories.txt'), 'utf-8').split('\r\n');
	const { elfCal, top3Elfs } = calories.reduce(({ elfCal, top3Elfs }, line) => {
		if (line === '') {
			if (top3Elfs[0] < elfCal) {
				top3Elfs[0] = elfCal;
				top3Elfs.sort();
			}
			return { elfCal: 0, top3Elfs }
		}
		return { elfCal: elfCal + Number.parseInt(line), top3Elfs }
	}
		, { elfCal: 0, top3Elfs: [0, 0, 0] })
	if (top3Elfs[0] < elfCal) {
		top3Elfs[0] = elfCal;
		top3Elfs.sort();
	}
	return top3Elfs.reduce((acc, x) => acc + x, 0)
}

module.exports = { part1, part2 };