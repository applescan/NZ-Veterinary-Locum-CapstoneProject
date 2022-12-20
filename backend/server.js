const express = require('express');
const mongoose = require("mongoose");
const app = express();
const port = 4000;
const swaggerUi = require('swagger-ui-express');
swaggerDocument = require('./swagger.json');
const doctorsRoute = require('./routes/doctorsRoute');
const cors = require("cors");
const session = require("express-session")

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