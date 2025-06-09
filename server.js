const express = require('express')
const app = express()
// require('dotenv').config()
const routes = require('./routes.js')

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const cors = require('cors');
app.use(cors());

app.use('/', routes)

app.listen(3000, () => {
  console.log('server is listening in port 3000');
})