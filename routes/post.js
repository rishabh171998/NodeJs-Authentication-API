const router=require('express').Router();
const User=require('../model/User');
const verify=require('./verifytoken');
router.get('/',verify,(req,res)=>
{

    res.json({post:
    {
        title:'My First Post',
        description:'random Data'
    }
});
});
module.exports=router;