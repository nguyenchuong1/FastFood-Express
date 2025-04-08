module.exports = app => {
    const cart = require("../controllers/cart.controller.js");
  
    var router = require("express").Router();
  
    // init cart
    router.post("/", cart.initOrRetrieveCart);

    // add p to cart
    router.post("/add", cart.addProductToCart);

    // update cart
    router.post("/update", cart.updateCartItem);

    // update cart
    router.get("/", cart.getCart);

    // delete cart
    router.delete("/:id", cart.deleteCartItem);

    app.use("/api/cart", router);
  };
  