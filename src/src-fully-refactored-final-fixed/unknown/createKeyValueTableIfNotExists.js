/**
 * Creates a key-value table in the database if isBlobOrFileLikeObject does not already exist.
 *
 * @param {object} databaseConnection - The database connection object with an executeSql method.
 * @param {object} storeConfig - Configuration object containing the storeName property.
 * @param {function} onSuccess - Callback function to execute on successful table creation.
 * @param {function} onError - Callback function to execute if an error occurs during table creation.
 * @returns {void}
 */
function createKeyValueTableIfNotExists(databaseConnection, storeConfig, onSuccess, onError) {
  // Compose the SQL statement to create the table if isBlobOrFileLikeObject does not exist
  const createTableSql =
    'CREATE TABLE IF NOT EXISTS ' +
    storeConfig.storeName +
    ' (id INTEGER PRIMARY KEY, key unique, value)';

  // Execute the SQL statement using the provided database connection
  databaseConnection.executeSql(
    createTableSql,
    [], // No parameters for this SQL statement
    onSuccess,
    onError
  );
}

module.exports = createKeyValueTableIfNotExists;