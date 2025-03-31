const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserManage = require('../models/users'); 

const router = express.Router();

// Création d'un compte
router.post('/register', async (req, res) => {
    const { login, password } = req.body;
    const user = new UserManage({ login, password });
    await user.save();
    res.json({ message: 'Utilisateur créé' });
});

// Connexion
router.post('/login', async (req, res) => {
    const { login, password } = req.body;
    const user = await UserManage.findOne({ login });
    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Identifiants invalides' });
    }
    const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' });
    res.json({ token });
});

// Liste des utilisateurs
router.get('/', async (req, res) => {
    const users = await UserManage.find();
    res.json(users);
});

// Mettre à jour un utilisateur
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { login, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe
        const user = await UserManage.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        // Mettre à jour les champs
        if (login) user.login = login;
        if (password) user.password = await bcrypt.hash(password, 10); // Hasher le nouveau mot de passe

        await user.save();
        res.json({ message: 'Utilisateur mis à jour avec succès.' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur.', error: err.message });
    }
});

// Supprimer un utilisateur
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Vérifier si l'utilisateur existe
        const user = await UserManage.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        await UserManage.findByIdAndDelete(id);
        res.json({ message: 'Utilisateur supprimé avec succès.' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur.', error: err.message });
    }
});

module.exports = router;
