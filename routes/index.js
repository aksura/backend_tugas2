const express = require('express');
const router = express.Router();
const { register, login } = require("../controller/register.controller");
const jwt = require('jsonwebtoken');
const UnauthenticatedError = require("../errors/UnauthenticatedError");
const Movie = require('../models/Movie'); 

router.get('/', (req, res) => {
    res.send('Welcome to the Home Page!');
});


router.post('/register', register);
router.post('/login', login);

const authenticateToken = (req, res, next) => {
    const token = req.headers['accesstoken'];
    if (!token) {
        throw new UnauthenticatedError("Please login first");
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            throw new UnauthenticatedError("Please login first");
        }
        req.user = decoded;
        next();
    });
};

//router.use(authenticateToken);
router.get('/movies', async (req, res) => {
    try {
      const movies = await Movie.findAll();
      res.json(movies);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching movies' });
    }
  });


module.exports = router;
