const io = require('socket.io').listen(4200);

io.on('connection', (socket) => {
    console.log("Driver online \n");

    /* socket.on('deviceEvent', (data) => {
        
    });

    setTimeout(() => {
        socket.emit('driverEvent', {});
    },5000/3); */
});

