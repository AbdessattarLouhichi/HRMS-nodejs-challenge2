const Mission = require('../models/mission');
const Employee = require('../models/employee');
const handleEmail = require('../common/email');



// create mission
exports.createMission = async (req,res)=>{
    try {
        await Mission.create(req.body)
        .then((mission)=>{
        res.send(mission);
    })
    } catch (error) {
        res.status(500).send({message : 'Server Error'})
    }
}

// get mission by Id
exports.findMission = async (req, res)=>{
    try {
        const mission = await Mission.findById(req.params.id).populate('team');
         res.send(mission);
     
    } catch (error) {
        res.send({message :'ERROR SERVER'})
    }
   
   }


// list missions
exports.listMissions =async(req, res)=>{
    try {
        const missions = await Mission.find({})
        res.send(missions);
    } catch (error) {
        res.send({message :'ERROR SERVER'})
    }
  }
// update
exports.updatedMission =  async(req,res)=>{
    await Mission.findByIdAndUpdate(req.params.id, req.body);
    Mission.findOne({_id : req.params.id}).then((mission)=>{
        res.send(mission);
        console.log('mission updated!');
    })
}

//Delete mission
exports.deletMission =  async(req,res)=>{
    try {
        await Mission.findByIdAndDelete(req.params.id).then(
            res.send({message : 'mission deleted!'})
        );
    } catch (error) {
        res.send({message :'ERROR SERVER'})
    }
   
}

// push available Employee to team
exports.affectEmployee =  async(req,res)=>{
    try {
        let employee = await Employee.findById(req.params.idEmployee);
        let mission = await Mission.findById(req.params.idMission);
        if (mission.team.length >= mission.employNbr) {
            res.send({message : 'team is full'});
        } else if (employee.available ) {
           
            await  Mission.findByIdAndUpdate(req.params.idMission, {$push:{team : req.params.idEmployee}} );
            
            await Employee.findByIdAndUpdate(req.params.idEmployee, {available : false})
            await Mission.findById(req.params.idMission).populate('team').then( (updatedMission)=> {mission = updatedMission})

            await handleEmail(mission,employee)
            res.send(mission)
        }else{
                res.send({message : 'employee is in another mission'});
            } 
    }catch(err){
     res.send('ERROR SERVER')
    }   
}

// Remove employee from team
exports.desaffectEmployee =  async(req,res)=>{
    try {
        await Mission.findByIdAndUpdate(req.params.idMission,{$pull:{team: req.params.idEmployee}});
        await Employee.findByIdAndUpdate(req.params.idEmployee, {available : true})
        Mission.findOne({_id:req.params.idMission}).then((mission)=>{
            res.send(mission)
        })
        
    } catch (error) {
        res.send({message :'ERROR SERVER'})
    }
}