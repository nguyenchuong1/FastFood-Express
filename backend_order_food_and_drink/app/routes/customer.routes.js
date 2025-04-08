module.exports = app => {
    const customer = require("../controllers/customer.controller.js");
  
    var router = require("express").Router();

    // update
    router.post("/", customer.updateCustomer);

    app.use("/api/customer", router);
  };
  