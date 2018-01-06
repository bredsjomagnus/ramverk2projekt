var navbarjson = require('../../config/navbar.json');

/*--------------------------------------------------
    Database
--------------------------------------------------*/
const database = require("../Mongo/database");
var ObjectId = require('mongodb').ObjectId;
const dsn = process.env.DBWEBB_DSN || "mongodb://magnus:vb8gGtlQT3@ds129156.mlab.com:29156/maaa16";

/*--------------------------------------------------
    Password hash
--------------------------------------------------*/
var passwordHash = require('password-hash');

// Login screen
exports.loginPage = async (req, res) => {
    var data, view;

    //---------------------------//

    view = "users/login";

    //---------------------------//
    if (req.method == "POST") {
        // console.log(req.body.createuserbtn); // "Skapa konto"
        if (req.body.createuserbtn) {
            // console.log("skapa ny användare");
            res.redirect("/users/newuser");
        }

        if (req.body.loginbtn) {
            // find in databas user with req.body.username
            // match that user with req.body.password
            let hashedPassword = null;

            try {
                let result = await database.findInCollection(dsn, "players", {"username": req.body.username}, {}, 0);
                // console.log("result[0].password: " + result[0].password);

                if (result.length > 0) {
                    hashedPassword = result[0].password;
                }

                // let userpass = result[0].password;

                console.log();
                console.log("loginProcess:");
                // console.log("result.username: " + result[0].username);
                // console.log("result.password: " + result[0].password);
                console.log("req.body.password: " + req.body.password);

                if (hashedPassword != null) {
                    if (passwordHash.verify(req.body.password, hashedPassword)) {
                        // Lyckad inloggning.
                        // Lägger till användare till session
                        // console.log("VÄLKOMMEN " + result[0].username);
                        // console.log("req.session.player (före): " + req.session.player);
                        req.session.player = result[0].username;
                        // console.log("req.session.player (efter): " + req.session.player);
                        res.redirect("/memory/startmemory");
                    } else {
                        res.redirect("/users/login");
                    }
                } else {
                    res.redirect("/users/login");
                }
                // res.json(res);
            } catch (err) {
                console.log(err);
                // res.json(err);
            }
        }
    } else {
        // req.session.players = "gurka";
        data = {
            title: 'Login | maaa16',
            navlist: navbarjson,
            inloggad: req.session.player,
            thisurl: "/users/login",
        };

        //---------------------------//

        res.render(view, data);
    }
};

exports.loginProcess = async (req, res) => {
    if (req.body.loginbtn) {
        // find in databas user with req.body.username
        // match that user with req.body.password
        try {
            let result = await database.findInCollection(dsn, "players", {"username": req.body.username}, {}, 0);
            let hashedPassword = result.password;
            // let userpass = result[0].password;

            console.log();
            console.log("loginProcess");

            if (passwordHash.verify(req.body.password, hashedPassword)) {
                console.log("VÄLKOMMEN " + result.username);
            } else {
                console.log("Felaktigt inlogg");
                res.redirect("/users/login");
            }

            // res.json(res);
        } catch (err) {
            console.log(err);
            // res.json(err);
        }
        res.redirect("/users/login");
    }
};

// New user
exports.newUserPage = async function(req, res) {
    var data, view, errormsg;

    //---------------------------//

    view = "users/newuser";

    //---------------------------//

    errormsg = (req.query.errormsg) ? req.query.errormsg : "";

    data = {
        title: 'Nytt konto | maaa16',
        navlist: navbarjson,
        inloggad: req.session.player,
        thisurl: "/users/newuser",
        errormsg: errormsg
    };

    //---------------------------//

    res.render(view, data);
};
exports.newUserProcessPage = async function(req, res) {
    var doc;

    console.log();
    console.log("userController -> newUserProcessPage - kommer hit");
    console.log("dsn: " + dsn);
    console.log();
    /*-------------------------------
    När användaren trycker skapa konto
    fångas username och password upp.
    Password hashas.

    Värdena sparas i collection 'players'.
    -------------------------------*/
    if (req.body.createuserbtn) {
        try {
            let usernamecontrol = await database.findInCollection(dsn, "players", {"username": req.body.username}, {}, 0);
            if (usernamecontrol.length === 0) {
                doc =  {
                    "username": req.body.username,
                    "password": passwordHash.generate(req.body.password),
                };
                await database.insertToCollection(dsn, "players", doc);
                res.redirect("/users/login");
            } else {
                res.redirect("/users/newuser?errormsg=Användarnamnet upptaget");
            }

        } catch (err) {
            console.log(err);
            res.redirect("/users/newuser");
        }
    }
};

exports.viewPlayersPage = async (req, res) => {
    var view, data;

    view  = "users/players";

    console.log();
    console.log("userController -> viewPlayersPage - kommer hit");
    console.log("dsn: " + dsn);
    console.log();

    try {
        let result = await database.findInCollection(dsn, "players", {}, {}, 0);

        // console.log(result[0].firstname);

        data = {
            title: 'Players | maaa16',
            navlist: navbarjson,
            thisurl: "/players",
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

exports.deleteProcess = async (req, res) => {
    try {
        var id, oid, filter;

        id = req.params.id;
        oid = new ObjectId(String(id));

        filter = {
            "_id": oid
        };
        // console.log("update: " + JSON.stringify(update));
        await database.deleteOneFromCollection(dsn, "players", filter);
        res.redirect("/users/players");
    } catch (err) {
        console.log(err);
    }
};

exports.logoutProcess = (req, res) => {
    req.session.destroy();
    res.redirect("/users/login");
};
