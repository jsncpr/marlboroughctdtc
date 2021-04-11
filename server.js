require('dotenv').config();
const axios = require('axios');
const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const _sample = require('lodash/sample');
const path = require('path');
const qs = require('qs');
const favicon = require('serve-favicon');

const app = express();

app.set('port', process.env.PORT);
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
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

app.get('/latest', (req, res) => {
	res.render(path.join('pages', 'latest'));
});

app.post('/feedback', (req, res) => {
	const { email, message } = req.body;
	let domain = process.env.MAILGUN_DOMAIN;
	let to = process.env.MAILGUN_TO;

	if (process.env.NODE_ENV === 'development') {
		domain = process.env.MAILGUN_DOMAIN_SANDBOX;
		to = process.env.MAILGUN_TO_SANDBOX;
	}

	axios.post(`https://api:${process.env.MAILGUN_API_KEY}@api.mailgun.net/v2/${domain}/messages`, qs.stringify({
		from: email,
		subject: 'MDTC website contact form submission',
		text: message,
		to
	}))
		.catch(error => {
			res.status(500);
			console.log(error);
		})
		.finally(() => {
			res.end();
		});
});

app.use(express.static('public'));

app.listen(app.get('port'), () => {
	console.log(`App listening on port ${app.get('port')}`);
});
