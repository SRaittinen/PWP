var config = {};

config = {
    db: {
        development: {
            HOST: "localhost",
            USER: "root",
            PASSWORD: "password",
            DB: "RaceTime"
        },
        test: {
            HOST: "localhost",
            USER: "root",
            PASSWORD: "password",
            DB: "testDB"
        }
    },
    port: {
        development: 3000,
        test: 5000
    }
};

module.exports = config;
