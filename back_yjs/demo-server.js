
/**
 * @type {any}
 */
const dotenv = require('dotenv');
const WebSocket = require('ws')
const https = require('https')
const http = require('http')
const StaticServer = require('node-static').Server
const fs = require('fs')
const path = require('path');
const setupWSConnection = require('y-websocket/bin/utils.js').setupWSConnection

dotenv.config({
  path: path.join(__dirname, '.env')
});

const production = process.env.PRODUCTION != null
const port = process.env.PORT || 8082

const staticServer = new StaticServer('../', { cache: production ? 3600 : false, gzip: production })

try{
  const option = {
    ca : fs.readFileSync(process.env.SECRET_PATH+'/fullchain1.pem'),
    key : fs.readFileSync(process.env.SECRET_PATH+'/privkey1.pem'),
    cert : fs.readFileSync(process.env.SECRET_PATH+'/cert1.pem')
  };

  const server = https.createServer(option, (request, response) => {
    request.addListener('end', () => {
      staticServer.serve(request, response)
    }).resume()
  })
  const wss = new WebSocket.Server({ server })
  
  wss.on('connection', (conn, req) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('new client connection ip : ', ip);
    setupWSConnection(conn, req, { gc: req.url.slice(1) !== 'prosemirror-versions' });

    conn.on('close', () => {
      console.log('client close ip : ', ip);
    })
  })
  
  server.listen(port)
  
  console.log(`Listening to https://localhost:${port} ${production ? '(production)' : ''}`)
}catch(err){
  console.log('yjs server err');
  console.log(err);
}
