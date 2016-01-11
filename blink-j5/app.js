/* This project (blink-j5) demonstrates the use of the johnny-five library
 to control the Intel Edison hardware from node JS.  It blinks the
 LED attached to GPIO 13.  This LED is attached to all Arduino
 interface boards, and is used to detect electronic alive state */

/* Include the Johnny-Five Javascript Robotics Programming Framework */
var five = require("johnny-five");
/* Include edison-io library */
var Edison = require("edison-io");

/* Declare the board using the Johnny Five interface */
var board = new five.Board({
    /* Create an edison io interface */
    io: new Edison()
});

/* Wait for the board to be ready */
board.on("ready", function() {
    /* Define an Led on GPIO 13 */
    var led = new five.Led(13);
    /* Blink the LED */
    led.blink();
});
