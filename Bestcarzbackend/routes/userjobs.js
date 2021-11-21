const router = require('express').Router();
let UserJob= require('../Models/userjob.model');

router.route('/').get((req,res)=>{
    UserJob.find()
    .then(userjobs=> res.json(userjobs))
    .catch(err=> res.status(400).json('Error: '+ err));
});

router.route('/add').post((req,res)=>{
const username = req.body.username;
const location = req.body.location;
const businessname = req.body.businessname;
const specialty = req.body.specialty;


const newUserjob = new UserJob({
   username: username
    ,location: location,businessname: businessname,
    specialty: specialty});
    newUserjob.save()
.then(()=> res.json('user jobs added!'))
.catch(err=> res.status(400).json('Error: '+err));
});

router.route('/:id').get((req,res)=>{
    const id = req.params.id;
    UserJob.findById(id)
.then(userj => res.json(userj))
.catch(err=>res.status(400).json('error: '+ err))
});

router.route('/:id').delete((req,res)=>{
    UserJob.findByIdAndDelete(req.params.id)
    .then(() => res.json('UserJob deleted'))
    .catch(err=>res.status(400).json('error: '+ err))
    });

    router.route('/update/:id').post((req,res)=>{
        UserJob.findById(req.params.id)
        .then(userj => {
            userj.location = req.body.location;
            userj.businessname = req.body.businessname;
            userj.specialty = req.body.specialty;
            userj.save()
            .then(()=>res.json('UserJob updated'))
            .catch(err=> res.status(400).json('error:' + err));
        })
        .catch(err=>res.status(400).json('error: '+ err))
        });


module.exports = router;