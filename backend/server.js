const express=require('express');
//const bodyParser=require('body-parser');
const cors=require('cors');
const mongoose=require('mongoose');

//environment variables 
require('dotenv').config();

//creates express server
const app=express();
const port=process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

//connecting mongoDb Atlas
const uri =process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true});
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB database connection established successfully")
})

//require the files and use the files
const exerciseRouter=require('./routes/exercises');
const usersRouter=require('./routes/users');
app.use('/exercises', exerciseRouter);
app.use('/users', usersRouter);

//starts the server
app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`);
});