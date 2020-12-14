const rootDir = (process.env.NODE_ENV && process.env.NODE_ENV == "production") ? '.' : 'src'
const ext = (process.env.NODE_ENV && process.env.NODE_ENV == "production") ? 'js' : 'ts'
const DATABASE_URL = process.env.HOST_DATABASE_URL || process.env.DATABASE_URL;

console.log(rootDir + "/entity/**/*."+ext)
module.exports = {
   "type": "postgres",
   "url" : DATABASE_URL,
   "synchronize": process.env.AUTO_SYNC || false,
   "logging": false,
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