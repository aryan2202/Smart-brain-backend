const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
require('dotenv').config();
app.use(express.json());
app.use(cors());

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.te1dbvh.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));

  mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
    id: String,
    name: String,
    email: String,
    password: String,
    entries: {type: Number, default: 0},
    joined: {type: Date, default: Date.now()}
});

const User = mongoose.model('User', userSchema);

app.get('/', (req, res) => {
    User.find({}, (err, users) => {
    if (err) {
    res.send(err);
    } else {
    res.send(users);
    }
    });
    });

app.put('/image', (req, res) => {
    const { email } = req.body;
    User.findOneAndUpdate({email:email}, { $inc: { entries: 1 } }, (err, user) => {
    if (err) {
    res.status(400).json('User not found');
    } else {
    res.json(user);
    }
    });
    });
    
app.get('/profile/:id', (req, res) => {
const { id } = req.params;
User.findById(id, (err, user) => {
if (err) {
res.status(400).json('User not found');
} else {
res.json(user);
}
});
});


app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (user) {
            res.status(400).json('Email already in use');
        } else {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    res.send(err);
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password: hash
                    });
                    newUser.save((err, user) => {
                        if (err) {
                            res.send(err);
                        } else {
                            res.json('Success');
                        }
                    });
                }
            });
        }
    });
});

app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
    if (err) {
    res.status(400).json('User not found' );
    } else if (!user) {
    res.status(400).json('User not found' );
    } else {
    bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
    res.send(err);
    } else if (!result) {
    res.status(400).json('Incorrect password' );
    } else {
    res.json(user);
    }
    });
    }
    });
    });
app.listen(3000, () => {
    console.log("App running on port 3000")
});
