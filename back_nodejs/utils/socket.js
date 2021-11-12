const socketio = require('socket.io');
const compile = require('./compile');

module.exports = (server) => {
    const io = socketio(server, { path: '/socket.io', cors:{
        origin: "https://localhost:3000",
        credentials: true
    } });

    // connection event
    io.on('connection', (socket) => {
        console.log('new client connection! socket.id : ', socket.id);

        // disconnect event
        socket.on('disconnect', () => {
            console.log('client disconnect! socket.id : ', socket.id);
        });

        // client join room
        socket.on('join', (data)=>{
            const {roomId, nickname} = data;

            // if data has roomId
            if(roomId && nickname){
                socket.join(roomId);
                socket.roomId = roomId;

                console.log(socket.id,' join ',roomId);
                io.to(roomId).emit('join',{
                    'nickname' : nickname
                });
            }
            // if data has not roomId
            else{
                console.log('no roomId');
            }
        })

        // leave room
        socket.on('leave', (data)=>{
            const roomId = socket.roomId;
            const {nickname} = data;

            // if data has roomId and language
            if(roomId && nickname) {
                io.to(roomId).emit('leave', {
                    'nickname' : nickname
                });
            }
            else{
                console.log('no roomId or nickname');
            }
        })

        // change language
        socket.on('language', (data)=>{
            const roomId = socket.roomId;
            const {language} = data;

            // if data has roomId and language
            if(roomId && language) io.to(roomId).emit('language', language);
        })

        // compile code
        socket.on('compile', async (data) => {
            console.log('compile data : ', data);

            const roomId = socket.roomId;
            // emit pending state
            if(roomId) io.to(roomId).emit('compilePending', {'pending':'true'});

            let compile_result = null;
            try{
                compile_result = await compile(data);
            }catch(err){
                compile_result = err;
            }

            // emit compile result
            if(roomId) io.to(roomId).emit('compile', compile_result);
        });
    });
}