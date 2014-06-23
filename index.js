var proxy = require('http-proxy').createProxyServer({});

var server = require('http').createServer(function(req, res) {
	var logString = req.url;

	var pathComponents = req.url.split('/');
	if (pathComponents.length >= 4) {
		if (pathComponents[1] === '_api') {
			if (pathComponents[2] === 'user') {
				pathComponents.splice(2, 2, 'user%2F' + pathComponents[3]);
			}
			
			if (pathComponents.length >= 5) {
				pathComponents.splice(3, 2, pathComponents[3] + '%2F' + 				pathComponents[4]);
			}
			
			req.url = pathComponents.join('/');
		}
	}

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
