var crypto = require("crypto");

var cache = {
	count: 0
};


module.exports = function(cookies){
	var md5 = function(content){
		var MD5 = crypto.createHash('md5');
		MD5.update(content);
		return MD5.digest('hex');
	}
	var getSessionId = function(){
		var sessionIdName="nsessionId";
		var sessionId=cookies.get(sessionIdName);
		if(!sessionId){
			sessionId=md5(Date.now() + "-" + Math.random());
			cookies.set(sessionIdName, sessionId);
		}
		return sessionId;
	};
	var sessionId = getSessionId();
	var getSessionBag = function(){
		var sessionBag = cache[sessionId];
		if(!sessionBag){
			sessionBag = {};
			sessionBag.count = 0;
			cache[sessionId] = sessionBag;
			cache.count ++;
		}
		return sessionBag;
	};

	this.set=function(key, value){
		var sessionBag = getSessionBag();
		if(!sessionBag[key]) sessionBag.count++;
		sessionBag[key] = value;
	};

	this.get = function(key){
		var sessionBag = getSessionBag();
		return sessionBag[key];
	};
	this.abandon = function(){
		if(cache[sessionId]){
			delete cache[sessionId];
			cache.count--;
		}
	};
	this.dump = function(){
		console.log(cache);
	};
	this.sessionId = sessionId;
}