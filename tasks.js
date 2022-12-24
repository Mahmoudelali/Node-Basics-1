/**
 * Starts the application
 * This is the function that is run when the app starts
 *
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name) {
	process.stdin.resume();
	process.stdin.setEncoding('utf8');
	process.stdin.on('data', onDataReceived);
	console.log(`Welcome to ${name}'s application!`);
	console.log('--------------------');
}
var tasks = [];
const commands = [
	'hello',
	'exit',
	'quit',
	'hello <user name>',
	'list',
	'add',
	'remove',
	'remove <task>',
];
/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 *
 * For example, if the user entered
 * ```
 * node tasks.js batata
 * ```
 *
 * The text received would be "batata"
 * This function  then directs to other functions
 *
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
	if (text === 'quit\n') {
		quit();
	} else if (text === 'hello\n') {
		hello();
	} else if (text.substring(0, 5) === 'hello') {
		extendedHello(text);
	} else if (text === 'exit\n') {
		exit();
	} else if (text === 'list\n') {
		list(tasks);
	} else if (text === 'help\n') {
		help(commands);
	} else if (text.substring(0, 3) == 'add') {
		add(text);
	} else if (text.startsWith('remove')) {
		remove(text);
	} else if (text.startsWith('edit')) {
		edit(text, tasks);
	} else if (text.startsWith('check')) {
		check(text);
	} else {
		unknownCommand(text);
	}
}

/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function edit(text, arr) {
	let str = text.replace('edit').trim();

	arr.pop();
	arr.push(str);
	console.log(arr);
}

function unknownCommand(c) {
	console.log('unknown command: "' + c.trim() + '"');
}
function extendedHello(text) {
	let str = text.substring(5).replace('\n', '');
	let fullStr = `hello ${str.trim()}!`;
	console.log(fullStr);
}

function remove(task) {
	if (task === 'remove\n') {
		tasks.pop();
	} else {
		let index = Number(task.replace('remove', '').replace('\n', '').trim());

		if (tasks.indexOf[index - 1] == -1) {
			console.log('task number does not exist');
		}
		tasks.splice(index - 1, 1);
		console.log(tasks);
	}
}
// list element
function list(arr, passingArg) {
	if (arr.length == 0) {
		console.log('No tasks to display !');
	}
	let str = '';

	for (let i in arr) {
		if (arr[i] == arr[passingArg]) {
			str += `[✓]: ${arr[i]}\n`;
			continue;
		}
		str += `[ ]: ${tasks[i]}\n`;
	}
	console.log(str);
}
// check element

function check(task) {
	let index = Number(task.replace('check', '').replace('\n', '').trim());
	console.log(`${index}`);
	list(tasks, index);
}

/**
 * Says hello
 *
 * @returns {void}
 */
function hello() {
	console.log('hello!');
}

function exit() {
	console.log('Quitting now, goodbye!');
	process.exit();
}

function help(arr) {
	console.log(`you may try these commands :`);
	let str = '';
	for (let i in arr) {
		str += `${i} : ${arr[i]}\n`;
	}
	console.log(str);
}

function add(task) {
	if (task.length === 3) {
		console.log('error : unable to add empty task');
	} else {
		tasks.push(task.replace('add', '').replace('\n', '').trim());
		console.log(tasks);
	}
}
// The following line starts the application
startApp('mahmoud elali');
