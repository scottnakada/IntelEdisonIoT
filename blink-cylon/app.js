/* This project (blink-cylon) demonstrates the use of the Cylon library
 to control the Intel Edison hardware from node JS.  It blinks the
 LED attached to GPIO 13.  This LED is attached to all Arduino
 interface boards, and is used to detect electronic alive state */

/* Include the Cylon Javascript Robotics Programming Framework */
var Cylon = require('cylon');

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
        /* Every second, toggle the led state */
        every((1).second(), edison.led.toggle);
    }
    /* Start the Cylon interface */
}).start();