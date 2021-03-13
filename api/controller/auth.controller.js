const db = require('../model/connection');
const User = db.users;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = (req, res) => {

    const newUserData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mail: req.body.mail,
        password: bcrypt.hashSync(req.body.password, 8),
        roleId: 'admin'
        // TODO: roleId should change after the new roles are created.
    }

    User.create(newUserData)
        .then(user => {
            if (!user) return res.send({
                message: "aut.controller#signup: An error occured while creating the new user."
            });
            res.status(200).send({
                message: "User created succesfully."
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "aut.controller#signup: " + err
            });
        });
};

exports.signin = (req, res) => {
    const { mail, password } = req.body;

    User.findOne({
        attributes: [
            'id',
            'password',
            'firstName',
            'lastName',
            'mail',
            'roleId'

        ],
        where: {
            mail: mail
        },
    })
        .then(user => {
            // Check existing user
            if (!user) {
                return res.status(404).send({ message: "User is not found!" });
            }
            // Check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {   
                    if (!isMatch) {
                        return res.status(401).send({ message: "Invalid Password!" });
                    } else {
                        const sessUser = {
                            id: user.id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            mail: user.mail
                        }
                        req.session.user = sessUser;
                        console.log(user.firstName + ' ' + user.lastName + ' signed in successfully.');
                        res.status(200).send(sessUser);
                    }
                });
        })
        .catch(err => res.status(500).send({ message: err }));
};

exports.signout = (req, res) => {
    req.session.destroy((err) => {
        if (!err) {
            res.clearCookie("hm_auth");
            res.status(200).send({message: "Signed out successfully!"});
        } else {
            console.log("auth.controller#signout: " + err);
        }
    });
}