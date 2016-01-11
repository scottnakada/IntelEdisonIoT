var connectionString = 'Endpoint=sb://cyloncommander.servicebus.windows.net/;SharedAccessKeyName=commander;SharedAccessKey=IloBiYz1cMKZgosNm8jYCflX+KsPmyrQFhFFq/k5fmg=';
var svc = require('azure').createServiceBusService(connectionString);

function delay(ms) {
   ms += new Date().getTime();
   while (new Date() < ms){}
}

for (var i=0; i<10; i++) {
	svc.sendQueueMessage('commands', {body:'lat:321, long:123, i:'+i}, function(error) {
		if (error != null) {
			console.log('Error sending to message queue: ', error);
		}
	});
	console.log("Message " + i + " sent");
	delay(2);
};