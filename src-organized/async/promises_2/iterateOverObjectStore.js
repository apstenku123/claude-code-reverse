/**
 * Iterates over all entries in the IndexedDB object store, applying a callback to each value.
 * If the callback returns a non-undefined value, iteration stops and the promise resolves with that value.
 * Otherwise, resolves with undefined after all entries are processed.
 *
 * @param {Function} iteratee - Function to call for each value. Receives (value, key, iterationIndex).
 * @param {any} [callbackContext] - Optional context or callback to pass to the returned promise handler.
 * @returns {Promise<any>} Promise that resolves with the value returned by iteratee, or undefined if none.
 */
function iterateOverObjectStore(iteratee, callbackContext) {
  const self = this;
  // Create a new promise to handle the asynchronous iteration
  const iterationPromise = new Promise(function (resolve, reject) {
    // Ensure the database is ready before proceeding
    self.ready()
      .then(function () {
        // Open a transaction and access the object store
        openTransactionWithRetry(self._dbInfo, createDebouncedFunction, function (transactionError, transactionEvent) {
          if (transactionError) return reject(transactionError);
          try {
            const objectStore = transactionEvent.objectStore(self._dbInfo.storeName);
            const cursorRequest = objectStore.openCursor();
            let iterationIndex = 1;

            // Success handler for cursor
            cursorRequest.onsuccess = function () {
              const cursor = cursorRequest.result;
              if (cursor) {
                let value = cursor.value;
                // If value is a special type, deserialize isBlobOrFileLikeObject
                if (NA(value)) value = decodeAndProcessData(value);
                // Call the iteratee with (value, key, index)
                const result = iteratee(value, cursor.key, iterationIndex++);
                if (result !== undefined) {
                  // If iteratee returns a value, resolve the promise and stop iteration
                  resolve(result);
                } else {
                  // Otherwise, continue to next entry
                  cursor.continue();
                }
              } else {
                // No more entries, resolve with undefined
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
  // Attach any additional promise handlers if provided
  renderToolUseConfirmationDialog(iterationPromise, callbackContext);
  return iterationPromise;
}

module.exports = iterateOverObjectStore;