const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
//const validationResult = require('express-validator');
const mydb = require('../models/conn')


let login =  async(req,res,next) =>{
    
    
    try{

        const row =  await mydb.query(
            `SELECT * FROM user WHERE email='${req.body.email}'`,(err, result, fields) => {

                if(result.length === 0){
                   
                    return res.status(422).json({
                            message: "Invalid email address",
                            
                    });

                }

                 bcrypt.compare(req.body.password, result[0]['password'], (error, resultPassword)=> {
                    if(error) throw error;
                    req.MatchPassword = resultPassword;

                        if(!resultPassword){
                            return res.json({
                                message: "Incorrect password",
                            });
                        }


                        const theToken = jwt.sign({id:result.id},'the-super-strong-secrect',{ expiresIn: '1h' });
                        
                        return res.json({
                            status : true,
                            token:theToken
                        });
            
                });    
                
            });
            
        }
    catch(err){
        next(err);
    }
}


let signUp = (req,res,next)=>{

    if( req.body.firstname &&
        req.body.lastname  &&
        req.body.password  &&
        req.body.email     &&
        req.body.contact
        ){
            let fname = req.body.firstname;
            let lname = req.body.lastname;
            let password = req.body.password;
            let email = req.body.email;
            let contact = req.body.contact;
            
            
            
            password = bcrypt.hash(password,10, function(err, hash) {
                
                mydb.query(`INSERT INTO user (fname, lname, password, email, contact) VALUES ('${fname}', '${lname}', '${hash}', '${email}', '${contact}')`, ( err,result)=>{
                    if(err) throw(err);
                    // req.insertObj = result;
                    if(result.affectedRows){
                        req.insertObj = {
                            status  : true,
                            message : 'User registered Successfully'
                          }
                          next();
                    }
                })
                
            });
        }else{
            req.insertObj = {
                status  : false,
                message : 'Some error occurred'
              };
              next();
        }

}

module.exports = {
    login,
    signUp
}