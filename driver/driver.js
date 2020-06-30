const io = require('socket.io').listen(4200);

const sendCmd = (socket) => {
    console.log('Sending Command: Send stable weight value');
    socket.emit('driverEvent',"s");
};

io.on('connection', (socket) => {
    console.log("Driver online \n");

    setInterval(() => {
        sendCmd(socket)
    },3000)

    socket.on('deviceEvent', (data) => { 
        console.log("command response :"+ data +"\n")       
    });
});
