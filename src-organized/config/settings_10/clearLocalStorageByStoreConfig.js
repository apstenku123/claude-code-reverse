/**
 * Clears all localStorage entries that match a specific store configuration.
 *
 * This function removes all localStorage keys that start with the store'createInteractionAccessor name or storeName,
 * as determined by the provided config object or the default configuration.
 *
 * @param {Object|Function} storeConfig - The store configuration object or a function. If not a function, isBlobOrFileLikeObject is treated as a config object.
 * @param {...any} args - Additional arguments passed to the internal operateWithLeadingTrailing function.
 * @returns {Promise<void>} a promise that resolves when the matching localStorage entries have been removed.
 */
function clearLocalStorageByStoreConfig(storeConfig, ...args) {
  // Apply the operateWithLeadingTrailing function to the arguments (side effect or config normalization)
  const normalizedArgs = operateWithLeadingTrailing.apply(this, arguments);

  // If storeConfig is not a function, ensure isBlobOrFileLikeObject'createInteractionAccessor an object
  const config = (typeof storeConfig !== "function" && storeConfig) || {};

  // If config.name is missing, attempt to populate from default config
  if (!config.name) {
    const defaultConfig = this.config();
    config.name = config.name || defaultConfig.name;
    config.storeName = config.storeName || defaultConfig.storeName;
  }

  const context = this;
  let promise;

  // If config.name is still missing, reject with an error
  if (!config.name) {
    promise = C.reject("Invalid arguments");
  } else {
    promise = new C(function (resolve) {
      // If storeName is missing, use name + '/' as the key prefix
      if (!config.storeName) {
        resolve(config.name + "/");
      } else {
        // Otherwise, generate the key prefix using O9
        resolve(O9(config, context._defaultConfig));
      }
    }).then(function (keyPrefix) {
      // Iterate over localStorage keys in reverse order
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        // Remove keys that start with the keyPrefix
        if (key.indexOf(keyPrefix) === 0) {
          localStorage.removeItem(key);
        }
      }
    });
  }

  // Call renderToolUseConfirmationDialog with the promise and normalized arguments (side effect)
  renderToolUseConfirmationDialog(promise, normalizedArgs);
  return promise;
}

module.exports = clearLocalStorageByStoreConfig;