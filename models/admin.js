const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    category: { type: String, required: true },
    departement: { type: String, required: true }
},
{
    timestamps :true , versionKey : false
       }
)


module.exports = mongoose.model('Admin',adminSchema);