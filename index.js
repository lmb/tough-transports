var xhr = require("xmlhttprequest");
var WebSocket = require("ws");
var tough = require("tough-cookie");
var url = require("url");

var protocolMap = {
	"ws:": "http:",
	"wss:": "https:",
};

function Session() {
	this.jar = new tough.CookieJar();
}

Session.prototype.WebSocket = function(urlStr) {
	var cookies = this.jar.getCookieStringSync(urlStr);
	var parsed = url.parse(urlStr);

	var origin = protocolMap[parsed.protocol] + '//' + parsed.host;

	return new WebSocket(urlStr, {headers: {
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
