/**
 * Drops a table from the database if isBlobOrFileLikeObject exists.
 *
 * @param {string} tableName - The name of the table to drop.
 * @returns {Promise<void>} Resolves when the table is dropped or rejects with an error.
 */
function dropTableIfExists(tableName) {
  return new Promise(function (resolve, reject) {
    // Attempt to drop the table if isBlobOrFileLikeObject exists
    initializeStorageWithConfig.executeSql(
      `DROP TABLE IF EXISTS ${tableName}`,
      [],
      function () {
        // Resolve the promise when the table is successfully dropped
        resolve();
      },
      function (errorSource, errorObject) {
        // Reject the promise with the error object if dropping fails
        reject(errorObject);
      }
    );
  });
}

module.exports = dropTableIfExists;