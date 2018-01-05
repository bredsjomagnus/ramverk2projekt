var express = require('express');
var router = express.Router();
var navbarjson = require('../navbar.json');

/* GET home page. */
router.get('/', function(req, res) {
    console.log("req.session.player: " + req.session.player);
    res.render(
        'index',
        {
            title: 'Memoryapp index | maaa16',
            navlist: navbarjson,
            inloggad: req.session.player,
            thisurl: req.url
        });
});

/* GET about page. */
router.get('/about', function(req, res) {
    res.render(
        'about',
        {
            title: 'OM | maaa16',
            navlist: navbarjson,
            thisurl: req.url
        });
});

/* GET reports page. */
router.get('/reports', function(req, res) {
    res.render(
        'reports',
        {
            title: 'RAPPORTER | maaa16',
            navlist: navbarjson,
            thisurl: req.url,
        });
});

/* login screen */
router.get('/login', function(req, res) {
    var data, view;

    //---------------------------//

    view = "login";

    data = {
        title: 'Login | maaa16',
        navlist: navbarjson,
        thisurl: req.url,
    };

    //---------------------------//

    res.render(view, data);
});

/* login process */
router.post('/loginprocess', function(req) {
    req.session.players = "gurka";

    console.log("req.session.players: " + req.session.players[0]);
});

module.exports = router;
