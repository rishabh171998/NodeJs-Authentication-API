const router=require('express').Router();
const User=require('../model/User');
const {registerValidation,loginValidation}=require('../validation');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
//Lets validate data before make user


router.post('/register',async (req,res)=>
{

const {error}=registerValidation(req.body);
   
if(error) return res.status(400).send(error.details[0].message);
//Checking if User In The DataBased

const emailexist=await User.findOne({email:req.body.email});//check Email In Datrabase


if(emailexist) return res.status(400).send('Email Already Exist');

//Hash Passwords
const salt=await bcrypt.genSalt(10);
const hashPassword=await bcrypt.hash(req.body.password,salt);


const user=new User(
    {
        name:req.body.name,
        email:req.body.email,
        password:hashPassword
    }
);
    try 
    {
        const savedUser=await user.save();
        res.send({user:user._id});
    }
    catch(err)
    {
        res.statusCode(400).send(err);
    }
}

);


//Login

router.post('/login',async (req,res)=>
{
    const {error}=loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //checking if the email exists
    const user=await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Email OR Password Doesnt Exist');

//Passowrd is correct
const validpass=await bcrypt.compare(req.body.password,user.password);
if(!validpass) return res.status(400).send('Invalid paaword');
//Password Correct
//Provide JWT 
const token=jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
res.header('auth-token',token).send(token);//Created In HEader
//Send iNFO
} );












module.exports=router;