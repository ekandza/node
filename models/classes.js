const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    libelleClasse: {
        type: String,
        required: true,
        trim: true,
    },
    professeur: {
        type: String,
        required: true,
        trim: true,
    },
    telProfesseur: {
        type: String, // No validation is applied here now.
        trim: true,   // Optional trimming if needed.
    },
    cycle: {
        type: String,
        enum: ['primaire', 'college'],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Export the model
module.exports = mongoose.model('Class', classSchema);
