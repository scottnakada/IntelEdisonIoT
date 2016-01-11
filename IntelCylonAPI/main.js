/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
// Leave the above lines for propper jshinting
//Type Node.js Here :)
"use strict";

var cylon = require("cylon");

/* Add links to sensors */
/* Add the Grove Temperature Humidity Sensor */
var upm_th02 = require('jsupm_th02');
var tempHumidity = new upm_th02.TH02();

/* Add the Grove PIR motion sensor */
var grove_motion = require('jsupm_biss0001');
var myMotionObj = new grove_motion.BISS0001(7);

/* Add the Grove Rotary Encoder */
var rotaryEncoder = require("jsupm_rotaryencoder");
var myRotaryEncoder = new rotaryEncoder.RotaryEncoder(9, 10);
/* Initialize the rotary encoder */
myRotaryEncoder.initPosition();

/* Add the web interface to the cylon project */
cylon.api({
    host: "0.0.0.0",
    port: "3000",
    ssl: false
});

/* Define the Cylon Robot */
cylon.robot({
    /* Name of the Project */
    name: "intel-cylon-tweet",
    /* Computers */
    connections: {
        edison: {
            adaptor: "intel-iot"
        }
    },
    /* Devices/Drivers for sensors/devices */
    devices: {
        /* Analog Sensors */
        moisture: {
            driver: "analogSensor",
            pin: 1,
            connection: "edison"
        },
        light: {
            driver: "analogSensor",
            pin: 2,
            connection: "edison"
        },
        uv: {
            driver: "analogSensor",
            pin: 3,
            connection: "edison"
        },

        /* Digital Sensors */
        button: {
            driver: "button",
            pin: 3,
            connection: "edison"
        },

        /* Digital Drive Pins */
        led: {
            driver: "led",
            pin: 13,
            connection: "edison"
        },
        relay: {
            driver: "direct-pin",
            pin: 5,
            connection: "edison"
        },
        buzzer: {
            driver: "direct-pin",
            pin: 4,
            connection: "edison"
        },
        servo: {
            driver: "servo",
            pin: 6,
            connection: "edison"
        },

        /* I2c Devices */
        screen: {
            driver: "upm-jhd1313m1",
            connection: "edison"
        }
    },
    /* Ring the buzzer for a second, and turn it off */
    doorbell: function () {
        var that = this;
        that.buzzer.digitalWrite(1);
        that.writeMessage("Doorbell pressed", "purple");
        setTimeout(function () {
            that.reset();
        }, 1000);
    },
    /* Ring the buzzer for a second, and turn it off */
    motion_detect: function () {
        var that = this;
        that.buzzer.digitalWrite(1);
        that.writeMessage("Intruder Alert", "yellow");
        setTimeout(function () {
            that.reset();
        }, 1000);
    },
    /* Close the relay for a second, then turn it off */
    relayOn: function () {
        var that = this;
        that.relay.digitalWrite(1);
        that.writeMessage("Relay On", "brown");
        setTimeout(function () {
            that.reset();
        }, 1000);
    },
    /* Write a message to the first line of the LCD display, and set the background color */
    writeMessage: function (message, color) {
        var that = this;
        var str = message.toString();
        while (str.length < 16) {
            str = str + " ";
        }
        console.log(message);
        that.screen.setCursor(0, 0);
        that.screen.write(str);
        switch (color) {
        case "red":
            that.screen.setColor(255, 0, 0);
            break;
        case "green":
            that.screen.setColor(0, 255, 0);
            break;
        case "blue":
            that.screen.setColor(0, 0, 255);
            break;
        case "purple":
            that.screen.setColor(128, 0, 128);
            break;
        case "magenta":
            that.screen.setColor(255, 0, 255);
            break;
        case "yellow":
            that.screen.setColor(255, 255, 0);
            break;
        case "brown":
            that.screen.setColor(165, 42, 42);
            break;
        default:
            that.screen.setColor(255, 255, 255);
            break;
        }
    },
    /* Write a message to the second line of the LCD display */
    writeLine2: function (message) {
        var that = this;
        var str = message.toString();
        while (str.length < 16) {
            str = str + " ";
        }
        console.log(message);
        that.screen.setCursor(1, 0);
        that.screen.write(str);
    },
    /* Reset the LCD display, turn off the led, buzzer, and open relay */
    reset: function () {
        this.writeMessage("LCD ready");
        this.led.turnOff();
        this.buzzer.digitalWrite(0);
        this.relay.digitalWrite(0);

    },
    /* Do the actual work of the robot */
    work: function () {
        /* Initialize some common local variables */
        var that = this;
        var colorValue = 0;
        var moistureValue = 0;
        var lightValue = 0;
        var uvValue = 0;
        var tempValue = 0;
        var humidityValue = 0;
        var motionValue = 0;
        var encoderValue = 0;
        var msgStr;
        var displayMsg = 0;

        /* Reset the display, led, buzzer, and relay */
        that.reset();

        /* Do stuff when the button is pushed */
        that.button.on('push', function () {
            /* Turn the led on *?
            that.led.turnOn();
            /* Depending on the colorValue, do different operations */
            switch (colorValue) {
            case 0:
                /* When the colorValue == 0, change the display to blue */
                that.writeMessage("Lights On Blue", "blue");
                colorValue = 1;
                break;
            case 1:
                /* When the colorValue == 1, change the display to red */
                that.writeMessage("Lights On Red", "red");
                colorValue = 2;
                break;
            case 2:
                /* When the colorValue == 2, change the display to green */
                that.writeMessage("Lights On Green", "green");
                colorValue = 3;
                break;
            case 3:
                /* When the colorValue == 3, ring the doorbell */
                that.doorbell();
                colorValue = 4;
                break;
            case 4:
                /* When the colorValue == 4, close the relay */
                that.relayOn();
                colorValue = 0;
                break;
            default:
                /* Invalid colorValue, display error message, and initialize value */
                that.writeMessage("Invalid value: ", colorValue);
                colorValue = 0;
                break;
            }
        });

        /* Reset the display when the button is released */
        that.button.on('release', function () {
            that.reset();
        });

        /* Do this every 600 milliseconds */
        setInterval(function () {
            /* Toggle the led */
            that.led.toggle();
            /* Read the sensors */
            moistureValue = that.moisture.analogRead();
            lightValue = that.light.analogRead();
            uvValue = that.uv.analogRead();
            tempValue = tempHumidity.getTemperature();
            humidityValue = tempHumidity.getHumidity();
            motionValue = myMotionObj.value();
            encoderValue = myRotaryEncoder.position();

            /* Show a different message, depending upon displayMsg value */
            switch (displayMsg) {
            case 0:
                /* Show the moisture, light, and UV values */
                msgStr = "M=" + moistureValue.toString() + ",L=" + lightValue.toString() + ",U=" + uvValue.toString();
                displayMsg = 1;
                break;
            case 1:
                /* Show the temperature and humidity */
                msgStr = "T=" + tempValue.toString() + ",H=" + humidityValue.toString();
                displayMsg = 2;
                break;
            case 2:
                /* Show motion detected message */
                if (motionValue) {
                    msgStr = "Detecting moving object";
                } else {
                    msgStr = "No moving objects detected";
                }
                displayMsg = 3;
                break;
            case 3:
                /* Show the rotary encoder value */
                msgStr = "E=" + encoderValue.toString();
                displayMsg = 0;
                break;
            default:
                /* Invalid displayMsg value, initialize it */
                displayMsg = 0;
                break;
            }
            /* Write the sensor values to the second line of the display */
            that.writeLine2(msgStr);
            /* Use a 600 millisecond delay between intervals */
        }, 600);
    }
}).start(); /* Start the cylon robot */