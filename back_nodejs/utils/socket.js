const socketio = require('socket.io');

module.exports = (server, app) => {
    const io = socketio(server, { path: '/socket.io' });
    app.set('io', io); // req.app.get('io')

    io.on('connection', (socket) => { // 웹소켓 연결 시
        const req = socket.request;

        console.log('새 클라이언트 접속 ', socket.id);
        socket.on('disconnect', () => {
            console.log('클라이언트 연결 해제 ', socket.id);
            clearInterval(socket.interval);
        });

        socket.on('error', (error) => {
            console.error(error);
        });

        socket.on('reply', (data) => {
            console.log(data);
        });

        socket.interval = setInterval(() => {
            console.log('emit news');
            socket.emit('news', 'hello socket.io');
        }, 3000);
    });
}