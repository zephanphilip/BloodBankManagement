require('dotenv').config()


const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const bloodBankRoutes = require('./routes/bloodBank');
const userRoutes = require('./routes/user');


const app = express();

// Enable CORS
app.use(cors());


//middleware
app.use(express.json())
app.use((req, res, next)=>{
    console.log(req.path,req.method);
    next();
})


//routes
app.use('/api/workouts',bloodBankRoutes);
app.use('/api/user',userRoutes);

//db connect
mongoose.connect(process.env.MONG_URI).then(()=>{
    //listen on port
    app.listen(process.env.PORT,()=>{
        console.log('connected to db and listening on port',process.env.PORT);
    });
}).catch((error)=>{
    console.log(error)
});


