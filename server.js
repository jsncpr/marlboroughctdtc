require('dotenv').config();
const express = require('express');

const app = express();

app.set('port', process.env.PORT);

app.use(express.static('public'));

app.listen(app.get('port'), () => {
	console.log(`App listening on port ${app.get('port')}`);
});
