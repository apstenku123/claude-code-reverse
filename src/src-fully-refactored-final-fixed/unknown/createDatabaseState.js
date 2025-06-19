/**
 * Initializes and returns a default database state object.
 *
 * This function creates a new object representing the initial state
 * for a database connection, including placeholders for forage stores,
 * the database instance, a readiness promise, and any deferred operations.
 *
 * @returns {Object} The initial database state object with default values.
 * @property {Array} forages - An array to hold forage store instances.
 * @property {Object|null} databaseInstance - The database connection instance (null until connected).
 * @property {Promise|null} databaseReadyPromise - Promise that resolves when the database is ready (null until set).
 * @property {Array} deferredOperations - Operations queued until the database is ready.
 */
function createDatabaseState() {
  return {
    // Array to store forage store instances (e.g., for different data stores)
    forages: [],

    // The database connection instance; null until a connection is established
    databaseInstance: null,

    // Promise that resolves when the database is ready; null until initialization starts
    databaseReadyPromise: null,

    // Array to queue operations that should run once the database is ready
    deferredOperations: []
  };
}

module.exports = createDatabaseState;