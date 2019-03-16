var connection = require("./connection");


function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }

    return arr.toString();
}

var orm = {
    all: function (tableInput, cb) {
        console.log("trying to call the server");
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result)

        });
    },
    create: function (tableInput, cols, values, cb) {
        var queryString = "INSERT INTO " + tableInput;
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (?";
        queryString += ") ";
        connection.query(queryString, values, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result)
        })
    },
    updateOne: function (condition, cb) {
        //build query 
        console.log("running update function")
        var queryString = 'UPDATE burgers'
        queryString += ' SET devoured = ';
        queryString += '1';
        queryString += ' WHERE id = ';
        queryString += condition;

        console.log(queryString);

        //connect and run query
        connection.query(queryString, function (err, result) {
            if (err) throw err;
            cb(result);
        });
    }
}

module.exports = orm