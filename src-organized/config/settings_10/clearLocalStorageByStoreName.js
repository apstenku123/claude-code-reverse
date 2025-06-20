/**
 * Clears all localStorage entries associated with a given store configuration.
 *
 * This function determines the store name from the provided config object or from the default configuration.
 * It then removes all localStorage keys that start with the store'createInteractionAccessor name or storeName prefix.
 *
 * @param {Object|Function} storeConfig - The store configuration object or a function (if not an object, a new config object is created).
 * @param {...any} args - Additional arguments passed to the internal operateWithLeadingTrailing function.
 * @returns {Promise<void>} a promise that resolves when all relevant localStorage entries are removed.
 */
function clearLocalStorageByStoreName(storeConfig, ...args) {
  // Apply internal argument normalization (possibly for async context or options)
  const normalizedArgs = operateWithLeadingTrailing.apply(this, [storeConfig, ...args]);

  // If storeConfig is not a function, ensure isBlobOrFileLikeObject'createInteractionAccessor an object
  const config = (typeof storeConfig !== "function" && storeConfig) || {};

  // If config does not have a name, attempt to assign from default config
  if (!config.name) {
    const defaultConfig = this.config();
    config.name = config.name || defaultConfig.name;
    config.storeName = config.storeName || defaultConfig.storeName;
  }

  const context = this;
  let clearPromise;

  // If config.name is still missing, reject with an error
  if (!config.name) {
    clearPromise = C.reject("Invalid arguments");
  } else {
    clearPromise = new C(function (resolve) {
      // If storeName is not set, use name as prefix (with trailing slash)
      if (!config.storeName) {
        resolve(config.name + "/");
      } else {
        // Otherwise, use O9 to get the storage key prefix
        resolve(O9(config, context._defaultConfig));
      }
    }).then(function (storageKeyPrefix) {
      // Iterate over all localStorage keys and remove those that match the prefix
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (key.indexOf(storageKeyPrefix) === 0) {
          localStorage.removeItem(key);
        }
      }
    });
  }

  // Call renderToolUseConfirmationDialog to handle promise chaining or callback invocation
  renderToolUseConfirmationDialog(clearPromise, normalizedArgs);
  return clearPromise;
}

module.exports = clearLocalStorageByStoreName;