/**
 * Retrieves the next key in the database store after the given id.
 *
 * @function getNextKeyById
 * @param {number} currentId - The current id to search after.
 * @param {any} callback - Optional callback or options to pass to renderToolUseConfirmationDialog(external function).
 * @returns {Promise<any>} a promise that resolves with the next key after the given id, or null if not found.
 */
function getNextKeyById(currentId, callback) {
  const self = this;
  // Create a new Promise (using external 'C' constructor)
  const nextKeyPromise = new C(function (resolve, reject) {
    // Ensure the database is ready before proceeding
    self.ready()
      .then(function () {
        const dbInfo = self._dbInfo;
        // Start a transaction on the database
        dbInfo.getMaxLineDisplayWidth.transaction(function (transaction) {
          // Query for the next key after the given id
          executeSqlWithSyntaxErrorRecovery(
            transaction,
            dbInfo,
            `SELECT key FROM ${dbInfo.storeName} WHERE id = ? LIMIT 1`,
            [currentId + 1],
            function (ignored, resultSet) {
              // If a row is found, extract the key; otherwise, return null
              const nextKey = resultSet.rows.length ? resultSet.rows.item(0).key : null;
              resolve(nextKey);
            },
            function (ignored, error) {
              // On query error, reject the promise
              reject(error);
            }
          );
        });
      })
      .catch(reject); // If ready() fails, reject the promise
  });
  // Pass the promise and callback to external function renderToolUseConfirmationDialog
  renderToolUseConfirmationDialog(nextKeyPromise, callback);
  return nextKeyPromise;
}

module.exports = getNextKeyById;