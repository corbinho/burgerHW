var orm = require('../config/orm.js');


var burger = {
    all: function (cb) {
        orm.all("burgers", function (res) {
            cb(res)
        })
    },
    create: function (vals, cb) {
        orm.create("burgers", "burger_name", vals, function (res) {
            cb(res);
        });
    },
    updateOne: function(id, cb) {
        console.log("running func from burger")
        orm.updateOne(id, function(res) {
          cb(res);
        });
    }

}

module.exports = burger;