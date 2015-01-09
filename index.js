var xhr = require("xmlhttprequest");
var WebSocket = require("ws");
var tough = require("tough-cookie");
var url = require("url");

function Session() {
	this.jar = new tough.CookieJar();
}

Session.prototype.WebSocket = function(urlStr) {
	var cookies = this.jar.getCookieStringSync(url);
	var parsed = url.parse(urlStr);

	var origin = parsed.protocol + '//' + parsed.host;

	return new WebSocket(url, {headers: {
		"Cookie": cookies,
		"Origin": origin,
	}});
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
