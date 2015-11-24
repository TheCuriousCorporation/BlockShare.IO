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
var accountSid = '<accountSid>';
var authToken = '<authToken>';
var twilio = require('twilio');
var client = new twilio.RestClient(accountSid, authToken);

/* Setting up Chain Account ID, Secret, and setting Blockchain */
var Chain = require('chain-node');
var chain = new Chain({
    keyId: '<keyId>',
    keySecret: '<keySecret>',
    blockChain: 'bitcoin'
});


/* This code runs to send a daily update of a Bitcoin price and personal wallet amount. */
var CronJob = require('cron').CronJob;
var address = '<Insert Bitcoin Address>';
var url = 'https://api.coinbase.com/v2/prices/buy';
var spot = 'https://api.coinbase.com/v2/prices/spot';

var address = '<Insert Bitcoin Address>';
var sendAddress = '<Insert Address>';
var privateKey = '<Insert Private Key';
var amount = 100000;

var template = {
    inputs: [{
        address: address,
        private_key: privateKey
    }],
    outputs: [{
        address: sendAddress,
        amount: amount
    }]
};

chain.transact(template, function(err, data) {
  // add code here
});


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


