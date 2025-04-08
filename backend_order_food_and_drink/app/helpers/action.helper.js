const db = require("../models");
const Customer = db.customer;
const Admin = db.admin;

exports.updateSocket = async (userId, socketId) => {
    try {
        const customer = await Customer.findById(userId);
        customer.socket_id = socketId;
        await customer.save();
    } catch (error) {
        console.log(error);
    }
};

exports.updateAdminSocket = async (userId, socketId) => {
    try {
        const admin = await Admin.findById(userId);
        admin.socket_id = socketId;
        await admin.save();
    } catch (error) {
        console.log(error);
    }
};
