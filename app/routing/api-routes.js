var friends = require("../data/friends.js");

var getFriends = friends.getFriends;
var compareFriends = friends.compareFriends;

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        getFriends(function(error, result) {
            if (error) {
                return res.json({
                    success: false
                })
            }
            res.json(result);
        })
    });

    app.post("/api/friends", function(req, res) {
        res.json(compareFriends(req.body));
    });
};