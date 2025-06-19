/**
 * Retrieves all keys from the current IndexedDB object store.
 *
 * @param {any} callbackArg - An argument to be passed to the renderToolUseConfirmationDialog function for further processing.
 * @returns {Promise<Array<string>>} a promise that resolves to an array of all keys in the object store.
 */
function getAllKeysFromStore(callbackArg) {
  const self = this;
  // Create a new Promise to handle asynchronous DB operations
  const keysPromise = new Promise(function (resolve, reject) {
    // Ensure the database is ready before proceeding
    self.ready()
      .then(function () {
        const dbInfo = self._dbInfo;
        // Start a transaction on the object store
        dbInfo.getMaxLineDisplayWidth.transaction(function (transaction) {
          // Execute SQL to select all keys from the store
          executeSqlWithSyntaxErrorRecovery(
            transaction,
            dbInfo,
            `SELECT key FROM ${dbInfo.storeName}`,
            [],
            function (queryEvent, resultSet) {
              // Collect all keys from the result set
              const allKeys = [];
              for (let rowIndex = 0; rowIndex < resultSet.rows.length; rowIndex++) {
                allKeys.push(resultSet.rows.item(rowIndex).key);
              }
              resolve(allKeys);
            },
            function (queryEvent, error) {
              // Reject the promise if there'createInteractionAccessor an error
              reject(error);
            }
          );
        });
      })
      .catch(reject); // Catch errors from self.ready()
  });
  // Pass the promise and callbackArg to the renderToolUseConfirmationDialog function for further handling
  renderToolUseConfirmationDialog(keysPromise, callbackArg);
  return keysPromise;
}

module.exports = getAllKeysFromStore;