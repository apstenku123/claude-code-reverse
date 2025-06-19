/**
 * Retrieves the count of records in the IndexedDB object store for the current instance.
 *
 * @param {any} options - Optional options to pass to the renderToolUseConfirmationDialog function (purpose depends on external implementation).
 * @returns {Promise<number>} a promise that resolves with the count of records in the object store, or rejects with an error.
 */
function getObjectStoreCount(options) {
  const self = this;
  // Create a new Promise using the external Promise-like constructor C
  const countPromise = new C(function (resolve, reject) {
    // Ensure the database is ready before proceeding
    self.ready()
      .then(function () {
        // openTransactionWithRetry is an external function that provides access to the database transaction
        openTransactionWithRetry(self._dbInfo, createDebouncedFunction, function (transactionError, transaction) {
          if (transactionError) {
            // If there was an error opening the transaction, reject the promise
            return reject(transactionError);
          }
          try {
            // Access the object store from the transaction
            const objectStore = transaction.objectStore(self._dbInfo.storeName);
            // Initiate a count request on the object store
            const countRequest = objectStore.count();
            // On success, resolve the promise with the count result
            countRequest.onsuccess = function () {
              resolve(countRequest.result);
            };
            // On error, reject the promise with the error
            countRequest.onerror = function () {
              reject(countRequest.error);
            };
          } catch (objectStoreError) {
            // If an error occurs while accessing the object store, reject the promise
            reject(objectStoreError);
          }
        });
      })
      .catch(reject); // If self.ready() fails, reject the promise
  });
  // Call the external renderToolUseConfirmationDialog function with the promise and options (purpose depends on external implementation)
  renderToolUseConfirmationDialog(countPromise, options);
  return countPromise;
}

module.exports = getObjectStoreCount;