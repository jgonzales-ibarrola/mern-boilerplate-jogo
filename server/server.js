require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();

// const allowedOrigins = process.env.NODE_ENV === 'production' 
//   ? 'https://yourdomain.com'
//   : 'http://localhost:4000';

// const postsRoutes = require('./routes/postsRoutes')
const todosRoutes = require('./routes/todosRoute')

// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}))
app.use(cors());

app.use((req, res, next) => {
	console.log("Path: ", req.path);
	console.log("Method: ", req.method);

	next();
});

// Routes
// app.use('/api/posts', postsRoutes)

app.use('/api/todos', todosRoutes)

// Connect to DB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to DB!"))
  .catch((err) => {
    console.error("Cannot connect to DB!", err);
    if (process.env.NODE_ENV === 'production') {
      process.exit(1); // Exit with failure if unable to connect in production
    }
  });
app.listen(4000, () => console.log(`Server running at port 4000`))