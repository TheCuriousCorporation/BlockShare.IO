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

/* This code runs to send a daily update of a Bitcoin wallet amount. */
var CronJob = require('cron').CronJob;
var address = '1MwpnZhofThTc4nRd9Jte2BmQqfyDfzJDo';

/* Setting Timer for Morning Notification */
var morningNotifcation = new CronJob({
    cronTime: '00 30 9 * * 0-6',
    //cronTime: '* * * * * *',
    onTick: function() {
    	chain.getAddress(address, function(error, data) {
            var balance = data[0].total.balance / 100000000.0;
            var sent = data[0].total.sent / 100000000.0;
    		client.messages.create({
    			to: '+12069998676',
    			from: '+12069716727',
    			mediaUrl: "http://2.bp.blogspot.com/-PooEVWpM8a8/UO3gbc_55UI/AAAAAAAAFbA/HD8oaqtUzFs/s1600/liz-lemon.gif",
            	body: 'Good Morning! You have ' + balance + ' Bitcoins in your wallet. You have sent ' + sent + ' bitcoins to another wallet.'
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
morningNotifcation.start();


/* Setting Timer for Afternoon Notification */
var noonTimer = new CronJob({
    cronTime: '00 00 12 * * 0-6',
    //cronTime: '* * * * * *',
    onTick: function() {
        chain.getAddress(address, function(error, data) {
            var balance = data[0].total.balance / 100000000.0;
            var sent = data[0].total.sent / 100000000.0;
            client.messages.create({
                to: '+12069998676',
                from: '+12069716727',
                mediaUrl: "http://i.imgur.com/m3ftf8D.gif",
                body: 'The time is 12:00pm and You have ' + balance + ' Bitcoins in your wallet. You have sent ' + sent + ' bitcoins to another wallet.'
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
noonTimer.start();

/* Setting Timer for Afternoon Notification */
var afternoonNotifcation = new CronJob({
    cronTime: '00 30 16 * * 0-6',
    //cronTime: '* * * * * *',
    onTick: function() {
        chain.getAddress(address, function(error, data) {
            var balance = data[0].total.balance / 100000000.0;
            var sent = data[0].total.sent / 100000000.0;
            client.messages.create({
                to: '+12069998676',
                from: '+12069716727',
                mediaUrl: "http://siliconangle.com/files/2013/12/xbitcoin-monopoly.gif.pagespeed.ic_.FCzCvrkFF8.png",
                body: 'It\'s 4:30pm and You have ' + balance + ' Bitcoins in your wallet. You have sent ' + sent + ' bitcoins to another wallet.'
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
afternoonNotifcation.start();


/* Setting Timer for Evening Notification */
var eveningNotifcation = new CronJob({
    cronTime: '00 30 21 * * 0-6',
    onTick: function() {
        chain.getAddress(address, function(error, data) {
            var balance = data[0].total.balance / 100000000.0;
            var sent = data[0].total.sent / 100000000.0;
            client.messages.create({
                to: '+12069998676',
                from: '+12069716727',
                mediaUrl: "https://media4.giphy.com/media/GMIbzgzyS4pws/200_s.gif",
                //mediaUrl: "http://2.bp.blogspot.com/-PooEVWpM8a8/UO3gbc_55UI/AAAAAAAAFbA/HD8oaqtUzFs/s1600/liz-lemon.gif",
                body: 'Why aren\'t you in bed? Is it because you have ' + balance + ' Bitcoins in your wallet. You have sent ' + sent + ' bitcoins.'
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
eveningNotifcation.start();


/* This code runs when you receive any Bitcoin, sending an SMS to your phone number.

var WebSocket = require('ws');
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
            mediaUrl: "http://i.imgur.com/63WB3ZN.gif"
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
*/
/* Need to add code to implement a transaction through SMS. */


app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
    response.send('BLOCKSHARE.IO SMS\nSign Up Today!');
});

app.listen(app.get('port'), function() {
    console.log('BlockShare.IO data running on port', app.get('port'));
});
