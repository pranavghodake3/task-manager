const { Server } = require('socket.io');

const socketObj = {
    io: null
};
let io;

socketObj.initiateConnection = (httpServer) => {
    io = new Server(httpServer, {
    cors: {
            origin: "http://localhost:5173"
        },
    });
    socketObj.io = io;
    // console.log("SOCKETTT IO: ",io);
    return io;
};

socketObj.getIo = () => {
    return socketObj.io
}

module.exports = socketObj;
