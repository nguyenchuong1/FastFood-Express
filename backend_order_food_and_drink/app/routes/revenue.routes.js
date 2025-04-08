module.exports = app => {
    const revenue = require("../controllers/revenue.controller.js");
  
    var router = require("express").Router();
  
    // date
    router.post("/calc", revenue.calcu);

    // export
    router.post("/exportCSV", revenue.exportCSV);

    app.use("/api/revenue", router);
  };
  