require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
// connectDB

const connectDB = require('./db/connect')

//Routes

const authRouter = require("./routes/auth");
const jobRouter = require("./routes/jobs");

app.use(express.json());
// extra packages
const authMiddleware = require('./middleware/authentication')
// routes
app.use('/api/v1/auth/', authRouter);
app.use('/api/v1/jobs',authMiddleware ,jobRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
