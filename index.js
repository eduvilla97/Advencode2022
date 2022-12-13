const fs = require('fs');
const path = require('path');
const { parentPort } = require('worker_threads');

const challenge1 = () => {
	const calories = fs.readFileSync(path.join(__dirname, 'inputs', 'calories.txt'), 'utf-8').split('\r\n');
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

const challenge2 = () => {
	const calories = fs.readFileSync(path.join(__dirname, 'inputs', 'calories.txt'), 'utf-8').split('\r\n');
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

const challenge3 = () => {
	const gameLogic = {
		'X': { wins: 'C', draw: 'A', points: 1 },
		'Y': { wins: 'A', draw: 'B', points: 2 },
		'Z': { wins: 'B', draw: 'C', points: 3 }
	}
	const WON = 6;
	const DRAW = 3;
	/*
	X ------ ROCK --------- A
	Y ------ PAPER -------- B
	Z	------ SCISSORS ----- C
	*/
	const matches = fs.readFileSync(path.join(__dirname, 'inputs', 'rps.txt'), 'utf-8').split('\n');
	// const matches = ['C X', 'C X', 'B Y', 'B X'];
	let plays;
	let score = 0;

	for (let match of matches) {
		plays = match.split(' ');
		if (gameLogic[plays[1]].wins === plays[0]) {
			score += gameLogic[plays[1]].points + WON;
		} else
			if (gameLogic[plays[1]].draw === plays[0]) {
				score += gameLogic[plays[1]].points + DRAW;
			} else {
				score += gameLogic[plays[1]].points;
			}
	}
	return score;
}

const challenge4 = () => {
	const gameLogic = {
		'A': { wins: 2, draws: 1, loses: 3 },
		'B': { wins: 3, draws: 2, loses: 1 },
		'C': { wins: 1, draws: 3, loses: 2 }
	}
	const WON = 6;
	const DRAW = 3;

	const matches = fs.readFileSync(path.join(__dirname, 'inputs', 'rps.txt'), 'utf-8').split('\n');
	// const matches = ['C X', 'C X', 'B Y', 'B X'];
	let plays;
	let score = 0;

	for (let match of matches) {
		plays = match.split(' ');
		if (plays[1] === 'Z') { // Player wins
			score += gameLogic[plays[0]].wins + WON;
		} else
			if (plays[1] === 'Y') { // DRAW
				score += gameLogic[plays[0]].draws + DRAW;
			}
			else { // Player loses
				score += gameLogic[plays[0]].loses;
			}
	}
	return score;
}

console.log(challenge4());