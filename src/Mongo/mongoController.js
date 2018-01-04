var navbarjson = require('../../config/navbar.json');
const database = require("./database");
var ObjectId = require('mongodb').ObjectId;
const dsnmlab = process.env.DBWEBB_DSN ||
                "mongodb://magnus:vb8gGtlQT3@ds129156.mlab.com:29156/maaa16";

// Mongo CRUDs startsida
exports.indexPage = async (req, res) => {
    var data, view, doc;

    //---------------------------

    view = "mongo/index";

    if (req.method == "POST") {
        // ta emot fältens värden och lägg in i databasen med await
        try {
            doc =  {
                "firstname": req.body.firstname,
                "surname": req.body.surname,
                "occupation": req.body.occupation
            };
            await database.insertToCollection(dsnmlab, "users", doc);
        } catch (err) {
            console.log(err);
        }
    }

    try {
        let result = await database.findInCollection(dsnmlab, "users", {}, {}, 0);

        console.log(result[0].firstname);

        data = {
            title: 'CRUD index | maaa16',
            navlist: navbarjson,
            thisurl: "/mongocrud",
            result: result
        };

        //---------------------------

        res.render(view, data);

        // res.json(res);
    } catch (err) {
        console.log(err);
        // res.json(err);
    }
};

// Mongo CRUDs insert
exports.editProcess = async function(req, res) {
    try {
        var id, value, oid, field, query, update;

        id = req.body.id;
        value = req.body.newvalue;
        field = req.body.field;

        oid = new ObjectId(String(id));

        // console.log("EDITPROCESS");
        // console.log("id: " + id);
        // console.log("value: " + value);
        // console.log("field: " + field);
        // console.log("oid: " + oid);
        query = {
            "_id": oid
        };
        update = {
            [field]: value
        };
        // console.log("update: " + JSON.stringify(update));
        await database.updateSpecField(dsnmlab, "users", query, update);
        res.redirect("/mongocrud/index");
    } catch (err) {
        console.log(err);
    }
};


exports.deleteProcess = async function(req, res) {
    try {
        var id, oid, filter;

        id = req.params.id;
        oid = new ObjectId(String(id));

        // console.log("EDITPROCESS");
        // console.log("id: " + id);
        // console.log("value: " + value);
        // console.log("field: " + field);
        // console.log("oid: " + oid);
        filter = {
            "_id": oid
        };
        // console.log("update: " + JSON.stringify(update));
        await database.deleteOneFromCollection(dsnmlab, "users", filter);
        res.redirect("/mongocrud/index");
    } catch (err) {
        console.log(err);
    }
};
