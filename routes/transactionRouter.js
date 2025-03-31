const express = require('express');
const Transaction = require('../models/transaction');
const router = express.Router();

// Ajouter une transaction
router.post('/', async (req, res) => {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.json(transaction);
});

// Lire toutes les transactions
router.get('/', async (req, res) => {
    const transactions = await Transaction.find();
    res.json(transactions);
});

module.exports = router;
