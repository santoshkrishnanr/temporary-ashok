const io = require('socket.io-client');
const socket = io.connect("http://localhost:4200/", {
    reconnection: true
});

const getcurrWeight = () => {
    const weight = Math.floor(Math.random() * 6) + 1;
    console.log(weight)
    return weight;
};

const avg = (arr) => arr.reduce((a, b) => a + b) / arr.length;

const getRespone = (stableWeight) => {
    let res;
    const minLoad = 2.9;
    const maxLoad = 3.9;
    if (stableWeight < minLoad) {
        res = "S_-" //underload
    } else if (stableWeight > maxLoad) {
        res = "S_+" //overerload
    } else {
        res = `S_S_${ stableWeight}_kg`
    }
    return res;
}

const shortPerReading = () => {
    let reading = [];
    return new Promise((resolve, reject) => {
        const readweights = () => {
            w = getcurrWeight();
            reading.push(w);
            if (reading.length < 10) {
                setTimeout(() => {
                    readweights()
                }, 10)
            }else{
                resolve(reading)
            }
        }
        readweights();
        console.log('++++++++++ current weight fluctuations ++++++++++++++++');
    })
}

socket.on('connect', () => {
    console.log("Device online")
});

socket.on('driverEvent', (command) => {
    console.log('Listening');

    if (command === 's') {
        console.log('command recognized');
        shortPerReading().then(readings => {
            stableWeight = avg(readings);
            res = getRespone(stableWeight);
            socket.emit('deviceEvent', res);
        })
    } else {
        socket.emit('deviceEvent', "S_I"); // response - command not executable
    }
})
