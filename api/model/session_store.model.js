const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

module.exports = (sequelize) => {
    new SequelizeStore({
        db: sequelize,
    });
};