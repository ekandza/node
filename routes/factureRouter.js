const express = require('express');
const pdfkit = require('pdfkit');
const fs = require('fs');
const Transaction = require('../models/transaction');

const router = express.Router();

router.get('/:id', async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).send('Transaction non trouvée');

    const pdf = new pdfkit();
    const filename = `facture-${transaction._id}.pdf`;
    pdf.pipe(fs.createWriteStream(filename));
    pdf.text(`Facture - ID: ${transaction._id}`);
    pdf.text(`Total: ${transaction.total}€`);
    pdf.end();
    
    res.download(filename);
});

module.exports = router;
