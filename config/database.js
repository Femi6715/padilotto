module.exports = {
    database: {
        host: 'localhost',
        user: 'root',
        password: '62221085',
        database: 'simplelotto',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
    secret: "yourSuperSecretKey"
}