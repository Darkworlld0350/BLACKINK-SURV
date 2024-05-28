const express = require('express');
const router = express.Router();

const index = require('./index');
const boostrap = require('./boostrap');

const signin = require('./signin');
const signup = require('./signup');

router.use('/', index);
router.use('/boostrap', boostrap);
router.use('/signin', signin);
router.use('/signup', signup);
module.exports = router;