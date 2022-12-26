const { authJwt } = require("../middlewares");
const authController = require("../controllers/auth.controller");
const walletController = require("../controllers/wallet.controller");

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
    app.get("/api/getDepositWallet", [authJwt.verifyToken], walletController.getDepositWallet);
    app.get("/api/getUserTransactions", [authJwt.verifyToken], walletController.getUserTransactions);
    app.get("/api/getUserAutoSchedule", [authJwt.verifyToken], walletController.getUserAutoSchedule);
    app.post("/api/setAutoSchedule", [authJwt.verifyToken], walletController.setAutoSchedule);
    app.get("/api/removeAutoSchedule", [authJwt.verifyToken], walletController.removeAutoSchedule);
    app.post("/api/auth/signin", authController.signin);
    app.post("/api/auth/signup", authController.signUp);
};