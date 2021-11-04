const socketio = require('socket.io');
const request = require('request');

module.exports = (server, app) => {
    const io = socketio(server, { path: '/socket.io' });
    app.set('io', io); // req.app.get('io')

    io.on('connection', (socket) => { // 웹소켓 연결 시
        console.log('새 클라이언트 접속 ', socket.id);

        socket.on('disconnect', () => {
            console.log('클라이언트 연결 해제 ', socket.id);
        });

        //사용자를 방에 넣어주는 작업
        socket.on('join', (data)=>{
            console.log(data);
            const {roomId} = data;
            socket.join(roomId);
            socket.roomId = roomId;

            socket.to(roomId).emit('join',{
                'chat' : socket.id + ' is join!'
            })
        })

        socket.on('language', (data)=>{
            const roomId = socket.roomId;
            const {language} = data;

            if(roomId && language) socket.to(roomId).emit('language', language);
        } )

        socket.on('compile', (data) => {
            const roomId = socket.roomId;
            const {source, input_data, language} = data;

            const compile_data = {
                script : source,
                stdin : input_data,
                language : language,
                versionIndex: "0",
                clientId : process.env.JDOODLE_ID,
                clientSecret : process.env.JDOODLE_SECRET
            };

            request({
                url: 'https://api.jdoodle.com/v1/execute',
                method: "POST",
                json: compile_data
            }, (err, resp, body)=>{
                console.log('err : ', err);
                console.log('body : ', body);

                if(err == null) socket.to(roomId).emit('compile', body);
                else socket.to(roomId).emit('compile', err);
            })
        });
    });
}