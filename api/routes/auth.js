const authController = require('../controller/auth.controller');

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/api/signin', authController.signin);
    // TODO: Only signed in admin users can sign up new users!
    app.post('/api/signup', authController.signup);
}