const express = require('express');
const classRouter = express.Router();
const Classes = require('../models/classes'); // Assurez-vous que le modèle est correctement défini

// CREATE: Ajouter une nouvelle classe
classRouter.post('/', async (req, res) => {
    const { libelleClasse, professeur, telProfesseur, cycle } = req.body;

    // Validation des champs requis
    if (!libelleClasse || !professeur || !cycle) {
        return res.status(400).json({ message: 'libelleClasse, professeur, and cycle are required' });
    }

    // Validation du champ cycle
    if (!['primaire', 'college'].includes(cycle)) {
        return res.status(400).json({ message: 'Cycle must be either "primaire" or "college"' });
    }

    try {
        const newClass = new Classes({
            libelleClasse,
            professeur,
            telProfesseur: telProfesseur || null,
            cycle,
        });

        const savedClass = await newClass.save();
        res.status(201).json({ message: 'Class created successfully', class: savedClass });
    } catch (err) {
        res.status(500).json({ message: 'Error creating class', error: err.message });
    }
});

// READ: Obtenir toutes les classes
classRouter.get('/', async (req, res) => {
    try {
        const allClasses = await Classes.find();
        res.status(200).json(allClasses);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching classes', error: err.message });
    }
});

// READ: Obtenir une classe par ID
classRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const foundClass = await Classes.findById(id);

        if (!foundClass) {
            return res.status(404).json({ message: 'Class not found' });
        }

        res.status(200).json(foundClass);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching class', error: err.message });
    }
});

// UPDATE: Mettre à jour une classe par ID
classRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { libelleClasse, professeur, telProfesseur, cycle } = req.body;

    // Validation des champs
    if (!libelleClasse || !professeur || !cycle) {
        return res.status(400).json({ message: 'libelleClasse, professeur, and cycle are required' });
    }

    if (!['primaire', 'college'].includes(cycle)) {
        return res.status(400).json({ message: 'Cycle must be either "primaire" or "college"' });
    }

    try {
        const updatedClass = await Classes.findByIdAndUpdate(
            id,
            { libelleClasse, professeur, telProfesseur: telProfesseur || null, cycle },
            { new: true }
        );

        if (!updatedClass) {
            return res.status(404).json({ message: 'Class not found' });
        }

        res.status(200).json({ message: 'Class updated successfully', class: updatedClass });
    } catch (err) {
        res.status(500).json({ message: 'Error updating class', error: err.message });
    }
});

// DELETE: Supprimer une classe par ID
classRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedClass = await Classes.findByIdAndDelete(id);

        if (!deletedClass) {
            return res.status(404).json({ message: 'Class not found' });
        }

        res.status(200).json({ message: 'Class deleted successfully', class: deletedClass });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting class', error: err.message });
    }
});

module.exports = classRouter;
