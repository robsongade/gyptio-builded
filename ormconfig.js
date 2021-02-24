const rootDir = (process.env.NODE_ENV && process.env.NODE_ENV == "production") ? 'build' : 'src'
const ext = (process.env.NODE_ENV && process.env.NODE_ENV == "production") ? 'js' : 'ts'
const DATABASE_URL = process.env.HOST_DATABASE_URL || process.env.DATABASE_URL;
const logorm = (ext == 'ts') ? !!process.env.LOGORM_TS : !!process.env.LOGORM

module.exports = {
   "type": process.env.DRIVE_DB || "postgres",
   "url" : process.env.DRIVE_DB != "mysql" ? DATABASE_URL : false,
   "port": process.env.PORT_DB || false,
   "username": process.env.USER_DB || false,
   "password": process.env.PASSWORD_DB || false,
   "database": process.env.DB || false,
   "synchronize": process.env.AUTO_SYNC || false,
   "logging": logorm,
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