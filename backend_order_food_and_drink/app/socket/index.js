const express = require("express");
const app = express();
const http = require("http");
const actionHelper = require("../helpers/action.helper.js");

// Socket
const server = http.createServer(app);

const socketIo = require("socket.io")(server, {
    cors: {
        origin: "*",
    }
});

socketIo.on("connection", (socket) => {
    console.log("New client connected " + socket.id);
    socket.on('userConnect', (userId) => {
        actionHelper.updateSocket(userId, socket.id);
    });
    socket.on('adminConnect', (userId) => {
        actionHelper.updateAdminSocket(userId, socket.id);
    });
});

// run socket
server.listen(3000, () => {
    console.log('Socket đang chay tren cong 3000');
});

const listSocket = {};

listSocket.updateOrder = require("./process.order.js")(socketIo);

module.exports = listSocket;
