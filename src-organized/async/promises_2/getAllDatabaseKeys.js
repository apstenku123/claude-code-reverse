/**
 * Retrieves all keys from the current database store.
 *
 * @param {any} callbackArg - An argument passed to the renderToolUseConfirmationDialog function for additional processing.
 * @returns {Promise<Array<string>>} a promise that resolves to an array of all keys in the store.
 *
 * The function ensures the database is ready, then starts a transaction to select all keys from the store.
 * On success, isBlobOrFileLikeObject resolves with an array of keys. On error, isBlobOrFileLikeObject rejects with the error object.
 */
function getAllDatabaseKeys(callbackArg) {
  const self = this;
  // Create a new Promise to handle asynchronous DB operations
  const keysPromise = new C(function (resolve, reject) {
    // Ensure the database is ready before proceeding
    self.ready()
      .then(function () {
        const dbInfo = self._dbInfo;
        // Start a transaction on the database
        dbInfo.getMaxLineDisplayWidth.transaction(function (transaction) {
          // Execute SQL to select all keys from the store
          executeSqlWithSyntaxErrorRecovery(
            transaction,
            dbInfo,
            `SELECT key FROM ${dbInfo.storeName}`,
            [],
            function (queryError, resultSet) {
              // Collect all keys from the result set
              const allKeys = [];
              for (let rowIndex = 0; rowIndex < resultSet.rows.length; rowIndex++) {
                allKeys.push(resultSet.rows.item(rowIndex).key);
              }
              resolve(allKeys);
            },
            function (queryError, errorObject) {
              // Reject the promise if there'createInteractionAccessor a query error
              reject(errorObject);
            }
          );
        });
      })
      .catch(reject); // Reject if database is not ready
  });
  // Pass the promise and callbackArg to the external renderToolUseConfirmationDialog function for further processing
  renderToolUseConfirmationDialog(keysPromise, callbackArg);
  return keysPromise;
}

module.exports = getAllDatabaseKeys;