module.exports = app => {
    const login = require("../controllers/login.controller.js");
    const authMiddleware = require('../controllers/auth.middlewares.js');
  
    var router = require("express").Router();
  
    // Login
    router.post("/login", login.login);

    // Get profile
    router.get("/", authMiddleware.isAuth);

    // Register
    router.post("/register", login.register);

    // Refresh token
    router.post("/refresh-token", login.refreshToken);

    // Register Admin
    router.post("/admin/register", login.createAdmin);

    app.use("/api/auth", router);
  };
  