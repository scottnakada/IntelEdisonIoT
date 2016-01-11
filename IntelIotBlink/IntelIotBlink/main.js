/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

/* This project (IntelIotBlink) demonstrates the use of the MRAA library
   to control the Intel Edison hardware from node JS.  It is configured to use
   the Intel IoT XDK, to download the npm packages, monitor file changes, and
   download the new information to the Intel device. Once the program is
   downloaded to the target device, it will install the npm packages
   on the target device, and run the program in a debug mode, which
   allows remote breakpoints, or displaying variables.
        It blinks the LED attached to GPIO 13.  This LED is attached to
   all Arduino interface boards, and is used to detect electronic alive state.
        To use the latest MRAA and UPM libraries, you need to do the following
   on your Intel Edison:
        Using a ssh client:
        1. echo "src maa-upm http://iotdk.intel.com/repos/1.1/intelgalactic" > /etc/opkg/intel-iotdk.conf
        2. opkg update
        3. opkg upgrade

 Article: https://software.intel.com/en-us/html5/articles/intel-xdk-iot-edition-nodejs-templates

*/

/* Include the mraa hardware interface library */
var mraa = require('mraa');
/* Print out the MRAA library version */
console.log('MRAA Version: ' + mraa.getVersion());

/* Declare a mraa GPIO pin object using GPIO 13 */
var myOnboardLed = new mraa.Gpio(13);
/* Set the direction of the GPIO to be an output */
myOnboardLed.dir(mraa.DIR_OUT);

/* Track the state of the LED */
var ledState = true;

/* Call the periodicActivity function to toggle the LED state */
periodicActivity();

/* Toggle the state of the LED from on to off or off to on */
function periodicActivity()
{
    /* Turn the LED on, if the state is true, or off, if false */
    myOnboardLed.write(ledState ? 1 : 0);
    /* Go to the opposite state */
    ledState = !ledState;
    /* Call the toggle function again in 1000ms */
    setTimeout(periodicActivity,1000);
}
