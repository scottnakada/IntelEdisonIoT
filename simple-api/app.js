/* This project (simple-api) is a node js, express, Cylon app, which creates
    a simple http api, to control an LED, depending upon what http calls are
    made.  http calls to 192.168.1.83:2000/api/lighton turn the led on, and calls
    to http://192.168.1.83:2000/api/lightoff.  It blinks the LED attached to GPIO 13.
    This LED is attached to all Arduino interface boards, and is used to detect
    electronic alive state */

/* Include the Cylon Javascript Robotics Programming Framework */
var Cylon = require('cylon');
/* Include the express library to setup an http api */
var app = require('express')();

/* Declare a Cylon Robot to handle the electronics */
Cylon.robot({
    /* Define the connections to the devices */
    connections: {
        /* Use the intel-iot adapter to connect to the edison */
        edison: { adaptor: 'intel-iot' }
    },

    /* Define the devices connected to the hardware */
    devices: {
        /* Use the led driver to connect to GPIO 13 */
        led: { driver: 'led', pin: 13 }
    },

    /* Define the work function to be performed on the edison */
    work: function(edison) {
        /* Define an http path, and action to take when it is called */
        app.get('/api/lighton', function() {
            edison.led.turnOn();
        });
        /* Define an http path, and action to take when it is called */
        app.get('/api/lightoff', function() {
            edison.led.turnOff();
        });
        /* Start a web-server on port 2000 */
        console.log('Web Server started on port 2000');
        app.listen(2000);
    }
    /* Start the Cylon interface */
}).start();