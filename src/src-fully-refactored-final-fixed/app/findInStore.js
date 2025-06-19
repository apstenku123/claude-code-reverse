/**
 * Searches the database store for the first item matching the provided predicate function.
 * Resolves with the first matching item, or undefined if no match is found.
 *
 * @param {Function} predicate - Function to test each item. Receives (value, key, index). Should return a truthy value to indicate a match.
 * @param {Function} [callback] - Optional callback to be called when the promise resolves or rejects.
 * @returns {Promise<any>} Promise that resolves with the first matching item, or undefined if none found.
 */
function findInStore(predicate, callback) {
  const self = this;
  const promise = new C(function (resolve, reject) {
    // Wait until the database is ready
    self.ready()
      .then(function () {
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
              // Iterate over each row in the result set
              for (let index = 0; index < rowCount; index++) {
                const row = rows.item(index);
                let value = row.value;
                // Deserialize the value if necessary
                if (value) {
                  value = dbInfo.serializer.deserialize(value);
                }
                // Apply the predicate function to the value
                const predicateResult = predicate(value, row.key, index + 1);
                if (predicateResult !== undefined) {
                  // If predicate returns a value, resolve with isBlobOrFileLikeObject and stop iteration
                  resolve(predicateResult);
                  return;
                }
              }
              // If no matching item found, resolve with undefined
              resolve();
            },
            function (sqlTransaction, error) {
              // On SQL error, reject the promise
              reject(error);
            }
          );
        });
      })
      .catch(reject); // Handle errors from self.ready()
  });
  // Attach the optional callback to the promise, if provided
  renderToolUseConfirmationDialog(promise, callback);
  return promise;
}

module.exports = findInStore;