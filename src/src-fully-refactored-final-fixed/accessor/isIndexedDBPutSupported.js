/**
 * Checks if the current browser supports IndexedDB'createInteractionAccessor objectStore.put operation
 * without aborting, specifically for Chrome version 43+ and Edge browsers.
 *
 * @param {IDBDatabase} indexedDBInstance - The IndexedDB database instance to use for the transaction.
 * @returns {Promise<boolean>} Resolves to true if supported, false otherwise.
 */
function isIndexedDBPutSupported(indexedDBInstance) {
  return new Promise(function (resolve) {
    // Start a transaction on the required object store
    const transaction = indexedDBInstance.transaction(objectStoreName, transactionMode);
    // Create a value to put in the object store
    const valueToPut = createValue([""]);
    // Attempt to put the value with a specific key
    transaction.objectStore(objectStoreName).put(valueToPut, "key");

    // If the transaction aborts, prevent default behavior and resolve false
    transaction.onabort = function (event) {
      event.preventDefault();
      event.stopPropagation();
      resolve(false);
    };

    // On successful completion, check browser version for support
    transaction.oncomplete = function () {
      // Check for Chrome version
      const chromeMatch = navigator.userAgent.match(/Chrome\/(\d+)/);
      // Check for Edge browser
      const isEdge = navigator.userAgent.match(/Edge\//);
      // Chrome 43+ or any Edge browser is considered supported
      const isSupported = isEdge || !chromeMatch || parseInt(chromeMatch[1], 10) >= 43;
      resolve(isSupported);
    };
  }).catch(function () {
    // In case of any error, resolve to false
    return false;
  });
}

module.exports = isIndexedDBPutSupported;