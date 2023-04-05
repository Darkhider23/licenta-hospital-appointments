// Import Express module
const express = require('express');
const { connectToDb, getDb } = require('./server')
const { MongoClient } = require('mongodb')

// Create an instance of Express
const app = express();
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
// let db
//db connection
// // connectToDb((err)=>{
// //   if(!err){
// //     // Start the server
// //     const PORT = 5000; // Port number for the server
// //     app.listen(PORT, () => {
// //       console.log(`Server is running on port ${PORT}`);
// //     });
// //     db = getDb()
// //   }
// // })

// // // Define a route
// // app.get('/', (req, res) => {
// //   let doctors = []

// //   db.collection('doctors')
// //   .find() //cursor
// //   .sort({name : 1})
// //   .forEach(doctor => doctors.push(doctor))
// //   .then(() =>{
// //     res.status(200).json(doctors)
// //   })
// //   .catch(()=>{
// //     res.status(500).json({error:"Could not fetch the documents"})
// //   })
// // });

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'hospital';

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect((err) => {
  if (err) {
    console.error('Error connecting to MongoDB database:', err);
    return;
  }

  console.log('Connected to MongoDB database');

  const db = client.db(dbName);

});
// Define collection and perform CRUD operations here
const insertDoctor = async (db, doctor) => {
  const collection = db.collection('doctors');
  const result = await collection.insertOne(doctor);
  return result.ops[0];
};

const findDoctors = async (db) => {
  const collection = db.collection('doctors');
  const doctors = await collection.find().toArray();
  return doctors;
};

const findDoctorById = async (db, name) => {
  const collection = db.collection('doctors');
  const doctor = await collection.findOne({ _name: name });
  return doctor;
};

const updateDoctor = async (db, id, update) => {
  const collection = db.collection('doctors');
  const result = await collection.findOneAndUpdate({ _id: id }, { $set: update }, { returnOriginal: false });
  return result.value;
};

const deleteDoctor = async (db, id) => {
  const collection = db.collection('doctors');
  const result = await collection.deleteOne({ _id: id });
  return result.deletedCount === 1;
};

app.use(express.json());

app.post('/doctors', async (req, res) => {
  const { name, price, image } = req.body;
  const doctor = { name, price, image };
  const db = client.db(dbName);
  const result = await insertDoctor(db, doctor);
  res.json(result);
});

app.get('/doctors', async (req, res) => {
  const db = client.db(dbName);
  const doctors = await findDoctors(db);
  res.json(doctors);
});

app.get('/doctors/:name', async (req, res) => {
  const { name } = req.params;
  const db = client.db(dbName);
  const doctor = await findDoctorById(db, name);
  if (!doctor) {
    return res.status(404).json({ error: 'Doctor not found' });
  }
  res.json(doctor);
});

app.put('/doctors/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;
  const update = { name, price, image };
  const db = client.db(dbName);
  const doctor = await updateDoctor(db, id, update);
  if (!doctor) {
    return res.status(404).json({ error: 'Doctor not found' });
  }
  res.json(doctor);
});

app.delete('/doctors/:id', async (req, res) => {
  const { id } = req.params;
  const db = client.db(dbName);
  const result = await deleteDoctor(db, id);
  if (!result) {
    return res.status(404).json({ error: 'Doctor not found' });
  }
  res.json({ message: 'Doctor deleted' });
});

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});











