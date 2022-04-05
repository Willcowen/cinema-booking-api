const express = require("express");
const {
    getMovies,
    addMovie,
    getMovie
} = require('../controllers/movies');

const router = express.Router();

router.get("/", getMovies);
router.get("/:id", getMovie)
router.post('/', addMovie)   

module.exports = router;