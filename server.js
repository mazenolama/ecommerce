const express = require('express');
const app = express();

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration


require('./stratup/db')()
require('./stratup/errors')()

app.use(express.json());
require('./routes')(app)

require('./middlewares/errors')(app)

/*
const txt = 'hello'
app.get('/' , (req , res)=>{ res.send("blog")})
*/

app.listen(5000)