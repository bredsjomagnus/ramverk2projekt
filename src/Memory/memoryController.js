var navbarjson = require('../../config/navbar.json');

// Memory landningssida
exports.startmemoryPage = function(req, res) {
    var data, view, gamerooms;

    //---------------------------

    if (req.session.player) {
        view = "memory/startmemory";


        data = {
            title: 'Memory | maaa16',
            navlist: navbarjson,
            username: req.session.player,
            inloggad: req.session.player,
            thisurl: "/memory",
        };

        //---------------------------

        res.render(view, data);
    } else {
        res.redirect("/users/login")
    }
};

// Memory starta spel sida
exports.lobbyPage = function(req, res) {
    var data, view;

    //---------------------------

    /*
    * Om spelare är inloggad når man lobbyn
    * annars dirigeras man till inloggnings-
    * sidan.
    */
    if (req.session.player) {
        view = "memory/lobby";

        data = {
            title: 'Memory | maaa16',
            navlist: navbarjson,
            thisurl: "/memory",
            nickname: req.session.player
        };
        res.render(view, data);
    } else {
        res.redirect("/users/login")
    }

    //---------------------------


};
