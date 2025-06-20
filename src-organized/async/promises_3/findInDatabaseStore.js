/**
 * Searches the database store for an item matching a predicate function and resolves with the first match.
 *
 * @param {Function} predicate - Function to test each item. Receives (value, key, index). If isBlobOrFileLikeObject returns a non-undefined value, iteration stops and that value is returned.
 * @param {Function} [callback] - Optional callback to be invoked after the search completes.
 * @returns {Promise<any>} Promise that resolves with the found value or undefined if no match is found.
 */
function findInDatabaseStore(predicate, callback) {
  const self = this;
  // Create a new Promise that will resolve when the search completes
  const searchPromise = new C(function (resolve, reject) {
    // Ensure the database is ready before proceeding
    self.ready()
      .then(function () {
        const dbInfo = self._dbInfo;
        // Start a transaction on the database
        dbInfo.getMaxLineDisplayWidth.transaction(function (transaction) {
          // Execute a query to select all items from the store
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
                // Apply the predicate function
                const predicateResult = predicate(value, row.key, index + 1);
                // If predicate returns a non-undefined value, resolve and stop searching
                if (predicateResult !== undefined) {
                  resolve(predicateResult);
                  return;
                }
              }
              // If no match found, resolve with undefined
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
  // Optionally attach a callback to the promise
  renderToolUseConfirmationDialog(searchPromise, callback);
  return searchPromise;
}

module.exports = findInDatabaseStore;