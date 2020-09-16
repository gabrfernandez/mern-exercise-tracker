//requiring mongoose and model
const router=require('express').Router();
let User=require('../models/user.model');

//first route, get request
router.route('/').get((req,res)=>{
    //find is mongoose method which return a promise
    User.find()
        //get the users and return them in json format
        .then(users=>res.json(users))
        .catch(err=>res.status(400).json('Error: '+ err));
});

//post request
router.route('/add').post((req,res)=>{
    const username=req.body.username;
    const newUser= new User({username});

    newUser.save()
        .then(()=>res.json('User added!'))
        .catch(err=>res.status(400).json('Error: '+err));
});
//exporting the router
module.exports=router; 