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

var Chain = require('chain-node');
var chain = new Chain({
    keyId: 'oops',
    keySecret: 'oops',
    blockChain: 'bitcoin'
});

/* Setting up Twilio Account ID and Authorization Tokens */
var accountSid = 'oops';
var authToken = 'oops';
var twilio = require('twilio');
var client = new twilio.RestClient(accountSid, authToken);


/* This code runs to send a daily update of a Bitcoin price and personal wallet amount. */
var CronJob = require('cron').CronJob;
var address = '1MwpnZhofThTc4nRd9Jte2BmQqfyDfzJDo';
var sendAddress = '1Px1iWYzA16P3kskuSQPLhhshcT6kSabY1';
var buy = 'https://api.coinbase.com/v2/prices/buy'; // => var x = data.data.amount;
var sell = 'https://api.coinbase.com/v2/prices/sell'; // => var x = data.data.amount;
var spot = 'https://api.coinbase.com/v2/prices/spot'; // => var x = data.data.amount;
var volatility = 'https://btcvol.info/latest'; // => var x = data.Volatility;

/* Pricing notification sent via SMS */
var priceNotification = new CronJob({
    cronTime: '00 00 9 * * 0-6',
    //cronTime: '* * * * * *',
    onTick: function() {
        request({
            url: buy,
            json: true
        }, function(error, response, data) {
            var btcPrice = data.data.amount;
            if (!error && response.statusCode == 200) {
                request({
                    url: spot,
                    json: true
                }, function(error, response, data) {
                    var btcSpot = data.data.amount;
                    if (!error && response.statusCode == 200) {
                        client.messages.create({
                            to: '+12069998676',
                            from: '+12069716727',
                            mediaUrl: 'http://1.bp.blogspot.com/-vfDJM0J2nTE/UuW_Rd7m-yI/AAAAAAAACjY/Ghgo9Pou_yU/s1600/btc+7.gif',
                            body: "The current spot price is $" + btcSpot + " and the buy price is $" + btcPrice + "."
                        }, function(error, message) {
                            if (error) {
                                console.log(error.message);
                            } else {
                                console.log(message.body);
                            }
                        });
                    }
                });
            }
        });
    },
    start: true,
    timeZone: 'America/Los_Angeles' 
});
priceNotification.start()

/* Setting Timer for Morning Notification */
var morningNotifcation = new CronJob({
    cronTime: '00 30 9 * * 0-6',
    //cronTime: '* * * * * *',
    onTick: function() {
        chain.getAddress(address, function(error, data) {
            var getBalance = data[0].total.balance / 100000000.0;
            var balance = getBalance.toFixed(4);
            request({
                url: spot,
                json: true
            }, function(error, response, data) {
                var price = data.data.amount;
                if (!error && response.statusCode == 200) {
                    var combineBalance = price * balance;
                    var newBalance = combineBalance.toFixed(2)
                    client.messages.create({
                        to: '+12069998676',
                        from: '+12069716727',
                        mediaUrl: "http://2.bp.blogspot.com/-PooEVWpM8a8/UO3gbc_55UI/AAAAAAAAFbA/HD8oaqtUzFs/s1600/liz-lemon.gif",
                        body: 'You have a balance of $' + newBalance + ' or (' + balance 
                                + ') Bitcoins in your wallet. The current spot price is $' + price + '.'
                    }, function(error, message) {
                        if (error) {
                            console.log(error.message)
                        } else {
                            console.log(message.body);
                        }
                    });
                }
            });
        }); 
    },
    start: true,
    timeZone: 'America/Los_Angeles' 
});
morningNotifcation.start();

/* Pricing notification sent via SMS */
var priceNotificationAfternoon = new CronJob({
    cronTime: '00 00 12 * * 0-6',
    //cronTime: '* * * * * *',
    onTick: function() {
        request({
            url: buy,
            json: true
        }, function(error, response, data) {
            var btcPrice = data.data.amount;
            if (!error && response.statusCode == 200) {
                request({
                    url: spot,
                    json: true
                }, function(error, response, data) {
                    var btcSpot = data.data.amount;
                    if (!error && response.statusCode == 200) {
                        client.messages.create({
                            to: '+12069998676',
                            from: '+12069716727',
                            mediaUrl: 'http://1.bp.blogspot.com/-vfDJM0J2nTE/UuW_Rd7m-yI/AAAAAAAACjY/Ghgo9Pou_yU/s1600/btc+7.gif',
                            body: "The current spot price is $" + btcSpot + " and the buy price is $" + btcPrice + "."
                        }, function(error, message) {
                            if (error) {
                                console.log(error.message);
                            } else {
                                console.log(message.body);
                            }
                        });
                    }
                });
            }
        });
    },
    start: true,
    timeZone: 'America/Los_Angeles' 
});
priceNotificationAfternoon.start()


