var gulp = require('gulp');
var Candyman = require('candyman');

var candyman = new Candyman( {
	targetDevices: [
		{ devicename: 'myedisona', hostname: 'myedisona.local'}
	],
	projectName: 'projects/my-api',
	user: 'root',
	password: 'rootPass',
	startFile: 'app.js'
	
})

gulp.task('deploy', function() {
	console.log('Running the deploy task');
	
	return candyman.deploy();
	
})