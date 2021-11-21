const router = require('express').Router();
let User= require('../Models/user.model');

router.route('/').get((req,res)=>{
    User.find()
    .then(users=> res.json(users))
    .catch(err=> res.status(400).json('Error: '+ err));
});

router.route('/add').post((req,res)=>{
const username = req.body.username;
const password = req.body.password;
const active = true;
const lastlogin = Date.now();


const newUser = new User({
    username:username,
    password: password
    ,active: active,
    lastlogin: lastlogin});
newUser.save()
.then(()=> res.json('user added!'))
.catch(err=> res.status(400).json('Error: '+err));
});

router.route('/:id').get((req,res)=>{
    const id = req.params.id;
User.findById(id)
.then(user => res.json(user))
.catch(err=>res.status(400).json('error: '+ err))
});

router.route('/:id').delete((req,res)=>{
    User.findByIdAndDelete(req.params.id)
    .then(() => res.json('user deleted'))
    .catch(err=>res.status(400).json('error: '+ err))
    });

    router.route('/update/:id').post((req,res)=>{
        User.findById(req.params.id)
        .then(user => {
            user.password = req.body.password;
            user.cars = req.body.cars;
            user.active = req.body.active;
            user.save()
            .then(()=>res.json('user updated'))
            .catch(err=> res.status(400).json('error:' + err));
        })
        .catch(err=>res.status(400).json('error: '+ err))
        });

module.exports = router;