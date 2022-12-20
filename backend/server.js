const express = require('express');
const mongoose = require("mongoose");
const app = express();
const port = 4000;
const swaggerUi = require('swagger-ui-express');
swaggerDocument = require('./swagger.json');
const cors = require("cors");
const session = require("express-session")
const doctorsRoute = require('./routes/doctorsRoute');
const clinicsRoute = require('./routes/clinicsRoute');
const jobsRoute = require('./routes/jobsRoute');
const bcrypt = require('bcryptjs')

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.use(session({
  secret: 'secret', //for learning purposes
  resave: true,
  saveUninitialized: false,
}));

app.use(express.json()) //to read body req 

app.use(cors()) //to connect chrome browser or any browser 

app.use('/doctors', doctorsRoute);
app.use('/clinics', clinicsRoute);
app.use('/jobs', jobsRoute);

app.listen(port, () => {
  console.log(`NZ veterinary locum app listening at http://localhost:${port}`)
});

mongoose.connect('mongodb://127.0.0.1/nzLocum',
  {
    useNewUrlParser: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("MongoDB is connected successfully");
});

//index.js only take routers