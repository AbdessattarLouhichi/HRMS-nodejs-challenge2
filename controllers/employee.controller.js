const Employee = require('../models/employee')

exports.addEmployee = async (req,res)=>{
    try {
        await Employee.create(req.body)
        .then((employee)=>{
        res.send(employee);
    })
    } catch (error) {
        res.status(500).send({message : 'Server Error'})
    }
}


// find employee by Id
exports.findEmployee = async (req, res)=>{
    try {
        const employee = await Employee.findById(req.params.id);
        res.send(employee);
    } catch (error) {
        res.status(500).send({message : 'Server Error'})
    }
    
   }


// list employees
exports.getEmployees =async(req, res)=>{
    try {
        const employees = await Employee.find({})
        res.send(employees);
    } catch (error) {
        res.status(500).send({message : 'Server Error'})
    }
    
  }


  // Update Employee
exports.updateEmployee = async(req,res)=>{
    try {
        await Employee.findByIdAndUpdate(req.params.id, req.body);
         Employee.findOne({_id : req.params.id}).then((employee)=>{
            res.send(employee);
              console.log('employee updated!');
         })
    }catch(err){
     res.send({message :'ERROR SERVER'})
    }   
}


//Delete mission
exports.deleteEmployee =  async(req,res)=>{
    try {
        await Employee.findByIdAndRemove(req.params.id).then(
            res.send({message : 'employee deleted!'})
        );
    } catch (error) {
        res.status(500).send({message : 'Server Error'})
    }
    
}