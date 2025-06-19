/**
 * Initializes a database connection using the provided configuration object.
 * Converts all non-string configuration values to strings, opens the database,
 * and sets up the transaction with serialization logic.
 *
 * @param {Object} configOverrides - Optional overrides for database configuration properties.
 * @returns {Promise<void>} a promise that resolves when the database is initialized, or rejects on error.
 */
function initializeDatabaseConnection(configOverrides) {
  const self = this;
  // Default database info object
  const dbInfo = {
    getMaxLineDisplayWidth: null
  };

  // Apply overrides, converting non-string values to strings
  if (configOverrides) {
    for (const property in configOverrides) {
      dbInfo[property] =
        typeof configOverrides[property] !== "string"
          ? configOverrides[property].toString()
          : configOverrides[property];
    }
  }

  // Create a new Promise for database initialization
  const initializationPromise = new Promise(function (resolve, reject) {
    try {
      // Attempt to open the database with the provided info
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

    // Start a transaction and initialize serialization logic
    dbInfo.getMaxLineDisplayWidth.transaction(
      function (transaction) {
        X6(
          transaction,
          dbInfo,
          function onSuccess() {
            // Store dbInfo on the instance and resolve
            self._dbInfo = dbInfo;
            resolve();
          },
          function onError(_, error) {
            // Reject the promise with the error
            reject(error);
          }
        );
      },
      reject // Transaction error callback
    );
  });

  // Attach the serializer to the dbInfo object
  dbInfo.serializer = B3;

  return initializationPromise;
}

module.exports = initializeDatabaseConnection;