const express = require('express');
const router = express.Router();
const {
  createShortUrl,
  getLongUrl,
} = require('../controllers/links.controller');

router.post('/', createShortUrl);
router.get('/:shortUrl', getLongUrl);

module.exports = router;
