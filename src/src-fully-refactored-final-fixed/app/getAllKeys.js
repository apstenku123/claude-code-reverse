/**
 * Retrieves all keys from the database store.
 *
 * @param {any} callbackArg - Argument to be passed to the renderToolUseConfirmationDialog function for further processing.
 * @returns {Promise<Array<string>>} a promise that resolves to an array of all keys in the store.
 */
function getAllKeys(callbackArg) {
  const self = this;
  // Create a new Promise to handle asynchronous DB operations
  const keysPromise = new Promise(function (resolve, reject) {
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
              const keys = [];
              // Iterate through the result set and collect all keys
              for (let rowIndex = 0; rowIndex < resultSet.rows.length; rowIndex++) {
                keys.push(resultSet.rows.item(rowIndex).key);
              }
              resolve(keys);
            },
            function (queryError, error) {
              // Reject the promise if there is a query error
              reject(error);
            }
          );
        });
      })
      .catch(reject); // Handle errors from self.ready()
  });
  // Call renderToolUseConfirmationDialog for further processing (side effect)
  renderToolUseConfirmationDialog(keysPromise, callbackArg);
  return keysPromise;
}

module.exports = getAllKeys;