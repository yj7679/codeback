const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const https = require('https');

dotenv.config({
  path: path.join(__dirname, '.env')
});

const app = express();
const socketio = require('./utils/socket');
const codeRouter = require('./routes/code');

app.set('port', process.env.PORT || 8081);
app.set('view engine', 'html');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

try{
  const option = {
    ca : fs.readFileSync(process.env.SECRET_PATH+'/fullchain1.pem'),
    key : fs.readFileSync(process.env.SECRET_PATH+'/privkey1.pem'),
    cert : fs.readFileSync(process.env.SECRET_PATH+'/cert1.pem')
  };

  const server = https.createServer(option, app).listen(app.get('port'), () => {
    console.log(app.get('port'), ' 번 포트에서 대기 중');
  });

  socketio(server, app)
}catch(err){
  console.log('catch err');
  console.log(err);
}