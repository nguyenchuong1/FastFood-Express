module.exports = app => {
    const payment = require("../controllers/payment.controller.js");
  
    var router = require("express").Router();
  
    // Create
    router.post("/", payment.createPaymentUrl);

    // return
    router.get("/vnpay_return", payment.vnpayReturn);

    app.use("/api/payment", router);
  };
  