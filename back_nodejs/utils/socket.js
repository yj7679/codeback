const socketio = require('socket.io');
const compile = require('./compile');

module.exports = (server) => {
    const io = socketio(server, { path: '/socket.io', cors:{
        origin: "https://localhost:3000",
        credentials: true
    }});

    const roomlanguage = {};

    // connection event
    io.on('connection', (socket) => {
        console.log('new client connection! socket.id : ', socket.id);

        // disconnect event
        socket.on('disconnect', () => {
            console.log('client disconnect! socket.id : ', socket.id);

            const {roomId, nickname} = socket;

            // if socket has roomId and nickname
            if(roomId && nickname) {
                io.to(roomId).emit('leave', {
                    'nickname' : nickname
                });
            }
        });

        // client join room
        socket.on('join', (data)=>{
            const { roomId, nickname } = data;

            // if data has roomId
            if(roomId && nickname){
                socket.join(roomId);
                socket.roomId = roomId;
                socket.nickname = nickname;

                console.log(socket.id,' join ',roomId);
                io.to(roomId).emit('join',{
                    'nickname' : nickname,
                    'language': roomlanguage[roomId] ? roomlanguage[roomId] : {'value' : 'JavaScript', 'label' : 'JavaScript', 'key' : 'JavaScript'}
                });

                console.log('new user join room! roomId : ', roomId, ', nickname : ', nickname, ', room language : ', roomlanguage[roomId]);
            }
            // if data has not roomId
            else{
                console.log('no roomId or nickname');
            }
        })

        // room deleted
        socket.on('roomDeleted', ()=>{
            const roomId = socket.roomId;
            console.log('roomDeleted event! roomId : ', roomId);
            if(roomId) {
                if(roomlanguage[roomId]) delete roomlanguage[roomId];
                io.to(roomId).emit('roomDeleted');
            }
        })

        // change language
        socket.on('language', (data)=>{
            const roomId = socket.roomId;
            
            console.log('user change language roomId : ', roomId, ', language : ', data);
            if(data) roomlanguage[roomId] = data;
            // if data has roomId and language
            if(roomId && data) io.to(roomId).emit('language', data);
        })

        // compile code
        socket.on('compile', async (data) => {
            console.log('compile data : ', data);

            const roomId = socket.roomId;
            // emit pending state
            if(roomId) io.to(roomId).emit('compilePending');

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