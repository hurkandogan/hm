const Sequelize = require('sequelize');

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbDial = process.env.DIALECT;
const dbPort = process.env.DB_PORT;
const dbPoolMax = parseInt(process.env.POOL_MAX);
const dbPoolMin = parseInt(process.env.POOL_MIN);
const dbPoolAcquire = parseInt(process.env.POOL_ACQUIRE);
const dbPoolIdle = parseInt(process.env.POOL_IDLE);

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    dialect: dbDial,
    port: dbPort,
    logging: false, //(...msg) => console.log(msg),
    
    pool: {
        max: dbPoolMax,
        min: dbPoolMin,
        acquire: dbPoolAcquire,
        idle: dbPoolIdle
    }
});

const db = {};

db.sequelize = sequelize;

db.users = require('./user.model')(sequelize);
db.objects = require('./object.model')(sequelize);
db.invoices = require('./invoice.model')(sequelize);
db.artwork = require('./artwork.model')(sequelize);

// Foreign Keys
db.objects.hasMany(db.invoices,{ foreignKey: 'objectId' });
db.invoices.belongsTo(db.objects, { foreignKey: 'objectId' });

// Connection Test
const connectionTest = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connection established.");

        await sequelize.sync({ alter: true, force: false });
        console.log("Database model synchronization is completed.");
    } catch (error) {
        console.log(error);
    }
}

connectionTest();

module.exports = db;