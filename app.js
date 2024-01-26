const express = require("express");
const morgan = require('morgan');

const mentorroute = require('./routes/mentorroutes');
const projectroute = require('./routes/projectroutes');
const submissionroute = require('./routes/submissionroutes');
const loginroute = require('./routes/loginroutes');


const path = require('path');
const cors = require('cors');
require('dotenv').config()

require('./db/db');

const app = new express();
app.use(morgan('dev'));
app.use(express.json());

app.use(cors());


app.use('/mentor', mentorroute);
app.use('/project', projectroute);
app.use("/submit", submissionroute);
app.use('/auth', loginroute);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
  });

  app.use(express.static(path.join(__dirname,'./build'))); 
  app.get('/*', function(req, res) { 
      res.sendFile(path.join(__dirname ,'./build/index.html')); 
  }); 
  

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});






