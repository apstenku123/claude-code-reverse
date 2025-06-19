/**
 * Initializes the database information object by copying properties from the provided config,
 * setting the keyPrefix, and assigning the serializer. Returns a resolved or rejected promise
 * based on the result of the environment check.
 *
 * @param {Object} config - The configuration object containing database info properties.
 * @returns {Promise<void>} Resolves if initialization succeeds, rejects otherwise.
 */
function initializeDatabaseInfo(config) {
  const context = this;
  const dbInfo = {};

  // Copy all properties from config to dbInfo if config is provided
  if (config) {
    for (const propertyName in config) {
      dbInfo[propertyName] = config[propertyName];
    }
  }

  // Set the keyPrefix using the O9 function and the default config
  dbInfo.keyPrefix = O9(config, context._defaultConfig);

  // If the environment check fails, return a rejected promise
  if (!a7()) {
    return C.reject();
  }

  // Assign dbInfo to the instance and set the serializer
  context._dbInfo = dbInfo;
  dbInfo.serializer = B3;

  // Return a resolved promise to indicate successful initialization
  return C.resolve();
}

module.exports = initializeDatabaseInfo;