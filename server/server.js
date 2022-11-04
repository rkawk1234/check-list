const express = require('express');
const mongoose = require ('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/checklist", {
    useNewUrlParser: true,
    useUnifiedTopology: true

})
    .then(()=> console.log("Connected to DB"))
    .catch(console.error);

const Checklist = require('./models/Checklist');

app.get('/checklists', async (req,res)=>{
    const checklists = await Checklist.find();
    res.json(checklists);
});

app.post('/checklist/new', (req,res)=> {
    const checklist = new Checklist({
        text: req.body.text

    });
    checklist.save();

    res.json(checklist);
});

app.delete('/checklist/delete/:id', async (req,res) => {
    const result = await Checklist.findByIdAndDelete(req.params.id);

    res.json(result);
})

app.put('/checklist/complete/:id', async(req,res)=>{
    const checklist = await Checklist.findById(req.params.id);
    checklist.complete = !checklist.complete;
    checklist.save();
    res.json(checklist);
})

app.listen(3001, ()=> console.log("Server started on port 3001"));


