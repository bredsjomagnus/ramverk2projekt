var express = require('express');
var router = express.Router();
var playgroundController = require('../../src/Playground/playgroundController');

/* GET playground index page. */
router.get('/', playgroundController.indexPage);

router.get('/test/:testparameter', playgroundController.testPage);

// Testar POST
router.get('/posttest', playgroundController.postTestPage);

router.post('/posttest', playgroundController.postTestPage);

module.exports = router;
