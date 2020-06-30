## Driver-Balance communication simulation using node.js


descriptiion.

The npm run sart command brings the driver app to be online on port 4200 and makes device app to listen to the incoming command on port 4200.The communication is established using websockets. 

The driver app  sends command "S" after every 3 second. The device app checks the input command and if the recieved command is "S" , it returns a response to driver back.

The device measures the weight fluctuation on the balance after 400ms for a defined short range of 100 ms and calculates the average weight. This value is then compared to an upper and lower limit values. If the average weight is higher than upper limit , the response to driver will be S_+ indivating overload. If the average weight is lower than lower limit , the response to driver will be S_- indivating underload. If the average value is within the limit range the value is consideres as stable weight and is send as response. If driver sends an response while balance is reading the weight , a response of "reader busy is send"

---
## Requirements

For development, you will need Node.js and a node global package, npm installed in your environement.

## Install

    $ git clone url
    $ cd Driver-Balance communication simulation using node.js
    $ cd prject-folder/driver
    $ npm install
    $ cd prject-folder/device
    $ npm install

## Running the project
   Terminal 1
   $ cd prject-folder/driver
   $ npm run start

   Terminal 2
   $ cd prject-folder/device
   $ npm run start
