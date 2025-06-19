/**
 * Creates and returns a new database context object with default values.
 *
 * @returns {Object} An object representing the initial state of the database context.
 * @property {Array} forages - An array to store forage items (initially empty).
 * @property {Object|null} databaseInstance - The database instance (initially null).
 * @property {Promise|null} databaseReadyPromise - Promise that resolves when the database is ready (initially null).
 * @property {Array} deferredOperations - An array to store operations deferred until the database is ready (initially empty).
 */
function createDatabaseContext() {
  return {
    // Stores forage items or related data
    forages: [],

    // Holds the database instance once initialized
    databaseInstance: null,

    // Promise that resolves when the database is ready for operations
    databaseReadyPromise: null,

    // Operations to be executed once the database is ready
    deferredOperations: []
  };
}

module.exports = createDatabaseContext;