const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true });
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.send('User registered successfully...');
        console.log("Record Inserted Succesfully")
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});
app.post("/",(req,res) => {
    return res.redirect('complete.html')

})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
