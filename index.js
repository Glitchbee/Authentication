const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const engine = require('ejs-mate');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('passport-local');
const userRoutes = require('./routes/user');
const { User } = require('./models/user');

mongoose.connect('mongodb://127.0.0.1:27017/AuthenticationDB')
    .then(() => {
        console.log('Connection Established...');
    })
    .catch(e => {
        console.log('Connection failed!!!');
        console.log(e);
    })


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.engine('ejs', engine);

app.use(session({ secret: 'protectedkey', resave: false, saveUninitialized: false }));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use(express.static(path.join(__dirname, 'public')));


app.use('/user', userRoutes);


app.all('*', (req, res) => {
    res.status(404).send('Page Not Found!!!')
})


app.use((error, req, res, next) => {
    const { status = 500, message = "Something went wrong!!!" } = error;
    res.status(status).send(message);
})


app.listen(port, () => {
    console.log('Server listens on port 3000...');
})