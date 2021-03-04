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
    User.findOne({
        where: {
            mail: req.body.data.mail
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User is not found!" });
            }

            let passwordIsValid = bcrypt.compareSync(
                req.body.data.password,
                user.password
            );
            
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            let token = jwt.sign({ id: user.id },
                process.env.JWT_SECRET,
                { expiresIn: 86400 });
            
            return res.status(200).send({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                mail: user.mail,
                role: "admin",
                accessToken: token
            })
        })
    .catch(err => res.status(500).send({message: err}))
 };