const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    produits: [{
        produitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Produit', required: true },
        quantite: { type: Number, required: true, min: 1 }
    }],
    total: { type: Number, required: true, min: 0 },
    date: { type: Date, default: Date.now }
});

const Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;
