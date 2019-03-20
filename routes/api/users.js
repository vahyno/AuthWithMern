var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var keys = require('../../config/keys');

// Load input validation
var validateRegisterInput = require('../../validation/register');
var validateLoginInput = require('../../validation/login');

// Load User model
var User = require('../../models/User');

// @route POST api/users/register
// @desc Register user
// @access Public

router.post('/register', (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    
    // Check validation 
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({email: req.body.email})
    .then((user) => {
        if (user) {
            return res.status(400).json({email: "Email already exists"});
        } 
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
            if (err) throw err;
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then((user) => res.json(user))
                        .catch((err) => console.log(err));
                });
            });
        })
});

