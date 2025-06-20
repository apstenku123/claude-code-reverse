/**
 * Iterates over all records in the IndexedDB object store and applies a callback to each item.
 * If the callback returns a value other than undefined, iteration stops and the promise resolves with that value.
 * If the callback never returns a value, the promise resolves with undefined after all items are processed.
 *
 * @param {Function} itemCallback - Function to call for each item. Receives (value, key, iterationIndex).
 * @param {any} [context] - Optional context or options to pass to the promise utility.
 * @returns {Promise<any>} Resolves with the value returned by the callback, or undefined if none.
 */
function iterateObjectStore(itemCallback, context) {
  const self = this;
  // Create a new promise using the custom promise constructor 'C'
  const iterationPromise = new C(function (resolve, reject) {
    // Ensure the database is ready before proceeding
    self.ready()
      .then(function () {
        // Open a transaction on the object store
        openTransactionWithRetry(self._dbInfo, createDebouncedFunction, function (transactionError, transactionEvent) {
          if (transactionError) return reject(transactionError);
          try {
            // Get the object store from the transaction
            const objectStore = transactionEvent.objectStore(self._dbInfo.storeName);
            // Open a cursor to iterate over all records
            const cursorRequest = objectStore.openCursor();
            let iterationIndex = 1;
            // Success handler for cursor iteration
            cursorRequest.onsuccess = function () {
              const cursor = cursorRequest.result;
              if (cursor) {
                let itemValue = cursor.value;
                // If the value is a serialized object, deserialize isBlobOrFileLikeObject
                if (NA(itemValue)) itemValue = decodeAndProcessData(itemValue);
                // Call the provided callback with (value, key, index)
                const callbackResult = itemCallback(itemValue, cursor.key, iterationIndex++);
                if (callbackResult !== undefined) {
                  // If callback returns a value, resolve the promise and stop iteration
                  resolve(callbackResult);
                } else {
                  // Otherwise, continue to the next item
                  cursor.continue();
                }
              } else {
                // No more items, resolve with undefined
                resolve();
              }
            };
            // Error handler for cursor
            cursorRequest.onerror = function () {
              reject(cursorRequest.error);
            };
          } catch (cursorError) {
            reject(cursorError);
          }
        });
      })
      .catch(reject);
  });
  // Attach any additional promise utilities (e.g., chaining) if needed
  renderToolUseConfirmationDialog(iterationPromise, context);
  return iterationPromise;
}

module.exports = iterateObjectStore;