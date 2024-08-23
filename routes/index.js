const express = require('express');
const router = express.Router();
const { register,login } = require("../controller/register.controller");

router.get('/', (req, res) => {
    res.send('Welcome to the Home Page!');
});

router.post('/register', register);
router.post('/login', login);

module.exports = router;
