const dotenv = require('dotenv');
const path = require('path');
const express = require('express');
const morgan = require('morgan');

dotenv.config({
  path: path.join(__dirname, '.env')
});

const app = express();
const socketio = require('./utils/socket');
const codeRouter = require('./routes/code');

app.set('port', process.env.PORT || 3001);
app.set('view engine', 'html');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = app.listen(app.get('port'), () => {
  console.log(app.get('port'), ' 번 포트에서 대기 중');
});

socketio(server, app);
