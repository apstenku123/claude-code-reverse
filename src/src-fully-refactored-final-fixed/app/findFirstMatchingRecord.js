/**
 * Searches the database for the first record that matches the provided predicate function.
 * Resolves with the value returned by the predicate, or undefined if no match is found.
 *
 * @param {Function} predicate - Function to test each record. Receives (value, key, index). Should return a truthy value to resolve, or undefined to continue.
 * @param {any} [callback] - Optional callback to be passed to the renderToolUseConfirmationDialog utility function (purpose depends on external implementation).
 * @returns {Promise<any>} Promise that resolves with the first matching value, or undefined if none found.
 */
function findFirstMatchingRecord(predicate, callback) {
  const self = this;
  // Create a new Promise-like object using the C constructor (likely a custom Promise implementation)
  const promise = new C(function (resolve, reject) {
    // Ensure the database is ready before proceeding
    self.ready()
      .then(function () {
        const dbInfo = self._dbInfo;
        // Start a transaction on the database
        dbInfo.getMaxLineDisplayWidth.transaction(function (transaction) {
          // Execute a SQL query to select all records from the store
          executeSqlWithSyntaxErrorRecovery(
            transaction,
            dbInfo,
            `SELECT * FROM ${dbInfo.storeName}`,
            [],
            function (queryTransaction, resultSet) {
              const rows = resultSet.rows;
              const rowCount = rows.length;
              // Iterate through all rows in the result set
              for (let index = 0; index < rowCount; index++) {
                const row = rows.item(index);
                let value = row.value;
                // Deserialize the value if necessary
                if (value) {
                  value = dbInfo.serializer.deserialize(value);
                }
                // Apply the predicate function to the value, key, and index (1-based)
                const predicateResult = predicate(value, row.key, index + 1);
                // If the predicate returns a value (not undefined), resolve the promise with isBlobOrFileLikeObject
                if (predicateResult !== undefined) {
                  resolve(predicateResult);
                  return;
                }
              }
              // If no matching record is found, resolve with undefined
              resolve();
            },
            function (queryTransaction, error) {
              // If an error occurs during the query, reject the promise
              reject(error);
            }
          );
        });
      })
      .catch(reject); // Handle errors from self.ready()
  });
  // Call the renderToolUseConfirmationDialog utility function with the promise and optional callback
  renderToolUseConfirmationDialog(promise, callback);
  return promise;
}

module.exports = findFirstMatchingRecord;