const Clarifai =require('clarifai');

const app = new Clarifai.App({
    apiKey: '5d7adf2b2682472c8feb0dfa9b1b41ee'
   }); 

const handleAPIcall=(req,res)=>{
    app.models
    .predict("a403429f2ddf4b49b307e318f00e528b",req.body.input)
    .then(data=>{res.json(data)})
    .catch(err=>res.status(400).json("Unable to response to API"));
}


const imageCount=(req,res,db)=>{
    const {id}=req.body;
    db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries=>{
        res.send(entries);
    })
    .catch(err=>res.status(400).json("error"));
}

module.exports={
    imageCount,
    handleAPIcall
}