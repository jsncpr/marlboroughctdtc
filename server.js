require('dotenv').config();
const express = require('express');
const fs = require('fs');
const _sample = require('lodash/sample');
var path = require('path');
var favicon = require('serve-favicon');

const app = express();

app.set('port', process.env.PORT);
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.get('/', (req, res) => {
	fs.readdir(path.join(__dirname, 'public', 'images', 'hero'), { withFileTypes: true }, (err, dirents) => {
		const heroFileNames = dirents.reduce((memo, dirent) => {
			if (dirent.isFile()) {
				memo.push(dirent.name);
			}

			return memo;
		}, []);

		res.render(path.join('pages', 'index'), {
			hero: _sample(heroFileNames)
		});
	});
});

app.use(express.static('public'));

app.listen(app.get('port'), () => {
	console.log(`App listening on port ${app.get('port')}`);
});
