const mongoose = require('mongoose');

const produitSchema = new mongoose.Schema({
    nom: String,
    prix: Number,
    stock: Number
});

module.exports = mongoose.model('Produit', produitSchema);
