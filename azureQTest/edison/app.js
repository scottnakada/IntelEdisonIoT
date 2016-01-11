var connectionString = 'Endpoint=sb://cyloncommander.servicebus.windows.net/;SharedAccessKeyName=edison;SharedAccessKey=xuu5OdKlHpCOojCKFILnqMI7I2rNNRJcf/MNpJ87xVI=';
var svc = require('azure').createServiceBusService(connectionString);

receive();
function receive() {
svc.receiveQueueMessage('commands', function(error, msg) {
	if (!error) {
		console.log(msg.body);
	} else {
		if (error != "No messages to receive") {
			console.log("Error receiving message, error=", error);
		}
	}
	setTimeout(receive, 10);
})
}