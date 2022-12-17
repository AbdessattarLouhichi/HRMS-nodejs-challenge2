const mongoose = require('mongoose');
const missionSchema = new mongoose.Schema({
    task: { type: String, required: true },
    description: { type: String, required: true },
    employNbr: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    team :[{type : mongoose.Schema.Types.ObjectId,ref:"Employee"}]
},
{
    timestamps :true , versionKey : false
    })

module.exports = mongoose.model('Mission',missionSchema);