/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
// Leave the above lines for propper jshinting
//Type Node.js Here :)

// Rotary angle switch
var Cylon = require('cylon');
 
Cylon.api({
  host: "0.0.0.0",
  port: "3000",
  ssl: false
});

Cylon
  .robot({ name: 'LightSensor'})
  .connection('edison', { adaptor: 'intel-iot' })
  .device('moisture', { driver: 'analogSensor', pin: 1, connection: 'edison' })
  .device('light',    { driver: 'analogSensor', pin: 2, connection: 'edison' })
  .device('uv',       { driver: 'analogSensor', pin: 3, connection: 'edison' })
  .on('ready', function(my) {
    //var lightVal = 0;
    //var uvVal = 0;
    var moistureVal = 0;
    my.moisture.on('analogRead', function(data) {
        moistureVal = data;
        console.log("Moisture Reading: ", moistureVal);
    });
    // my.light.on('analogRead', function(data) {
    //  lightVal = data;
    //  console.log("Light Reading: " + lightVal);
    //});
    //my.uv.on('analogRead', function(data) {
    //    uvVal = data;
    //    console.log("UV Reading: ", uvVal);
    //});
  })
  .start();