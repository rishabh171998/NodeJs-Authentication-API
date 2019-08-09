const jwt=require('jsonwebtoken');

function auth(req,res,next)

{

const token=req.header('auth-token');
if(!token) return res.status(400).send('Access Denied');

try 
{

    const verified=jwt.verify(token,process.env.TOKEN_SECRET);//This Verification Gives US BAkc The ID Of the USEr 
req.user=verified;
next();
}
catch(err)

{
    res.status(400).send('Invalid Token');
}
}

module.exports=auth;