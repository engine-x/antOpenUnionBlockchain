# antOpenUnionBlockchain

> NPM module for acquiring response from the Ant Open Union Blockchain Rest API without form authentication hassle

## Install

```sh
npm install ant-openunion-blockchain
```

## Requirements
This package builds upon the fact that a correct pair of accessId and AccessKey are provided. You can generate these [Here](https://baas.cloud.alipay.com/open-union)

## Usage
How to initialize the module with the correct data.

```javascript
const ant = require('ant-openunion-blockchain');

const options = {
	AccessId: "AEVMeqalDIMMPKLX", 
	AccessKey: "./access.key" //控制台下载的access.key 文件内需要将 -----BEGIN BEGIN PRIVATE KEY----- 及 -----END BEGIN PRIVATE KEY----- 替换为 -----BEGIN PRIVATE KEY----- 和 -----END PRIVATE KEY-----
};

const antblc = new ant(options, (err, result) => {
	if(err) throw err;
	console.log(result); 
	// Configured successfully
});
```

## ShakeHand and Get token 握手并获得access token
 a token will be returned to you.
```javascript
const getToken = antblc.shakeHand((err, result) => {
	if(err) throw err;
	console.log(result);
	//返回数据
 	//{ success: true,
    //  code: '200',
    //  data: '067d1e51-3766-48f9-9d77-426ae6f1e9e3' }
});
```

## Create Transactions  交易消息类
Endpoint https://rest.baas.alipay.com/api/contract/chainCallForBiz

存证
```javascript
let options={"orderId":"uniqueOrderid","bizid":"a00e36c5","account":"链上账户名","content":"hello","tenantid":"tenantid","mykmsKeyId":"kmskeyid","method":"DEPOSIT","accessId":"accessId","token":"token got from shakeHand","gas":100000}
antblc.callApi("api/contract/chainCallForBiz",options, (err, result) => {
	if(err) throw err;
	console.log(result)
	//返回数据
	//{ success: true,
    //  code: '200',
    //  data: 'bed3d2cf1836853e665304a9f05c485ca577341fb5ea2cd4fc4301d9d0e59336' }
});

```
异步调用solidity合约
```javascript
let callContractPostData={"orderId":"uniqueOrderid","bizid":"a00e36c5","account":"链上账户名","contractName":"contractName","methodSignature":"testfunc(uint256)","outTypes":"[bool]","requestStr":"[1001]","tenantid":"tenantid","mykmsKeyId":"mykmsKeyId","method":"CALLCONTRACTBIZASYNC","accessId":"accessId","token":"token got from shakeHand","gas":120000}
antblc.callApi("api/contract/chainCallForBiz",callContractPostData, (err, result) => {
	if(err) throw err;
	console.log(result)
	//返回数据
	//{ success: true,
    //  code: '200',
    //  data: '340504146e71fe592218ebaba7a77f476c94df0ce37bb45b468af9e90b6f6f0b' }
});

```

其他
```javascript
参照在线文档 https://tech.antfin.com/docs/2/146925
```
## Query Transactions  查询消息类
Endpoint https://rest.baas.alipay.com/api/contract/chainCall

查询交易

```javascript
let options ={"bizid":"a00e36c5","method":"QUERYTRANSACTION","hash":"4697408818a38989dad45f13a7467d0eb16e8d89430fbd3d84cda57fabab614f","accessId":"accessId","token":"token got from shakeHand"}
antblc.callApi("api/contract/chainCall",options, (err, result) => {
		if(err) throw err;
		console.log(result);
		//返回数据
		// { success: true,
        // code: '200',
        // data: '{"blockNumber":6669833,"transactionDO":{"data":"EstwxwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA2QMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQDQzOTk0NDFjNDM2OGY5ZjM3NWY3Y2NhYTI3MzgxZThjOTg3M2E5Yzc5Y2YwOTIzMTFiZjI1NDBmZTU3ZTAzNzg=","timestamp":1585826930345}}' }
	   });

```
其他
```javascript
参照在线文档 https://tech.antfin.com/docs/2/146925

