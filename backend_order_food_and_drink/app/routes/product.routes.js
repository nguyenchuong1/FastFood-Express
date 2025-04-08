module.exports = app => {
    const product = require("../controllers/product.controller.js");
  
    var router = require("express").Router();

    // Recommender
    router.get("/recommender", product.recommender);
  
    // Create
    router.post("/", product.create);

    // Get list
    router.get("/", product.getList);

    // Get list by category
    router.get("/category/:id", product.getListByCategory);

    // Get by Id
    router.get("/:id", product.getProductById);

    // Update
    router.put('/:id', product.update);

    // Delete
    router.delete('/:id', product.delete);

    // search
    router.get("/search/:key", product.search);

    app.use("/api/product", router);
  };