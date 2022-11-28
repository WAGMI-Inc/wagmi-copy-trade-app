const { verifyAddAuth, authJwt } = require("../middlewares");
const authController = require("../controllers/auth.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/auth/getAllUsers", [authJwt.verifyToken], authController.getAllUsers);
    app.post("/api/auth/editUser", [authJwt.verifyToken], authController.editUser);
    app.post("/api/auth/deleteUser", [authJwt.verifyToken], authController.deleteUser);
    app.post("/api/auth/signin", authController.signin);
    app.post("/api/auth/signup", authController.signUp);
};