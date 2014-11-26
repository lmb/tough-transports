var xhr = require("xmlhttprequest");
var WebSocket = require("ws");
var tough = require("tough-cookie");

function Session() {
	this.jar = new tough.CookieJar();
}

Session.prototype.WebSocket = function(url) {
	var header = this.jar.getCookieStringSync(url);
	return new WebSocket(url, {headers: {"Cookie": header}});
};

Session.prototype.XMLHttpRequest = function() {
	var instance = new xhr.XMLHttpRequest();
	instance.setCookieJar(this.jar);
	return instance;
};

module.exports = {
	WebSocket: WebSocket,
	XMLHttpRequest: xhr.XMLHttpRequest,
	Session: Session,
};
