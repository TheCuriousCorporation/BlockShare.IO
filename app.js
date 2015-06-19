
var express = require('express');
var app = express();
/* Setting up Twilio Account ID and Authorization Tokens */
var accountSid = 'AC4e2633202eec2d81ec69ce915a4cf09c';
var authToken = 'b16545ba5d69db808155a46d08a3f256';
var twilio = require('twilio');
var client = new twilio.RestClient(accountSid, authToken);

/* Setting up Chain Account ID, Secret, and setting Blockchain */
var Chain = require('chain-node');
var chain = new Chain({
    keyId: 'e44df67bb29b9576b60a34e2e423b2df',
    keySecret: '82ae4198214a0d8a6019b3fcf58471f9',
    blockChain: 'bitcoin'
});

/* Setting Timer */
var CronJob = require('cron').CronJob;
var address = '1MwpnZhofThTc4nRd9Jte2BmQqfyDfzJDo';

var job = new CronJob({
    cronTime: '00 15 15 * * 0-6',
    //cronTime: '* * * * * *',
    onTick: function() {
    	chain.getAddress(address, function(error, data) {
    		var balance = data[0].total.balance / 100000000.0;
    		client.messages.create({
    			to: '+12069998676',
    			from: '+12069716727',
    			mediaUrl: "http://2.bp.blogspot.com/-PooEVWpM8a8/UO3gbc_55UI/AAAAAAAAFbA/HD8oaqtUzFs/s1600/liz-lemon.gif",
            	body: 'You have ' + balance + ' Bitcoins in your wallet.'
        	}, function(error, message) {
            	if (error) {
                	console.log(error.message);
            	} else {
                	console.log(message.body);
            	}
        }	);
    	}); 

    },
    start: true,
    timeZone: 'America/Los_Angeles' 
});
job.start();




app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});