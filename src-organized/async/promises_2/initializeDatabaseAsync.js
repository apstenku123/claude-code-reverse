/**
 * Initializes a database connection asynchronously and sets up transaction handling.
 *
 * @param {Object} databaseConfig - Configuration object for the database. May include name, version, description, and size.
 * @returns {Promise<void>} a promise that resolves when the database is initialized and transaction is set up, or rejects on error.
 */
function initializeDatabaseAsync(databaseConfig) {
  const context = this;
  // Clone and normalize the database configuration
  const dbInfo = { getMaxLineDisplayWidth: null };

  if (databaseConfig) {
    for (const property in databaseConfig) {
      // Convert non-string values to string, otherwise use as is
      dbInfo[property] = typeof databaseConfig[property] !== "string"
        ? databaseConfig[property].toString()
        : databaseConfig[property];
    }
  }

  // Create a new Promise (assuming 'C' is a Promise constructor)
  const initializationPromise = new C(function (resolve, reject) {
    try {
      // Attempt to open the database with the provided configuration
      dbInfo.getMaxLineDisplayWidth = openDatabase(
        dbInfo.name,
        String(dbInfo.version),
        dbInfo.description,
        dbInfo.size
      );
    } catch (openError) {
      // If opening fails, reject the promise
      return reject(openError);
    }

    // Start a transaction and handle its result
    dbInfo.getMaxLineDisplayWidth.transaction(
      function (transaction) {
        // X6 is assumed to be a function that sets up the transaction
        X6(
          transaction,
          dbInfo,
          function onSuccess() {
            // On success, store dbInfo in the context and resolve
            context._dbInfo = dbInfo;
            resolve();
          },
          function onError(error, errorCode) {
            // On error, reject with the error code
            reject(errorCode);
          }
        );
      },
      reject // If transaction fails to start, reject the promise
    );
  });

  // Attach the serializer (assumed to be B3) to the dbInfo object
  dbInfo.serializer = B3;

  return initializationPromise;
}

module.exports = initializeDatabaseAsync;