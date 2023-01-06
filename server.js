const express = require('express');
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 4000;
const swaggerUi = require('swagger-ui-express');
const doctorsRoute = require('./routes/doctorsRoute');
const clinicsRoute = require('./routes/clinicsRoute');
const jobsRoute = require('./routes/jobsRoute');
const cors = require("cors");
const stream = require('stream');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv')
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
  res.send("This is the backend of NZ locum network, go to /api-docs to test endpoints");
});

app.get("/images/:imageKey", (req, res) => {
  const imageKey = req?.params?.imageKey
  try {
    const filePath = path.resolve("public", imageKey)
    const readableStream = fs.createReadStream(filePath)
    const passThroughStream = new stream.PassThrough()
    stream.pipeline(
      readableStream,
      passThroughStream,
      (error) => {
        if (error) {
          console.log(error)
          res.status(500).json({ error })
        }
      }
    )
    passThroughStream.pipe(res)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
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
