module.exports = app => {
    const order = require("../controllers/order.controller.js");
  
    var router = require("express").Router();
  
    // create cash order
    router.post("/", order.createCashOrder);

    // get list order
    router.get("/", order.getListOrder);

    // get order
    router.get("/:orderId", order.getOrder);

    // update status order
    router.post("/status", order.updateStatusOrder);

    // update status payment
    router.post("/status/payment", order.updateIsPayment);

    app.use("/api/order", router);
  };
  