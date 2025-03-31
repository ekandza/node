const mongoose = require('mongoose');

const TransactionManageSchema = new mongoose.Schema({
    produits: [{ produitId: String, quantite: Number }],
    total: Number,
    date: { type: Date, default: Date.now }
});
const Transaction = mongoose.model('Transaction', TransactionManageSchema);
