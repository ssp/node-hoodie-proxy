var proxy = require('http-proxy').createProxyServer({});

var server = require('http').createServer(function(req, res) {
	// You can define here your custom logic to handle the request
	// and then proxy the request.
	var logString = req.url;
	req.url = req.url.replace(/^\/_api\/user\//, '/_api/user%2F');
	logString += ' -> ' + req.url;
	console.log(logString);
	
	proxy.web(req, res, { target: 'http://127.0.0.1:6007' });
	
	proxy.on('error', function (error) {
		res.writeHead(500, {
			'Content-Type': 'text/plain'
		});
		res.end(JSON.stringify(error));
		console.log(error);
	});
});

server.listen(62455);
