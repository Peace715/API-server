const { readData, writeData } = require('../utils.js/fileHandler');
const { randomUUID } = require('crypto');

function handleitems(req, res) {
    let body = '';

    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', () => {
        const items = readData();
        const urlParts = req.url.split('/');
        const id = urlParts[2];

        if (req.method === 'GET' && req.url === '/items') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ data: items }));
        } else if (req.method === 'GET' && urlParts.length === 3) {
            const item = items.find(i => i.id === id);
            if (item) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ data: item }));
            } else {
                res.writeHead(404);
                res.end(JSON.stringify({ error: 'Item Not Found' }));
            }
        } else if (req.method === 'POST' && req.url === '/items') {
            const newItem = JSON.parse(body);
            newItem.id = randomUUID();
            items.push(newItem);
            writeData(items);
            res.writeHead(201);
            res.end(JSON.stringify({ data: newItem }));
        } else if (req.method === 'PUT' && urlParts.length === 3) {
            const index = items.findIndex(i => i.id === id);
            if (index !== -1) {
                const updatedItem = { ...items[index], ...JSON.parse(body) };
                items[index] = updatedItem;
                writeData(items);
                res.writeHead(200);
                res.end(JSON.stringify({ data: updatedItem }));
            } else {
                res.writeHead(404);
                res.end(JSON.stringify({ error: 'Item Not Found' }));
            }
        } else if (req.method === 'DELETE' && urlParts.length === 3) {
            const newItems = items.filter(i => i.id !== id);
            if (newItems.length !== items.length) {
                writeData(newItems);
                res.writeHead(204);
                res.end();
            } else {
                res.writeHead(404);
                res.end(JSON.stringify({ error: 'Item Not Found' }));
            }
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'Route Not Found' }));
        }
    });
}

module.exports = handleitems;
