const fs = require('fs');
const path = require('path');


const filePath = path.join(__dirname, '..', 'items.json');

function readData() {
    if (!fs.existsSync(filePath)) {
        // If file doesn't exist, return empty array
        return [];
    }
     const data = fs.readFileSync(filePath, 'utf-8');
    if (!data) {
        return [];
    }
    try {
        return JSON.parse(data);
    } catch (err) {
        // If JSON is invalid, return empty array
        return [];
    }
}

function writeData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = { readData, writeData };
