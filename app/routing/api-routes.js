var friends = require("../data/friends.js");

var getFriends = friends.getFriends;
var compareFriends = friends.compareFriends;

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        return getFriends()
        .then(function(results) {
            return res.json({
                friends: results
            });
        })
        .catch(function(error) {
            return res.json({
                error: "API Error: " + error
            });
        });
    });

    app.post("/api/friends", function(req, res) {
        return compareFriends(req.body)
        .then(function(results) {
            return res.json({
                success: results
            })
        })
        .catch(function(error) {
            return res.json({
                error: "API Error: " + error
            });
        });
    });
};