/* This project (blink-mraa) demonstrates the use of the MRAA library
    to control the Intel Edison hardware from node JS.  It blinks the
    LED attached to GPIO 13.  This LED is attached to all Arduino
    interface boards, and is used to detect electronic alive state */

/* Include the mraa hardware interface library */
var mraa = require('mraa');
/* Declare a mraa GPIO pin object */
var pin13 = new mraa.Gpio(13);
/* Set the direction of the GPIO to be an output */
pin13.dir(mraa.DIR_OUT);

/* Track the state of the LED */
var state = false;

/* Call the toggle function to toggle the LED state */
toggle();

/* Toggle the state of the LED from on to off or off to on */
function toggle() {
	/* Go to the opposite state */
	state = !state;
	/* Turn the LED on, if the state is true, or off, if false */
	pin13.write(state ? 1 : 0);
	/* Call the toggle function again in 500ms */
	setTimeout(toggle, 500);
}