const express = require("express")
const app = express();
require('dotenv').config();
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(express.json());
const sequelize = require('./database/db');
const userRouter = require('./Routes/User')
const doctorRouter = require('./Routes/Doctor');
const appointmentRouter = require('./Routes/Appointment');
const imageRouter = require('./Routes/ImageUpload');

app.use("/user",userRouter);
app.use("/doctor",doctorRouter);
app.use("/appointment",appointmentRouter);
app.use("/image",imageRouter);
app.use(express.static('uploads'));

sequelize.sync().then(()=>{
  app.listen(5000,() =>{
    console.log("Running on port 5000")
  });
})