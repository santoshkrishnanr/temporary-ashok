const io = require('socket.io-client');
const socket = io.connect("http://localhost:4200/", {
    reconnection: true
});

const getcurrWeight = () => {
    const weight = Math.floor(Math.random() * 6) + 1;
    console.log(">>>> "+ weight +" Kg")
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

let readerBusy= false;

const shortPerReading = () => {
    readerBusy= true;
    let reading = [];
    return new Promise((resolve, reject) => {
        const readweights = () => {
            if(reading.length === 0){console.log('++++++++++ current weight fluctuations ++++++++++++++++')}
            w = getcurrWeight();
            reading.push(w);
            if (reading.length < 10) {
                setTimeout(() => {
                    readweights()
                },400)
            }else{
                resolve(reading)
            }
        }
        readweights();
    })
}

socket.on('connect', () => {
    console.log("Device online and listening")
});

socket.on('driverEvent', (command) => {
    if (command === 's' && !readerBusy) {
        console.log('command recognized');
        shortPerReading().then(readings => {
            stableWeight = avg(readings);
            res = getRespone(stableWeight);
            socket.emit('deviceEvent', res);
            readerBusy= false;
        })
    } else if(!readerBusy) {
        socket.emit('deviceEvent', "S_I"); // response - command not executable
    }else{
        socket.emit('deviceEvent', "reader busy"); ;
    }
})
