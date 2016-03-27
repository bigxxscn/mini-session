# mini-session
A mini session module for Node.js

## Description
mini-session is a simple module for Node.js, it's data storaged in memery, so if web-server process restart, session will lost. So, this module is for little site and not too much data to storage in the session.

## Install
Before use mini-session, u should install "Cookies" package first.

    npm install cookies

## Demo
````javascript
var http = require("http");
var Cookies = require("Cookies");
var Session = require("./mini-session.js");

http.createServer(function(req, res){
	var cookies = new Cookies(req, res);
	var session = new Session(cookies);//init session with cookies
	
	console.log("sessionId = " + session.sessionId);

	session.set("userId", 123);
	session.set("userName", "Jhon");
	console.log("after set, session data is :");
	session.dump();

	console.log("session.get(\"userId\") = " + session.get("userId"));

	session.abandon();
	console.log("after abandon, session data is :");
	session.dump();

	res.writeHead(200, {"Content-Type":"text/html"});
	res.end("<h1>session test done!</h1>");
}).listen(8500);

console.log("Server started : http://localhost:8500");
````

console output :

    Server started : http://localhost:8500
    
    sessionId = f4e4f42b130bfb4fb663ee67122c02b8
    
    after set, session data is :
    { count: 1,
      f4e4f42b130bfb4fb663ee67122c02b8: { count: 2, userId: 123, userName: 'Jhon' } }
    
    session.get("userId") = 123
    
    after abandon, session data is :
    { count: 0 }

## API
#### sessionId
return current sessionId storaged in cookies
#### set(key, value)
set value to session with key
#### get(key)
get value from session by key
#### abandon()
remove all data from current session
#### dump()
display curretn session data into console

## History
### ver 0.1.0
2016.3.26
created
