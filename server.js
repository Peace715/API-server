const http = require('http');
const handleitems = require('./routes/items');

const port = 3000;

const requestListener = function(req, res) {
    if (req.url.startsWith('/items')) {
        handleitems(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid endpoint' }));
    }
};

const server = http.createServer(requestListener);

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});