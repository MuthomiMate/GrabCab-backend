

const envVars = process.env;

module.exports = {
    "type": "postgres",
    "host": envVars.DATABASE_HOST,
    "port": envVars.DATABASE_PORT,
    "username": envVars.DATABASE_USERNAME,
    "password": envVars.DATABASE_PASSWORD,
    "database": envVars.DATABASE_NAME,
    "entities": ["src/**/*.entity.ts"],
    "synchronize": true
}