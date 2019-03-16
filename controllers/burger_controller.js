var express = require('express');
var router = express.Router();
var burger = require("../models/burger.js")



router.get("/", function (req, res) {
    burger.all(function (data) {
        var hbsObject = {
            burgers: data
        };

        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function (req, res) {
    burger.create(req.body.burger, function () {
        // Send back the ID of the new quote
        res.redirect("/")
    });

});

router.post("/api/burgers/:id", function (req, res) {
    var id = req.params.id;
    console.log(id);
    burger.updateOne(id, function () {
        res.redirect("/");
    });
})

module.exports = router;