/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
"use strict";
 
var cylon = require("cylon");
 
cylon.robot({
  name: "doorbot",
  connections: {
    edison: { adaptor: "intel-iot" }
  },
  devices: {
    // digital sensors
    button: { driver: "button",        pin: 3,  connection: "edison" },
    // digital drivers
    led:    { driver: "led",           pin: 13, connection: "edison" },
    relay:  { driver: "direct-pin",  pin: 5,  connection: "edison" },
    buzzer: { driver: "direct-pin",  pin: 4,  connection: "edison" }
  },
  setup: function() {
    this.led.turnOff();
  },
  work: function() {
    var that = this;
      var value = 0;
      
    that.setup();

    that.button.on('push', function() {
        console.log("Button push, value = ", value);
        that.led.turnOn();
        if (value === 0) {
            that.buzzer.digitalWrite(1);
            value = 1;
        } else {
            that.relay.digitalWrite(1);
            value = 0;
        }
    });
 
    that.button.on('release', function() {
        console.log("Button release");
        that.led.turnOff();
        that.buzzer.digitalWrite(0);
        that.relay.digitalWrite(0);
    });
  }
}).start();