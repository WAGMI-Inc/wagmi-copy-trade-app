const { authJwt } = require("../middlewares");
const tokenController = require("../controllers/token.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/getAllTokens", [authJwt.verifyToken], tokenController.getAllTokens);
    app.post("/api/getTokenById", [authJwt.verifyToken], tokenController.getTokenById);
};