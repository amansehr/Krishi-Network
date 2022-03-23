module.exports = {
    HOST: "ec2-3-225-213-67.compute-1.amazonaws.com",
    USER: "fyvtgtczvqqccd",
    PASSWORD: "e4ba970b2c5595bc4b24726f755eb5e1b22dfb56a2c0e6345d1588b7bc3add80",
    DB: "d4kf6v4s434039",
    dialect: "postgres",
    dialectOptions: {
        useUTC: false, // for reading from database
        ssl: {
            require: true,
            rejectUnauthorized: false
        }

    },
    timezone: '+05:30',
    pool: {
        max: 50,
        min: 0,
        acquire: 60000,
        idle: 10000
    }
}