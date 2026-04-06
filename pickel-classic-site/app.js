const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const https = require('https');
const http = require('http');
const nodemailer = require('nodemailer');
const fs = require('fs');
const flash = require('connect-flash');

require('dotenv').config();

const app = express();

const User = require('./models/User')


// Create transporter for nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: '587',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
})

// Generate token for password reset
function generateToken() {
    var buf = new Buffer(16);
    for (var i = 0; i < buf.length; i++) {
        buf[i] = Math.floor(Math.random() * 256);
    }
    var id = buf.toString('base64');
    return id;
}


// Send email containing password reset code to requesting user
async function sendPasswordResetCode(resetToken, outboundAddress) {
    
    await transporter.sendMail({
        from: 'mattpickel.testing@gmail.com',
        to: outboundAddress,
        subject: 'Test message',
        text: `Use this reset code to change your password: ${resetToken}`  
    });
}

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

mongoose.connect(process.env.DB_URI)

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentPath = req.path;
    res.locals.user = req.user; // pass user to template
    next();
});


app.get('/', (req, res) => {
    res.render('welcome2');
})

app.get('/admin', async (req, res) => {
    try {
        const users = await User.find({});
        res.render('admin', {
            users
        });
    } catch (error) {
        console.log('Failed to retrieve users: ', error);
        res.status(500).send('Server Error');
    }
});

app.get('/admin-email', async (req, res) => {
    res.render('admin-email')
});

app.get('/info', (req, res) => {
    res.render('info');
});

app.get('/createaccount', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/mydetails');
    } else {
        res.render('createaccount');
    }
});


app.get('/register', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('register');
    } else {
        res.redirect('/createaccount');
    }
});

app.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/mydetails');
    } else {
        res.render('login');
    }
});

app.get('/changepassword', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('changepassword');
    } else {
        res.redirect('/login');
    }
});

app.get('/forgotpassword', (req, res) => {
    res.render('forgotpassword');
});

app.get('/resetpassword', (req, res) => {
    res.render('resetpassword');
});

app.get('/golfers', async (req, res) => {
    try {
        const users = await User.find({
            paymentstatus: true
        });
        res.render('golfers', {
            users
        });
    } catch (error) {
        console.log('Failed to retrieve users: ', error);
        res.status(500).send('Server Error');
    }
});

app.get('/sidegames', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('sidegames');
    } else {
        res.redirect('/login');
    }
})

app.get('/payment', (req, res) => {
    res.render('payment');
})

app.get('/mydetails', async (req, res) => {
    if (req.isAuthenticated()) {
        try {
            const user = await User.findOne({
                username: req.user.username
            });
            res.render('mydetails', {
                user
            });
        } catch (error) {
            console.log('Failed to retrieve user: ', error);
            res.status(500).send('Server Error');
        }
    } else {
        res.redirect('/login');
    }
    
})

app.get('/partners', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('partners');
    } else {
        res.redirect('/login');
    }
})

app.post('/register', async (req, res) => {
    const fName = req.body.first_name;
    const lName = req.body.last_name;
    const friday = req.body.friday;
    const monday = req.body.monday;
    const shirt = req.body.shirt;
    try {
        await User.updateOne({
            username: req.user.username
        }, {
            fName: fName,
            lName: lName,
            friday: friday,
            monday: monday,
            shirt: shirt
        });
        console.log('User updated successfully');
        res.redirect('/payment');
    } catch (error) {
        console.log('Failed to update user: ', error);
        res.status(500).send('Server Error');
    }
})

app.post('/sidegames', async (req, res) => {

    const sidegames = req.body.sidegames;

    try {
        await User.updateOne({
            username: req.user.username
        }, {

            sidegames: sidegames
        });
        console.log('User updated successfully');
        res.redirect('/payment');
    } catch (error) {
        console.log('Failed to update user: ', error);
        res.status(500).send('Server Error');
    }
})

