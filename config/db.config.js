module.exports = {
    HOST: "127.0.0.1",
    USER: "postgres",
    PASSWORD: "Aman",
    DB: "temp",
    dialect: "postgres",
    dialectOptions: {
        useUTC: false, // for reading from database
    },
    timezone: '+05:30',
    pool: {
        max: 50,
        min: 0,
        acquire: 60000,
        idle: 10000
    }
}