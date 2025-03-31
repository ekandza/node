// itemsRouter.js
const express = require('express');
const router = express.Router();
const Item = require('../models/items');

// Route to create an item
router.post('/', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).send(newItem);
  } catch (error) {
    res.status(400).send(error);
  }
});



// Route pour récupérer tous les articles

router.get('/articles', async (req, res) => {
  try {
    // Récupération de tous les articles depuis la base de données
    const articles = await Item.find();
    // Envoi de la réponse avec les articles récupérés
    res.status(200).json(articles);
    console.log(articles);
  } catch (error) {
    // Envoi d'une réponse d'erreur si une erreur se produit
    console.error("Une erreur s'est produite lors de la récupération des articles :", error);
    res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des articles." });
  }
});


// Route pour supprimer un article
router.delete('/articles/:id', async (req, res) => {
  try {
    const articleId = req.params.id;
    const deletedArticle = await Item.findByIdAndDelete(articleId);
    if (!deletedArticle) {
      return res.status(404).json({ error: "L'article spécifié n'existe pas." });
    }
    res.status(200).json({ message: "L'article a été supprimé avec succès." });
  } catch (error) {
    console.error("Une erreur s'est produite lors de la suppression de l'article :", error);
    res.status(500).json({ error: "Une erreur s'est produite lors de la suppression de l'article." });
  }
});





// Route to get a single article by ID
router.get('/articles/:id', async (req, res) => {
  try {
    const articleId = req.params.id;
    const article = await Item.findById(articleId);
    if (!article) {
      return res.status(404).json({ error: "L'article spécifié n'existe pas." });
    }
    res.status(200).json(article);
  } catch (error) {
    console.error("Une erreur s'est produite lors de la récupération de l'article :", error);
    res.status(500).json({ error: "Une erreur s'est produite lors de la récupération de l'article." });
  }
});



// Route pour mettre à jour un article
router.put('/articles/:id', async (req, res) => {
  try {
    const articleId = req.params.id;
    const updatedArticle = await Item.findByIdAndUpdate(articleId, req.body, { new: true });
    if (!updatedArticle) {
      return res.status(404).json({ error: "L'article spécifié n'existe pas." });
    }
    res.status(200).json(updatedArticle);
  } catch (error) {
    console.error("Une erreur s'est produite lors de la mise à jour de l'article :", error);
    res.status(500).json({ error: "Une erreur s'est produite lors de la mise à jour de l'article." });
  }
});






// Route pour la racine de l'URL
router.get('/', (req, res) => {
  res.send('Bienvenue sur la page d\'accueil');
});




module.exports = router;
