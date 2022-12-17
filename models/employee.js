const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    category: { type: String, required: true },
    skills: { type: String, required: true },
    cnss: { type: Number, required: true },
    age: { type: Number, required: true },
    available: { type: Boolean, required: true },
    
},
{
    timestamps :true , versionKey : false
       }
)


module.exports = mongoose.model('Employee',employeeSchema);