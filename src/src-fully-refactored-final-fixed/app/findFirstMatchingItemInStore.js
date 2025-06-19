/**
 * Searches the database store for the first item that matches a given predicate function.
 * Resolves with the first matching item, or undefined if no match is found.
 *
 * @param {Function} predicate - a function to test each item. Receives (value, key, index) and should return a truthy value to indicate a match.
 * @param {Function} [callback] - Optional callback to be invoked after the search completes.
 * @returns {Promise<any>} - a promise that resolves with the first matching item, or undefined if none found.
 */
function findFirstMatchingItemInStore(predicate, callback) {
  const self = this;
  // Create a new Promise that will resolve with the first matching item
  const searchPromise = new Promise(function (resolve, reject) {
    // Ensure the database is ready before proceeding
    self.ready()
      .then(function () {
        const dbInfo = self._dbInfo;
        // Start a transaction on the database
        dbInfo.getMaxLineDisplayWidth.transaction(function (transaction) {
          // Execute a SQL query to select all items from the store
          executeSql(
            transaction,
            dbInfo,
            `SELECT * FROM ${dbInfo.storeName}`,
            [],
            function (tx, resultSet) {
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
                // If the predicate returns a value other than undefined, resolve with that value
                if (predicateResult !== undefined) {
                  resolve(predicateResult);
                  return;
                }
              }
              // If no match is found, resolve with undefined
              resolve();
            },
            function (tx, error) {
              // If an error occurs during the SQL query, reject the promise
              reject(error);
            }
          );
        });
      })
      .catch(reject); // Handle errors from self.ready()
  });
  // Optionally chain the provided callback to the promise
  chainPromiseWithCallback(searchPromise, callback);
  return searchPromise;
}

module.exports = findFirstMatchingItemInStore;