const express = require('express');
const Transaction = require('../models/transaction');
const router = express.Router();

// Ajouter une transaction
router.post('/', async (req, res) => {
    try {
        const { produits, total } = req.body;

        if (!produits || produits.length === 0 || total == null) {
            return res.status(400).json({ error: "Données invalides. Produits et total sont requis." });
        }

        const transaction = new Transaction({ produits, total });
        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'enregistrement de la transaction." });
    }
});

// Lire toutes les transactions
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des transactions." });
    }
});

// Récupérer les transactions par date
router.get('/date/:date', async (req, res) => {
    try {
        const date = new Date(req.params.date);
        if (isNaN(date.getTime())) {
            return res.status(400).json({ error: "Format de date invalide." });
        }

        const transactions = await Transaction.find({
            date: {
                $gte: new Date(date.setHours(0, 0, 0, 0)),
                $lt: new Date(date.setHours(23, 59, 59, 999))
            }
        });

        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des transactions par date." });
    }
});

module.exports = router;
