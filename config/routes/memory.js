var express = require('express');
var router = express.Router();
var memoryController = require('../../src/Memory/memoryController');

/* GET Memory index page. */
router.get('/startmemory', memoryController.startmemoryPage);

/* GET Memory start game page */
router.get('/lobby', memoryController.lobbyPage);

module.exports = router;
