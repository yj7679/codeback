const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const https = require('https');
const express = require('express');
const morgan = require('morgan');

// read .env
dotenv.config({
  path: path.join(__dirname, '.env')
});

const app = express();
const socketio = require('./utils/socket');

app.set('port', process.env.PORT || 8081);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// read .pem files for https
try{
  const option = {
    ca : fs.readFileSync(process.env.SECRET_PATH+'/fullchain1.pem'),
    key : fs.readFileSync(process.env.SECRET_PATH+'/privkey1.pem'),
    cert : fs.readFileSync(process.env.SECRET_PATH+'/cert1.pem')
  };

  const server = https.createServer(option, app).listen(app.get('port'), () => {
    console.log(app.get('port'), ' 번 포트에서 대기 중 webhook변경 & accept merge request 만 클릭함');
  });

  socketio(server)
}catch(err){
  console.log('catch err');
  console.log(err);
}