const express = require('express');
const connection = require("./db/db")
const cors = require('cors');
const authRouter = require('./router/authRouter');
const usersRouter = require('./router/usersRouter');
require("dotenv").config();


const app = express();

app.use(cors({origin : ["http://localhost:3000"]}));

app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use('/auth', authRouter);
app.use('/user', usersRouter);

app.get('/', (req,res) => res.send('Hello'))

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  await connection;
  console.log(`Server started on http://localhost:${PORT}`);
});
// software