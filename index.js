const express=require('express');
const app=express();
const mongoose=require('mongoose');
const authRoute=require('./routes/auth');
const dotenv=require('dotenv');
const postRoute=require('./routes/post');
dotenv.config();
//DB Connection
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Db connected");
});
app.use(express.json());
//Route MiddleWare


app.use('/api/user',authRoute)//api/user will be prefix of authroute bcoz when use (route,thing to do when accesed)
app.use('/api/post',postRoute);
app.listen(3000,function()
{
console.log("server is running");

});