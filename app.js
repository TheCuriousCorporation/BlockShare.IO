/* 
  ____  _            _     ____  _                      ___ ___  
 | __ )| | ___   ___| | __/ ___|| |__   __ _ _ __ ___  |_ _/ _ \ 
 |  _ \| |/ _ \ / __| |/ /\___ \| '_ \ / _` | '__/ _ \  | | | | |
 | |_) | | (_) | (__|   <  ___) | | | | (_| | | |  __/_ | | |_| |
 |____/|_|\___/ \___|_|\_\|____/|_| |_|\__,_|_|  \___(_)___\___/ 
                                                                 
*/

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

var bodyParser = require('body-parser');
var WebSocket = require('ws');

/* This code runs to send a daily update of a Bitcoin wallet amount. */
var CronJob = require('cron').CronJob;
var address = '1MwpnZhofThTc4nRd9Jte2BmQqfyDfzJDo';

/* Setting Timer */
var job = new CronJob({
    cronTime: '00 30 11 * * 0-6',
    //cronTime: '* * * * * *',
    onTick: function() {
    	chain.getAddress(address, function(error, data) {
    		var balance = data[0].total.balance / 100000000.0;
            var sent = data[0].total.sent / 100000000.0;
    		client.messages.create({
    			to: '+12069998676',
    			from: '+12069716727',
    			mediaUrl: "http://2.bp.blogspot.com/-PooEVWpM8a8/UO3gbc_55UI/AAAAAAAAFbA/HD8oaqtUzFs/s1600/liz-lemon.gif",
            	body: 'You have ' + balance + ' Bitcoins in your wallet. You have sent ' + sent + ' bitcoins.'
        	}, function(error, message) {
            	if (error) {
                	console.log(error.message);
            	} else {
                	console.log(message.body);
            	}
            });
    	}); 
    },
    start: true,
    timeZone: 'America/Los_Angeles' 
});
job.start();


/* This code runs when you receive any Bitcoin, sending an SMS to your phone number. */
var conn = new WebSocket("wss://ws.chain.com/v2/notifications");

conn.onopen = function (ev) {
    var req = {type: "address", address: address, block_chain: "bitcoin"};
    conn.send(JSON.stringify(req));
};

conn.onmessage = function (ev) {
    var x = JSON.parse(ev.data);
    var data = x.payload.received / 100000000.0;
    var confirm = x.payload.confirmations;
    if (data >= '0.00000000001' && confirm < '1') {
        client.messages.create({
            to: '+12069998676',
            from: '+12069716727',
            body: 'You just received ' + data + ' Bitcoins!',
            //mediaUrl: "http://i.imgur.com/63WB3ZN.gif"
            //mediaUrl: 'http://bitcoinmemes.com/wp-content/uploads/2014/02/2.jpg'
        }, function(error, message) {
            if (error) {
                console.log(error.message);
            } else {
                console.log(message.body);
            }
        });
    } else {
        console.log(data);
    }
};

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
    response.send('BLOCKSHARE.IO SMS\nSign Up Today!');
});

app.listen(app.get('port'), function() {
    console.log('BlockShare.IO data running on port', app.get('port'));
});