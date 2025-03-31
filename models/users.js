const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserManageSchema = new mongoose.Schema({
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Hash du mot de passe avant sauvegarde
UserManageSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Vérification du mot de passe
UserManageSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const UserManage = mongoose.model('UserManage', UserManageSchema);

module.exports = UserManage;
