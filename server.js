const express = require('express');
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 4000;
const swaggerUi = require('swagger-ui-express');
const doctorsRoute = require('./routes/doctorsRoute');
const clinicsRoute = require('./routes/clinicsRoute');
const jobsRoute = require('./routes/jobsRoute');
const cors = require("cors");
const dotenv = require('dotenv')
const cloudinary = require("cloudinary").v2;
swaggerDocument = require('./swagger.json');
dotenv.config()

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.use(express.json()) //to read body req 

app.use(cors()) //to connect chrome browser or any browser 

app.use('/doctors', doctorsRoute);

app.use('/clinics', clinicsRoute);

app.use('/jobs', jobsRoute);

app.get("/", function (req, res) {
  //when we get an http get request to the root/homepage
  res.send("This is the backend of NZ locum network, go to /api-docs to test endpoints.");
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.listen(port, () => {
  console.log(`NZ veterinary locum app listening at ${port}`)
});

mongoose.connect(`${process.env.ATLAS_URI}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("MongoDB is connected successfully");
});
