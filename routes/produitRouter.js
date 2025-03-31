const express = require('express');
const Produit = require('../models/produit');
const router = express.Router();

// Ajouter un produit
router.post('add/', async (req, res) => {
    const produit = new Produit(req.body);
    await produit.save();
    res.json(produit);
});

// Lire tous les produits
router.get('/', async (req, res) => {
    const produits = await Produit.find();
    res.json(produits);
});

// Modifier un produit
router.put('edit/:id', async (req, res) => {
    const produit = await Produit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(produit);
});

// Supprimer un produit
router.delete('delete/:id', async (req, res) => {
    await Produit.findByIdAndDelete(req.params.id);
    res.json({ message: 'Produit supprimé' });
});

module.exports = router;
