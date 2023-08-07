const express = require('express');
const connection = require("./db/db")
const cors = require('cors');
const usersRouter = require('./router/userRouter');
require("dotenv").config();


const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use('/auth', usersRouter)

app.get('/', (req,res) => res.send('Hello'))

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  await connection;
  console.log(`Server started on http://localhost:${PORT}`);
});
// software