var express = require('express'),
    index   = require('../controllers/index'),
    about   = require('../controllers/about'),
    shop    = require('../controllers/shop'),
    proposal= require('../controllers/proposal'),
    create  = require('../controllers/create'),
    read    = require('../controllers/read'),
    readall = require('../controllers/readall'),
    update  = require('../controllers/update'),
    del     = require('../controllers/del'),
    router  = express.Router();

router.route('/').get(index);
router.route('/about').get(about);
router.route('/shop').get(shop);
router.route('/proposal').get(proposal);
router.route('/person')
  .post(create)
  .get(readall);
router.route('/person/:id')
  .get(read)
  .put(update)
  .delete(del);

module.exports = router;
