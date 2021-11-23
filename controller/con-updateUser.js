
const mydb = require('../models/conn');


let updateUser = async(req,res,cb) => {

    if( req.body.firstname &&
        req.body.lastname  &&
        req.body.email     &&
        req.body.contact   &&
        req.body.id
        ){
    let id = req.body.id;
    let fname = req.body.firstname;
    let lname = req.body.lastname;
    let email = req.body.email;
    let contact = req.body.contact;
    

                mydb.query(`UPDATE user set fname='${fname}', lname='${lname}', email='${email}', contact='${contact}' WHERE id='${id}'`, (err, response) => {


                    if(err) throw err;
                    console.log("====UPDATE response=====", response);
                    if(response.affectedRows && (response.changedRows==1)){
                        cb({
                            status : "success",
                            message : "Data Updated Successfully"
                        });
                    }else{
                        cb({    status  : false,
                                message : 'Some error occurred'
                        })

                    }

                })
            }else{

                cb({    status  : false,
                        message : 'Some error occurred'
                    })
            }
}
module.exports = {
    updateUser,

};