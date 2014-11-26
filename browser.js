var global = (function() { return this; })();
var WebSocket = global.WebSocket || global.MozWebSocket;

function Session() {}

Session.prototype.WebSocket = function(url) {
	return new WebSocket(url);
};

Session.prototype.XMLHttpRequest = function() {
	return new XMLHttpRequest();
};

module.exports = {
	WebSocket: WebSocket,
	XMLHttpRequest: XMLHttpRequest,
	Session: Session,
};
