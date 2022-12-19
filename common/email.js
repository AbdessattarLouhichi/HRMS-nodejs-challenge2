const nodemailer = require('nodemailer');


module.exports = function handleEmail (mission,employee){  
  
          let transporter = nodemailer.createTransport({
              service: "gmail",
              port: 465,
              secure: false, // true for 465, false for other ports
              auth: {
                user: process.env.EMAIL, // generated ethereal user
                pass: process.env.PASSWORD, // generated ethereal password
              },
            });
  
        
          //mail options
              let mailOptions = {
                from: process.env.EMAIL,
                to: employee.email,
                subject: "Project notification",
                text:`Hello Mr ${employee.firstName},\n You are assigned to project : ${mission.task} 
                        \nThe team :${mission.team.map(member =>member.firstName)}.
                        \n Regards.`
              }
  
  
            //send mail with defined transport object
            let info =  transporter.sendMail(mailOptions, (err,info)=> {
              if (err) {
                console.log(err)
              } else {
                console.log('Mail sent to ',  info.envelope.to)
              }
            })     
} 
 
  