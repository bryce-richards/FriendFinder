var express = require('express');

var app = express();
var PORT = process.env.PORT || 5555;

app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname, "survey.html"))
});

app.use("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"))
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});