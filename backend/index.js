const express = require("express")
const app = express();
require('dotenv').config();
const cors = require('cors');
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
const corsOptions ={
  origin:['http://localhost:3000','http://192.168.0.165:3000'],
};
app.use(cors(corsOptions));

app.use(express.json());
const sequelize = require('./database/db');
const userRouter = require('./Routes/User')
const doctorRouter = require('./Routes/Doctor');
const appointmentsRouter = require('./Routes/Appointments');
const searchRouter = require('./utils/search')
const specializationsRouter = require('./Routes/Specializations')
const diseasesRouter = require('./Routes/Diseases')
const symptomsRouter = require('./Routes/Symptoms')
const imageRouter = require('./Routes/Image')
const treatmentRouter = require('./Routes/Treatment')
const analysisPricesRouter = require('./Routes/AnalisysPrices');
const BMIRouter = require('./Routes/BMIRoute')
const emailRouter = require('./Routes/Email')

app.use("/user", userRouter);
app.use("/doctor", doctorRouter);
app.use("/appointments", appointmentsRouter);
app.use("/image", imageRouter);
app.use("/api", searchRouter);
app.use("/specializations", specializationsRouter);
app.use("/diseases", diseasesRouter);
app.use("/symptoms", symptomsRouter);
app.use("/treatment",treatmentRouter);
app.use("/analisysprices",analysisPricesRouter);
app.use("/bmi",BMIRouter);
app.use("/email",emailRouter);
app.use('/uploads', express.static('uploads'));

sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log("Running on port 5000")
  });
})