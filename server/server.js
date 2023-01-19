const express = require('express')
const mongoose = require('mongoose')
const body_parser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const web_path = __dirname.replace('server','web/')
const Time = new Date()
const min = Time.getMinutes()

const app = express()

app.use(body_parser.urlencoded({extended:true}))
app.use(express.static(web_path))
app.use(cors({
    origin:'*'
}))

mongoose.set('strictQuery',true)
mongoose.connect('mongodb://127.0.0.1:27017/jobs',(err)=>{
    if(!err){
        console.log('connected to Local DB')
    }
})

const job_schema = new mongoose.Schema({
    company : String,
    logo : String,
    _new : Boolean,
    featured : Boolean,
    position : String,
    role : String,
    level : String,
    postedAt : String,
    contract : String,
    location : String,
    languages : Object,
    tools : Object,
    date: String
})
const related_schema = new mongoose.Schema({
    tags : Object,
    langs : Object
})
const Job = mongoose.model('jobs',job_schema)
const Related = mongoose.model('related',related_schema)


app.get('/',(req,res)=>{
    res.send(web_path + '/index.html')
})

app.get('/jobs',(req,res)=>{
    Job.find({},{date:0},(err,job)=>{
        if(!err){
            res.send(job)
        }
    })
})

app.post('/addjob',(req,res)=>{
    if(req.body.languages)req.body.languages = req.body.languages.split(/,|\s/).filter(item => item != '')
    if(req.body.tools)req.body.tools = req.body.tools.split(/,|\s/).filter(item => item != '')
    req.body._new = true
    req.body.featured = true
    req.body.postedAt = 'now'
    req.body.date = Time
    
    const random_boolean = Math.floor(Math.random() * 10)
    if(random_boolean % 2 != 0)req.body.featured = false
    const new_job = new Job(req.body)
    console.log(new_job)
    
    new_job.save((err)=>{
        if(!err){
            console.log('NEW JOB ADDED')
            res.redirect('/')
        }
    })
})

app.listen(3000,()=>console.log('server started on port 3000'))