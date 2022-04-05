const express = require("express");
const {
    createCustomer,
    updateCustomer
} = require('../controllers/customer');

const router = express.Router();

router.post("/", createCustomer);
router.patch('/:id', updateCustomer)

module.exports = router;
