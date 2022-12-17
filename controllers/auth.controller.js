const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Register user
exports.register = async (req,res)=>{
    try {
        const {email,password} = req.body
           
        // Check if email is used 
        const adminExist = await Admin.findOne({email : email})
       
        if (adminExist){
            res.status(400).json({message : 'Email is already  used'})
        }

        // crypt password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;

        // save admin 
        const newAdmin = await Admin.create(req.body);
        res.status(201).json(newAdmin)

    } catch (error) {
        res.status(500).json({message : error.message})
    }
    
}

// login admin
exports.login = async (req,res)=>{
    try {
       const {email, password} = req.body;

       // find admin
        const admin = await Admin.findOne({email : email})
       
        if(!admin){
           return res.status(400).json({message : "admin does not exist"})
        }

        const passMatch = await bcrypt.compare(password, admin.password);
        if(!passMatch){return res.status(400).json({message : "check your email or your password!"})};
        // create token
       
        const data={
            adminId : admin._id,
            adminEmail:admin.email
        }
        const token = jwt.sign(data,process.env.SECRET_KEY, {expiresIn : '1h'});


        return res.status(200).json({admin : admin, token : token});

    } catch (error) {
        res.status(500).json({message :error.message})
    }
}

