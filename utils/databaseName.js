const devDbName = 'mongodb://127.0.0.1:27017/bitfilmsdb';

function databaseName() {
  const dbName = process.env.NODE_ENV === 'production' ? process.env.DB_NAME : devDbName;
  return dbName;
}

module.exports = { databaseName };
