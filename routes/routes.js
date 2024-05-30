const express = require('express');
const router = express.Router();

const index = require('./index');
const boostrap = require('./boostrap');

const signin = require('./signin');
const navbar = require('./navbar');

router.use('/', index);
router.use('/boostrap', boostrap);
router.use('/signin', signin);
router.use('/navbar', navbar);
module.exports = router;