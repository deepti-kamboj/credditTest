let express = require('express');
let router = express.Router();
let {login, signUp} = require('../controller/login'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');  
let mydb = require("../models/conn");
let update= require('../controller/con-updateUser')



/* GET home page. */
router.get('/', function(req,res){
 res.render('index');
});


/** LOGIN API */
router.post('/login', login, (req, res, next) => {
  res.json({
    status : true,
    message : "user logged-in Successfully"
  })
  });
  
/** SIGN-UP API */
router.get('/signup',  function(req,res,next){
  res.render('create');
});

router.post('/user',signUp,function(req,res,next){
  res.json(req.insertObj);
});


/** UPDATE-USER API */
router.put('/updateUser', function(req,res){
  update.updateUser(req, res, (result)=>{
    res.json(result);
  });

});



module.exports = router;
