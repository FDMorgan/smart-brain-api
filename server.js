const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
    connection: {
        host: 'dpg-chedh65269v75d3paqqg-a',
        user: 'mmorgan',
        password: 'tvOX7LhhiK7qLdRIIVGPWydWzlRd76vc',
        database: 'smart_brain_4nln'
  }
});

const app = express();

app.use(cors())
app.use(express.json());

app.get('/', (req, res)=> { res.send(db.users) })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

const PORT = process.env.PORT;

app.listen(PORT || 3000, ()=> {
  console.log(`app is running on port ${PORT}`);
})