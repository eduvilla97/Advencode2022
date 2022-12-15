const fs = require('fs');
const path = require('path');

const part1 = () => {
	const input = fs.readFileSync(path.join(__dirname, '..', 'inputs', 'crates.txt'), 'utf-8').split('\n');
	const nColumns = (input[0].length + 1) / 4;
	let columns = [];
	for (let i = 0; i < nColumns; i++) {// Create the crates' stacks
		columns.push([]);
	}

	const crates = input.splice(0, input.indexOf(''));
	for (let line of crates) {
		// Find the first crate of the line
		let firstCrate = line.indexOf('[')
		if (firstCrate === -1) break
		let crateWhereGoes = firstCrate / 4 + 1;
		console.log(crateWhereGoes);
	}


	const commands = input.splice(input.indexOf('') + 1);
	// Follow every command
}

const part2 = () => { }

module.exports = { part1, part2 };