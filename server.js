const express= require('express');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const knex=require('knex');

const register=require('./controllers/register');
const signin=require('./controllers/signin');
const profile=require('./controllers/profile');
const image=require('./controllers/image');

const db= knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'test',
      database : 'smart-brain'
    }
  });

const app=express();
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(cors());




/*routes*/

app.get('/',(req,res)=>{  res.send("It is working.");})

//signin
app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)});

//resgister
app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)});

//profile
app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)});

//image
app.put('/image',(req,res)=>{image.imageCount(req,res,db)});

//API call
app.post('/imageurl',(req,res)=>{image.handleAPIcall(req,res)});

app.listen(process.env.PORT||3000,()=>{
    console.log(`app is running on port ${process.env.PORT}`)
}); 