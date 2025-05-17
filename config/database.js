// module.exports = {
//     database: {
//         host: 'localhost',
//         user: 'root',
//         password: '62221085',
//         database: 'simplelotto',
//         pool: {
//             max: 5,
//             min: 0,
//             acquire: 30000,
//             idle: 10000
//         }
//     },
//     secret: 'yourSuperSecretKey'
// }

module.exports = {
    database: {
        url: 'mysql://Padilotto_wordrushof:d030caf65b4e0827f462ebbca5a2aaeff45bf969@27gi4.h.filess.io:3307/Padilotto_wordrushof',
        host: '27gi4.h.filess.io',
        user: 'Padilotto_wordrushof',
        password: 'd030caf65b4e0827f462ebbca5a2aaeff45bf969',
        database: 'Padilotto_wordrushof',
        port: 3307,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
    secret: 'yourSuperSecretKey'
}