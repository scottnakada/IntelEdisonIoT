/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
// Leave the above lines for propper jshinting
//Type Node.js Here :)
"use strict";
 
var cylon = require("cylon");
 
cylon.robot({
  name: "intel-cylon-lcd",
  connections: {
    edison: { adaptor: "intel-iot" }
  },
  devices: {
    // digital sensors
    button: { driver: "button",        pin: 3, connection: "edison" },
    led:    { driver: "led",           pin: 13, connection: "edison" },
    // i2c devices
    screen: { driver: "upm-jhd1313m1", connection: "edison" }
  },
  writeMessage: function(message, color) {
    var that = this;
    var str = message.toString();
    while (str.length < 16) {
      str = str + " ";
    }
    console.log(message);
    that.screen.setCursor(0,0);
    that.screen.write(str);
    switch(color)
    {
      case "red":
        that.screen.setColor(255, 0, 0);
        break;
      case "green":
        that.screen.setColor(0, 255, 0);
        break;
      case "blue":
        that.screen.setColor(0, 0, 255);
        break;
      default:
        that.screen.setColor(255, 255, 255);
        break;
    }
  },
  reset: function() {
    this.writeMessage("LCD ready");
    this.led.turnOff();
  },
  work: function() {
    var that = this;
    var value = 0;
      
    that.reset();

    that.button.on('push', function() {
      that.led.turnOn();
        switch(value) {
            case 0:
                that.writeMessage("Lights On Blue", "blue");
                value = 1;
                break;
            case 1:
                that.writeMessage("Lights On Red", "red");
                value = 2;
                break;
            case 2:
                that.writeMessage("Lights On Green", "green");
                value = 0;
                break;
            default:
                that.writeMessage("Invalid value");
                break;
        }
    });
 
    that.button.on('release', function() {
      that.reset();
    });
  }
}).start();