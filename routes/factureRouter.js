 const express = require('express');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const Transaction = require('../models/transaction');

const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction non trouvée' });
        }

        const filename = `facture-${transaction._id}.pdf`;
        const filePath = path.join(__dirname, '../factures', filename);

        // Création du PDF
        const pdf = new PDFDocument();
        pdf.pipe(fs.createWriteStream(filePath));

        pdf.fontSize(20).text(`Facture - ID: ${transaction._id}`, { align: 'center' });
        pdf.moveDown();
        pdf.fontSize(14).text(`Date: ${transaction.date.toLocaleDateString()}`);
        pdf.fontSize(14).text(`Total: ${transaction.total.toFixed(2)} €`);
        pdf.moveDown();

        pdf.fontSize(16).text('Détails des produits:', { underline: true });
        pdf.moveDown();

        transaction.produits.forEach((p, index) => {
            pdf.fontSize(12).text(`• Produit ${index + 1}: ${p.produitId} - Quantité: ${p.quantite}`);
        });

        pdf.end();

        // Attendre la fin de l'écriture avant d'envoyer le fichier
        pdf.on('finish', () => {
            res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
            res.setHeader('Content-Type', 'application/pdf');
            res.download(filePath, filename, (err) => {
                if (!err) {
                    fs.unlinkSync(filePath); // Supprime le fichier après téléchargement
                }
            });
        });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la génération de la facture.' });
    }
});

module.exports = router;
