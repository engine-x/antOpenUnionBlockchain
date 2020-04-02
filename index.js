const request = require('request');
const crypto = require('crypto');
const fs = require('fs');
module.exports = antOpenUnionBlockchain;



function antOpenUnionBlockchain(options, callback) {
    if(!options.AccessId) return callback('Please provide AccessId.');
    if(!options.AccessKey) return callback('Please provide AccessKey Path.');
    this.data = {
        AccessId: options.AccessId,
        AccessKey: options.AccessKey
    }

    return callback(null, 'Configured successfully')
}



antOpenUnionBlockchain.prototype.shakeHand=function(callback){
	var privateKey = fs.readFileSync(this.data.AccessKey).toString();
	const timestamp = Date.parse(new Date()).toString();
    const message = this.data.AccessId+timestamp;
    let sign = crypto.createSign('RSA-SHA256');
	sign.update(new Buffer(message, 'utf-8'));
	let sig = sign.sign(privateKey, 'hex');
	let postdata={"accessId":this.data.AccessId,"time":timestamp,"secret":sig};
	this.callApi("api/contract/shakeHand",postdata, (err, result) => {
	if(err) throw err;
	   return callback(null,result);
    }); 

}


antOpenUnionBlockchain.prototype.callApi = function(cmd,postdata,callback){

	request({
		rejectUnauthorized :false,
		uri: 'https://rest.baas.alipay.com/'+cmd,
		method: 'POST',
		json:true,
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: postdata
	}, (err, res, body) => {
		if(err) return callback(err);
    	return callback(null, body);
	});
}