app.post('/partners', async (req, res) => {
    const partnerArray = ['first_partner', 'second_partner', 'third_partner', 'fourth_partner', 'fifth_partner', 'sixth_partner']
        .map(partnerKey => req.body[partnerKey]);

    try {
        await User.updateOne({
            username: req.user.username
        }, {
            requestedPartners: partnerArray
        });
        console.log('User updated successfully');
        res.redirect('/sidegames');
    } catch (error) {
        console.log('Failed to update user: ', error);
        res.status(500).send('Server Error');
    }
})

app.post('/createaccount', async (req, res) => {
    if (req.body.password !== req.body['confirm-password']) {
        console.log('Passwords do not match!');
        return res.redirect('/createaccount');
    }

    User.register(new User({
        username: req.body.email,
        email: req.body.email,
        payment: false
    }), req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            res.redirect('/createaccount');
        } else {
            console.log('registered successfully');
            req.login(user, function (err) {
                if (err) {
                    console.log(err);
                    return res.redirect('/createaccount');
                }
                return res.redirect('/register');
            });
        };
    });
});

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
  function(req, res) {
    res.redirect('mydetails');
  });


app.post('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

app.post('/changepassword', async function(req, res) {
    if (req.isAuthenticated()) {
        try {
            const user = await User.findOne({
                username: req.user.username
            });
            user.changePassword(req.body.oldpassword, req.body.newpassword, function(err) {
                if(err) {
                    if(err.name === 'IncorrectPasswordError'){
                        res.json({ success: false, message: 'Incorrect password' }); // Return Error
                    }else {
                        res.json({ success: false, message: 'Something went wrong!! Please try again after sometimes.' });
                    }
                } else {
                    res.json({ success: true, message: 'Your password has been changed successfully' });
                }
            });
        } catch (error) {
            console.log('Failed to retrieve user: ', error);
            res.status(500).send('Server Error');
        }
    } else {
        res.redirect('/login');
    }
})

app.post('/forgotpassword', async function(req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/mydetails');
    } else {
        try {
            const user = await User.findOne({
                username: req.body.email
            });
            // generate and send token thru email
            const resetToken = generateToken();
            console.log(resetToken);
            sendPasswordResetCode(resetToken, req.body.email);
            // add token to user in db w/ timeout
            await user.updateOne({
                token: resetToken
            });
            // redirect to new password form
            res.redirect('/resetpassword');
        } catch (error) {
            console.log('Failed to retrieve user: ', error);
            res.status(500).send('Server Error');
        }
    }
})

app.post('/resetpassword', async function(req, res) {
    
    try {
        const user = await User.findOne({
            username: req.body.email
        });
        if (user.token === req.body.resetCode) {
            if (req.body.newPassword === req.body.confirmNewPassword) {
                // Set password to entered password
                user.setPassword(req.body.newPassword, function(){
                user.save();
                res.status(200).json({message: 'password reset successfully'});
            });
            } else {
                // Passwords do not match
            }
            
        } else {
            // flash error 'invalid reset code'
            res.status(500).json({message: 'Invalid reset code'});
        };
    } catch (error) {
        console.log('Failed to retrieve user: ', error);
        res.status(500).send('Server Error');
    }
})

app.post('/update-payment-status', async (req, res) => {
    try {
        await User.updateOne({
            _id: req.body.id
        }, {
            paymentstatus: true
        });
        res.send('User payment status updated successfully');
    } catch (error) {
        console.log('Failed to update user payment status: ', error);
        res.status(500).send('Server Error');
    }
})


// https
//     .createServer(
//         // Provide the private and public key to the server by reading each
//         // file's content with the readFileSync() method.
//         {
//             key: fs.readFileSync(process.env.CERT_KEY),
//             cert: fs.readFileSync(process.env.CERT_PATH),
//         },
//         app
//     )
//     .listen(443, () => {
//         console.log('HTTPS server is running at port 443')
//     });

// http
//     .createServer(app)
//     .listen(80, () => {
//         console.log('HTTP server running at port 80')
//     });

const port = process.env.PORT;
app.listen(port, () => {
    console.log('Server is running at port: ' + port);
});