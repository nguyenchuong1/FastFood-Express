const express = require('express');
const httpProxy = require('http-proxy');
const cors = require('cors');
const axios = require('axios'); // Axios for health checks
const fs = require('fs'); // File system module

const app = express();
const proxy = httpProxy.createProxyServer({});

const servers = [
    { url: 'http://localhost:3001', healthy: true },
    { url: 'http://localhost:3002', healthy: true },
    { url: 'http://localhost:3003', healthy: true },
    { url: 'http://localhost:3004', healthy: true }
];

let current = 0;

// Function to log messages to a file
const logToFile = (message) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    fs.appendFileSync('load-balancer.log', logMessage);
};

app.use(cors());

// Logging middleware
app.use((req, res, next) => {
    const logMessage = `Request received for ${req.url}`;
    console.log(logMessage);
    logToFile(logMessage);
    next();
});

// Health check function
const checkServerHealth = async () => {
    for (const server of servers) {
        try {
            await axios.get(`${server.url}/health`);
            if (!server.healthy) {
                const logMessage = `Server at ${server.url} has recovered`;
                console.log(logMessage);
                logToFile(logMessage);
            }
            server.healthy = true;
        } catch (error) {
            if (server.healthy) {
                const logMessage = `Server at ${server.url} is unhealthy`;
                console.log(logMessage);
                logToFile(logMessage);
            }
            server.healthy = false;
        }
    }
};

// Run health check every 10 seconds
setInterval(checkServerHealth, 10000);

app.use((req, res) => {
    let server;
    for (let i = 0; i < servers.length; i++) {
        current = (current + 1) % servers.length;
        if (servers[current].healthy) {
            server = servers[current];
            break;
        }
    }
    
    if (server) {
        proxy.web(req, res, { target: server.url });
        const logMessage = `Proxying request to ${server.url}`;
        console.log(logMessage);
        logToFile(logMessage);
    } else {
        const logMessage = 'No healthy servers available';
        console.log(logMessage);
        logToFile(logMessage);
        res.status(503).send(logMessage);
    }
});

app.listen(3000, () => {
    console.log('Load balancer listening on port 3000');
    logToFile('Load balancer started on port 3000');
});
