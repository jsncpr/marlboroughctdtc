require('dotenv').config();
const express = require('express');
const fs = require('fs');
const _sample = require('lodash/sample');

const app = express();

app.set('port', process.env.PORT);
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	fs.readdir('./public/images/hero', { withFileTypes: true }, (err, dirents) => {
		const heroFileNames = dirents.reduce((memo, dirent) => {
			if (dirent.isFile()) {
				memo.push(dirent.name);
			}

			return memo;
		}, []);

		res.render('pages/index', {
			hero: _sample(heroFileNames)
		});
	});
});

app.use(express.static('public'));

app.listen(app.get('port'), () => {
	console.log(`App listening on port ${app.get('port')}`);
});
