/* 
  ____  _            _     ____  _                      ___ ___  
 | __ )| | ___   ___| | __/ ___|| |__   __ _ _ __ ___  |_ _/ _ \ 
 |  _ \| |/ _ \ / __| |/ /\___ \| '_ \ / _` | '__/ _ \  | | | | |
 | |_) | | (_) | (__|   <  ___) | | | | (_| | | |  __/_ | | |_| |
 |____/|_|\___/ \___|_|\_\|____/|_| |_|\__,_|_|  \___(_)___\___/ 
                                                                 
*/

var express = require('express');
var app = express();
var request = require("request");

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


/* This code runs to send a daily update of a Bitcoin price and personal wallet amount. */
var CronJob = require('cron').CronJob;
var address = '1MwpnZhofThTc4nRd9Jte2BmQqfyDfzJDo';
var url = 'https://api.coinbase.com/v2/prices/buy';
var spot = 'https://api.coinbase.com/v2/prices/spot';

/* This is wrong */
var template = {
    input: [{
        address: address
    }],
    output: [{
        address: address
    }]
}


app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
    chain.getAddress(address, function(error, data) {
    	var balance = data[0].total.balance / 100000000.0;
    	response.send("Your have " + balance + " Bitcoins");
    });
});

app.listen(app.get('port'), function() {
    console.log('BlockShare.IO data running on port', app.get('port'));
});


