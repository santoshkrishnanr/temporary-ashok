const io = require('socket.io-client');
const socket = io.connect("http://localhost:4200/", {
    reconnection: true
});


socket.on('connect', () => {
     console.log("Device online");

    /*socket.on('driverEvent', () => {
        console.log('Listening');
        
        //console.log("sending state info to driver....");
        //socket.emit('deviceEvent', stateInfo);
    }) */
});

