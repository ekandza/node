// itemsRouter.js
const express = require('express');
const router = express.Router();


 



// Route pour la racine de l'URL
router.get('/', (req, res) => {
  res.send('Bienvenue sur la page d\'accueil');
});




module.exports = router;
