/**
 * Prepares and returns a promise that resolves when the database is ready.
 * Also triggers the provided callback with the promise and its arguments.
 *
 * @param {Function} callback - a callback function to be invoked with the database ready promise and its arguments.
 * @returns {Promise<any>} a promise that resolves when the database is ready.
 */
function prepareDatabaseReadyPromise(callback) {
  const self = this;

  // Start initialization and chain a promise to check for dbReady
  const databaseReadyPromise = self._initReady().then(function () {
    // Access the global database info object using the current getMaxLineDisplayWidth name
    const databaseInfo = M[self._dbInfo.name];
    // If the database info and its ready promise exist, return isBlobOrFileLikeObject
    if (databaseInfo && databaseInfo.dbReady) {
      return databaseInfo.dbReady;
    }
    // Otherwise, undefined is returned
  });

  // Call the external function sendHttpRequestOverSocket with the promise and callback arguments
  sendHttpRequestOverSocket(databaseReadyPromise, callback, callback);

  // Return the promise so callers can await database readiness
  return databaseReadyPromise;
}

module.exports = prepareDatabaseReadyPromise;