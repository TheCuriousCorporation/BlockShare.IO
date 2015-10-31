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

var address = '1MwpnZhofThTc4nRd9Jte2BmQqfyDfzJDo';
//var inputAddress = '';
var sendAddress = ''; // Add address to send.
var privateKeys = []; // Add private key.
var publicKey  = []; // Add public key.
var amount = 10000;
var transactionHash;
var signature;
var unsignedHex;

// Template to be used in transaction code.
var templateOne = {
	inputs: [{
		address: address
		privateKey: privateKeys
	}],
	ouputs: [{
		address: sendAddress,
		amount: amount
	}]
};

var sentAmount = amount / 100000000.0;

// Code to build a transaction
chain.transact(templateOne, function(error, data) {
	transactionHash = data[0].transaction_hash;
	console.log(transactionHash);
});

// Template to be used to sign template.
var templateTwo = {
	inputs: [{
		signatures_required: 1,
		signatures: [{
			address: address,
			public_key: publicKey,
			hash_to_sign: transactionHash,
			signature: signature
		}]
	}],
	miner_fee: 10000,
	unsigned_hex: unsignedHex;
}

// Template signature
chain.signTemplate(template, privateKeys);

// Code to send a transaction
chain.sendTransaction(template, function(error, data) {
	var send = data[0].hash_transaction;
	client.messages.create({
		to: '+12069998676',
    	from: '+12069716727',
    	body: 'Just sent ' + sentAmount + ' to address: ' + sendAddress + '.'
	}, function(error, message) {
		if (error) {
			console.log(error);
		} else {
			console.log(message.body);
		}
	});
});