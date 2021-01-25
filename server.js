require('dotenv').config();
const express = require('express');

const app = express();

app.set('port', process.env.PORT);
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('pages/index');
});

app.use(express.static('public'));

app.listen(app.get('port'), () => {
	console.log(`App listening on port ${app.get('port')}`);
});
