var path = require("path");

module.exports = function (app) {

    app.get("/survey", function (req, res) {
        res.sendFile(path.join(__dirname + "/../public/survey.html"));
    });

    app.get("/home", function (req, res) {
        res.sendFile(path.join(__dirname + "/../public/home.html"));
    });

    app.get("/results", function (req, res) {
        res.sendFile(path.join(__dirname + "/../public/results.html"));
    });

    app.use(function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/home.html'));
    });
};
