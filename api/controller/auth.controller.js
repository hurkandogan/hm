const db = require('../model/connection');
const User = db.users;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const signup = (req, res) => {

    const newUserData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mail: req.body.mail,
        password: bcrypt.hashSync(req.body.password, 8),
        roleId: 'admin'
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

const signin = (req, res) => {
    const { mail, password } = req.body;

    User.findOne({
        attributes: [
            'id',
            'password',
            'firstName',
            'lastName',
            'mail'
        ],
        where: {
            mail: mail
        },
    })
        .then(user => {
            
            if (!user) {
                return res.status(404).send({ message: "User is not found!" });
            }

            let isPasswordValid = bcrypt.compareSync(
                password,
                user.password);
            
            if (!isPasswordValid) {
                return res.status(401).send({
                    message: "Invalid password",
                    accessToken: null
                });
            }

            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: 86400
            })
                
            return res.status(200).send({
                id: user.id,
                username: user.username,
                mail: user.mail,
                accessToken: token
                })
            
        })
        .catch(err => res.status(500).send({ message: err }));
};

const signout = (req, res) => {
    req.session.destroy((err) => {
        if (!err) {
            res.clearCookie("hm_auth");
            res.status(200).send({message: "Signed out successfully!"});
        } else {
            console.log("auth.controller#signout: " + err);
        }
    });
}

const authController = {
    signup: signup,
    signin: signin,
    signout: signout
}

module.exports = authController;