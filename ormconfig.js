const rootDir = (process.env.NODE_ENV && process.env.NODE_ENV == "production") ? 'build' : 'src'
const ext = (process.env.NODE_ENV && process.env.NODE_ENV == "production") ? 'js' : 'ts'
const DATABASE_URL = process.env.HOST_DATABASE_URL || process.env.DATABASE_URL;
const config = {
   "type": "postgres",
   "url" : DATABASE_URL || 'postgres://postgres:root@localhost:5432/gyptio',
   "port": process.env.PORT_DB || 5432,
   "username": process.env.USER_DB || 'postgres',
   "password": process.env.PASSWORD_DB || 'root',
   "database": process.env.DB || 'gyptio',
   "synchronize": process.env.AUTO_SYNC || false,
   "host": process.env.HOST_DB || "localhost",
   "logging": true,
   "entities": [
      rootDir + "/entity/**/*."+ext
   ],
   "migrations": [
      rootDir + "/migration/**/*."+ext
   ],
   "subscribers": [
      rootDir + "/subscriber/**/*."+ext
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}
module.exports = config