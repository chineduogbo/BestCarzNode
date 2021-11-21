const router = require('express').Router();
let carlog= require('../Models/carLog.model');

router.route('/').get((req,res)=>{
    carlog.find()
    .then(carlogs=> res.json(carlogs))
    .catch(err=> res.status(400).json('Error: '+ err));
});

router.route('/add').post((req,res)=>{
const username = req.body.username;
const carname = req.body.carname;
const issue = req.body.issue;
const privacy = JSON.parse(req.body.privacy);
const mechanicused = req.body.mechanicused;


const newcarlog = new carlog({
    username:username
    ,carname: carname,issue: issue,privacy: privacy,mechanicused: mechanicused});
    newcarlog.save()
.then(()=> res.json('carlog added!'))
.catch(err=> res.status(400).json('Error: '+err));
});

router.route('/:id').get((req,res)=>{
    const id = req.params.id;
    carlog.findById(id)
.then(carlogs => res.json(carlogs))
.catch(err=>res.status(400).json('error: '+ err))
});

router.route('/:id').delete((req,res)=>{
    carlog.findByIdAndDelete(req.params.id)
    .then(() => res.json('carlog deleted'))
    .catch(err=>res.status(400).json('error: '+ err))
    });

    router.route('/update/:id').post((req,res)=>{
        carlog.findById(req.params.id)
        .then(carlogedit => {
            carlogedit.carname = req.body.carname;
            carlogedit.issue = req.body.issue;
            carlogedit.privacy = JSON.parse(req.body.privacy);
            carlogedit.mechanicused = req.body.mechanicused;
            carlogedit.save()
            .then(()=>res.json('UserJob updated'))
            .catch(err=> res.status(400).json('error:' + err));
        })
        .catch(err=>res.status(400).json('error: '+ err))
        });


module.exports = router;