/* Pricing notification sent via SMS  */
var priceNotificationEvening = new CronJob({
    cronTime: '00 30 16 * * 0-6',
    //cronTime: '* * * * * *',
    onTick: function() {
        chain.getAddress(address, function(error, data) {
            var getBalance = data[0].total.balance / 100000000.0;
            var balance = getBalance.toFixed(4);
            request({
                url: spot,
                json: true
            }, function(error, response, data) {
                var price = data.data.amount;
                if (!error && response.statusCode == 200) {
                    var combineBalance = price * balance;
                    var newBalance = combineBalance.toFixed(2)
                    client.messages.create({
                        to: '+12069998676',
                        from: '+12069716727',
                        mediaUrl: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRttCcps5FEKnu9DKPXOodQ7wb2iw1lxWFQFmCq3MDvZfaJ0BYyvw",
                        body: 'You have a balance of $' + newBalance + ' or (' + balance 
                                + ') Bitcoins in your wallet. The current spot price is $' + price + '.'
                    }, function(error, message) {
                        if (error) {
                            console.log(error.message)
                        } else {
                            console.log(message.body);
                        }
                    });
                }
            });
        }); 
    },
    start: true,
    timeZone: 'America/Los_Angeles' 
});
priceNotificationEvening.start()

/* Bitcoin Price Volatility SMS Notification */
var VolatilityIndex = new CronJob({
    cronTime: '00 00 18 * * 0-6',
    //cronTime: '* * * * * *',
    onTick: function() {
        request({
            url: volatility,
            json: true
        }, function(error, response, data) {
            var str = data.Volatility;
            var vol = str.toFixed(2);
            if (!error && response.statusCode == 200) {
                client.messages.create({
                    to: '+12069998676',
                    from: '+12069716727',
                    mediaUrl: 'http://i.imgur.com/m3ftf8D.gif',
                    body: 'The daily Bitcoin Volatility Index is at ' + vol + '%.'
                }, function(error, message) {
                    if (error) {
                        console.log(error.message);
                    } else {
                        console.log(message.body);
                    }
                });
            }
        });
    },
    start: true,
    timeZone: 'America/Los_Angeles'     
});
VolatilityIndex.start()

/* Pricing notification sent via SMS */
var priceNotificationNight = new CronJob({
    cronTime: '00 00 21 * * 0-6',
    //cronTime: '* * * * * *',
    onTick: function() {
        request({
            url: buy,
            json: true
        }, function(error, response, data) {
            var btcPrice = data.data.amount;
            if (!error && response.statusCode == 200) {
                request({
                    url: spot,
                    json: true
                }, function(error, response, data) {
                    var btcSpot = data.data.amount;
                    if (!error && response.statusCode == 200) {
                        client.messages.create({
                            to: '+12069998676',
                            from: '+12069716727',
                            mediaUrl: 'http://1.bp.blogspot.com/-vfDJM0J2nTE/UuW_Rd7m-yI/AAAAAAAACjY/Ghgo9Pou_yU/s1600/btc+7.gif',
                            body: "The current spot price is $" + btcSpot + " and the buy price is $" + btcPrice + "."
                        }, function(error, message) {
                            if (error) {
                                console.log(error.message);
                            } else {
                                console.log(message.body);
                            }
                        });
                    }
                });
            }
        });
    },
    start: true,
    timeZone: 'America/Los_Angeles' 
});
priceNotificationNight.start()

/* Setting Timer for Evening Notification */
var eveningNotifcation = new CronJob({
    cronTime: '00 30 21 * * 0-6',
    //cronTime: '* * * * * *',
    onTick: function() {
        chain.getAddress(address, function(error, data) {
            var getBalance = data[0].total.balance / 100000000.0;
            var balance = getBalance.toFixed(4);
            request({
                url: spot,
                json: true
            }, function(error, response, data) {
                var price = data.data.amount;
                if (!error && response.statusCode == 200) {
                    var combineBalance = price * balance;
                    var newBalance = combineBalance.toFixed(2);
                    client.messages.create({
                        to: '+12069998676',
                        from: '+12069716727',
                        mediaUrl: "https://media4.giphy.com/media/GMIbzgzyS4pws/200_s.gif",
                        body: 'You have a balance of $' + newBalance + ' or (' + balance 
                                + ') Bitcoins in your wallet. The current spot price is $' + price + '.'
                    }, function(error, message) {
                        if (error) {
                            console.log(error.message)
                        } else {
                            console.log(message.body);
                        }
                    });
                }
            });
        }); 
    },
    start: true,
    timeZone: 'America/Los_Angeles' 
});
eveningNotifcation.start();


/* This code runs when you receive any Bitcoin, sending an SMS to your phone number.  */

var WebSocket = require('ws');
var conn = new WebSocket("wss://ws.chain.com/v2/notifications");

conn.onopen = function (ev) {
    var req = {type: "address", address: sendAddress, block_chain: "bitcoin"};
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

/* Code to Add */
// Sending SMS from a personal number to receive balance whenever you are curious.


app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
    response.send('BLOCKSHARE.IO SMS\nSign Up Today!');
});

app.listen(app.get('port'), function() {
    console.log('BlockShare.IO data running on port', app.get('port'));
});

/* Principles for the Development of a Complete Mind: Study the science of art. 
   Study the art of science. Develop your senses — especially learn how to see. 
   Realize that everything connects to everything else. */