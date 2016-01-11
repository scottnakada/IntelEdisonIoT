/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

/* This project (IntelCylonBlink) demonstrates the use of the Cylon library
    to control the Intel Edison hardware from node JS.  It is configured to use
    the Intel IoT XDK, to download the npm packages, monitor file changes, and
    download the new information to the Intel device. Once the program is
    downloaded to the target device, it will install the npm packages
    on the target device, and run the program in a debug mode, which
    allows remote breakpoints, or displaying variables.
    It blinks the LED attached to GPIO 13.  This LED is attached to
    all Arduino interface boards, and is used to detect electronic alive state.
*/
"use strict";

/* Include the Cylon Javascript Robotics Programming Framework */
var cylon = require("cylon");

/* Declare a Cylon Robot to handle the electronics */
cylon.robot({
    /* Name the project */
    name: "IntelCylonBlink",
    /* Define the connections to the devices */
    connections: {
        /* Use the intel-iot adapter to connect to the edison */
        edison: { adaptor: "intel-iot" }
    },
    /* Define the devices connected to the hardware */
    devices: {
        /* Use the led driver to connect to GPIO 13 */
        led: { driver: "led", pin: 13, connection: "edison" }
    },

    /* Define the work function to be performed on the edison */
    work: function() {
        var that = this;

        /* Every second, toggle the led state */
        setInterval(function() {
            that.led.toggle();
        }, 1000);
    }
    /* Start the Cylon interface */
}).start();