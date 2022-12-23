const fs = require('fs');
const path = require('path');

const extractStacksAndCommands = () => {
	const input = fs.readFileSync(path.join(__dirname, '..', 'inputs', 'crates.txt'), 'utf-8').split('\n');
	const nColumns = (input[0].length + 1) / 4;
	let columns = [];
	// Create the crates' stacks
	for (let i = 0; i < nColumns; i++) {
		columns.push([]);
	}

	const crates = input.splice(0, input.indexOf(''));
	for (let line of crates) {
		let crateBegin = line.indexOf('[')
		let stackWhereGoes = crateBegin / 4 + 1;
		while (crateBegin !== -1) {
			columns[stackWhereGoes - 1].push(line[crateBegin + 1]);
			crateBegin = line.indexOf('[', crateBegin + 1);
			stackWhereGoes = crateBegin / 4 + 1;
		}
	}
	// reverse the columns of crates to be a stack
	for (column of columns) {
		column = column.reverse();
	}
	const commands = input.splice(input.indexOf('') + 1);
	return { columns, commands }
}

const part1 = () => {
	const { columns, commands } = extractStacksAndCommands();

	for (let command of commands) {
		const { groups: { amount, from, to } } = command.match(/move (?<amount>\d+) from (?<from>\d+) to (?<to>\d+)/);
		for (let moves = 0; moves < amount; moves++) {
			columns[to - 1].push(columns[from - 1].pop());
		}
	}

	let cratesHeads = ''
	for (let column of columns) {
		cratesHeads += column[column.length - 1];
	}
	return cratesHeads;
}

const part2 = () => {
	const { columns, commands } = extractStacksAndCommands();

	for (let command of commands) {
		const { groups: { amount, from, to } } = command.match(/move (?<amount>\d+) from (?<from>\d+) to (?<to>\d+)/);
		let cratesToMove = columns[from - 1].slice(-amount);
		columns[from - 1] = columns[from - 1].slice(0, -amount);
		columns[to - 1] = columns[to - 1].concat(cratesToMove)
	}
	let cratesHeads = ''
	for (let column of columns) {
		cratesHeads += column[column.length - 1];
	}
	return cratesHeads;
}

module.exports = { part1, part2 };