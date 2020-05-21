const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();

mongoose.connect("mongodb+srv://admin_:Chocolate@02@cluster0-1nzix.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => { console.log("DB connected") }).catch((err) => { console.log(err) });
const dataSchema = new mongoose.Schema({
    name:"String",
    team:"String"
})
var User = mongoose.model("User",dataSchema)
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('views'));

app.get('/', (req, res) => {
    User.find({},(err,data)=>{
        if(err){
            console.log("can't find data",err)
        }
        else{
            res.render("index.ejs",{user:data})
        }
    })
    
})

app.post('/test', (req, res) => {
    var newUser = new User({
        name:req.body.name,
        team:req.body.team
    }).save().then(savedData => console.log("data saved",savedData)).catch(err => console.log)
    res.redirect('/');
})

app.listen(8000, () => {
    console.log('Server started at 8000');
})
//first commit