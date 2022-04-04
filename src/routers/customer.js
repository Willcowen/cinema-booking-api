const express = require("express");
const {
    createCustomer
} = require('../controllers/customer');

const router = express.Router();

router.post("/", createCustomer);

module.exports = router;
