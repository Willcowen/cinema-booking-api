const express = require("express");
const {
    getMovies,
    addMovie
} = require('../controllers/movies');

const router = express.Router();

router.get("/", getMovies);
router.post('/', addMovie)   

module.exports = router;