const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/auth.js');
const cParser = require('cookie-parser');
const { protect } = require('./controllers/auth.js');


require('dotenv').config();

const app = express();

app.use(express.static('public/'));
app.use(express.json());
app.use(cParser());

app.set('view engine', 'ejs');

app.get('/', (_, res) => res.render('home'));
app.get('/users', protect, (_, res) => res.render('users'))
app.use(router);

const dburl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@auth.s5l5g.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`;

mongoose.connect(dburl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(_ => {
    app.listen(Number(process.env.PORT), () => {
      console.log(`App running on port ${process.env.PORT}`)
    })
  })
  .catch(error => {
    console.log(error)
  })
