module.exports = app => {
    const category = require("../controllers/category.controller.js");
  
    var router = require("express").Router();
  
    // Create
    router.post("/", category.create);

    // Get list
    router.get("/", category.getList);

    // Get by Id
    router.get("/:id", category.getCategoryById);

    // Update
    router.put('/:id', category.update);

    // Delete
    router.delete('/:id', category.delete);

    app.use("/api/category", router);
  };
  