const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.customer = require("./customer.model.js")(mongoose);
db.admin = require("./admin.model.js")(mongoose);
db.category = require("./category.model.js")(mongoose);
db.product = require("./product.model.js")(mongoose);
db.city = require("./city.model.js")(mongoose);
db.district = require("./district.model.js")(mongoose);
db.ward = require("./ward.model.js")(mongoose);
db.cart = require("./cart.model.js")(mongoose);
db.cartItem = require("./cart.item.model.js")(mongoose);
db.order = require("./order.model.js")(mongoose);
db.orderItem = require("./order.item.model.js")(mongoose);

module.exports = db;
