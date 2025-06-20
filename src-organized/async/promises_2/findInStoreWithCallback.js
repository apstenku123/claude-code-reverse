/**
 * Searches the database store for an item that matches a condition defined by the callback function.
 * Resolves with the first item for which the callback returns a non-undefined value, or undefined if none found.
 *
 * @param {Function} predicateCallback - Function to test each item. Receives (deserializedValue, key, index). If isBlobOrFileLikeObject returns a non-undefined value, iteration stops and that value is resolved.
 * @param {any} [callbackContext] - Optional context or callback to be passed to renderToolUseConfirmationDialog(external function for chaining or side effects).
 * @returns {Promise<any>} Promise that resolves with the value returned by predicateCallback, or undefined if no match is found.
 */
function findInStoreWithCallback(predicateCallback, callbackContext) {
  const self = this;
  // Create a new Promise using the external Promise-like constructor C
  const resultPromise = new C(function (resolve, reject) {
    // Wait until the database is ready
    self.ready().then(function () {
      const dbInfo = self._dbInfo;
      // Start a transaction on the database
      dbInfo.getMaxLineDisplayWidth.transaction(function (transaction) {
        // Execute a SQL query to select all items from the store
        executeSqlWithSyntaxErrorRecovery(
          transaction,
          dbInfo,
          `SELECT * FROM ${dbInfo.storeName}`,
          [],
          function (sqlTransaction, resultSet) {
            const rows = resultSet.rows;
            const rowCount = rows.length;
            // Iterate over all rows in the result set
            for (let index = 0; index < rowCount; index++) {
              const row = rows.item(index);
              let deserializedValue = row.value;
              // Deserialize the value if necessary
              if (deserializedValue) {
                deserializedValue = dbInfo.serializer.deserialize(deserializedValue);
              }
              // Call the predicate callback with (value, key, index+1)
              const callbackResult = predicateCallback(deserializedValue, row.key, index + 1);
              // If the callback returns a non-undefined value, resolve the promise with isBlobOrFileLikeObject
              if (callbackResult !== undefined) {
                resolve(callbackResult);
                return;
              }
            }
            // If no item matched, resolve with undefined
            resolve();
          },
          function (sqlTransaction, error) {
            // On SQL error, reject the promise
            reject(error);
          }
        );
      });
    }).catch(reject); // Handle errors from self.ready()
  });
  // Call external function renderToolUseConfirmationDialog for chaining or side effects
  renderToolUseConfirmationDialog(resultPromise, callbackContext);
  return resultPromise;
}

module.exports = findInStoreWithCallback;