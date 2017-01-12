var path = require("path");
var favicon = require("serve-favicon");

module.exports = function (app) {

    app.get("/survey", function (req, res) {
        res.sendFile(path.join(__dirname + "/../public/survey.html"));
    });

    app.use(favicon(path.join(__dirname,"/../../handshake.png")));

    app.use(function (req, res) {
        res.sendFile(path.join(__dirname + "/../public/home.html"));
    });
};
