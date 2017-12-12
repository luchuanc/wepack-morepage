const fs = require('fs');
const inquirer = require('inquirer');

const generateFile = (fileName, title) => {
	let html =
		`<!DOCTYPE html>
<html>
	<head>
		<meta charset='UTF-8'>
		<title>${title}</title>
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' />
		<link href="./static/css/bootstrap.min.css" rel="stylesheet">
	</head>
	<body>
		<script src='https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js'></script>
	</body>
</html>
`;

	let css =`@import 'base.less';\n@import 'var.less';`;

	let js = `require('../../css/${fileName}.less');`;

	fs.writeFile(`./src/html/${fileName}.html`, html, err => {
		if (err) {
			console.log(err);
		} else {
			console.log(`Generate ${fileName}.html file ok!`);
		}
	});

	fs.writeFile(`./src/css/${fileName}.less`, css, err => {
		if (err) {
			console.log(err);
		} else {
			console.log(`Generate ${fileName}.css file ok!`);
		}
	});

	fs.writeFile(`./src/js/app/${fileName}.js`, js, err => {
		if (err) {
			console.log(err);
		} else {
			console.log(`Generate ${fileName}.js file ok!`);
		}
	});
};

inquirer.prompt([
	{
		type: 'input',
		name: 'fileName',
		message: 'Please input page file name:',
		default: 'index'
	},
	{
		type: 'input',
		name: 'title',
		message: 'Please input page title:',
		default: 'test'
	}
]).then(answers => {
	generateFile(answers.fileName, answers.title);
});
