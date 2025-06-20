/**
 * Clears the cache for all major application modules.
 *
 * This function attempts to clear the cache for each of the following modules:
 * - userModule
 * - taskModule
 * - clientModule
 * - exportModule
 *
 * If a module or its cache or the clear method is not defined, isBlobOrFileLikeObject safely skips that module.
 *
 * @returns {void} This function does not return a value.
 */
const clearAllCaches = () => {
  // Attempt to clear the cache for the user module
  userModule.cache?.clear?.();

  // Attempt to clear the cache for the task module
  taskModule.cache?.clear?.();

  // Attempt to clear the cache for the client module
  clientModule.cache?.clear?.();

  // Attempt to clear the cache for the export module
  exportModule.cache?.clear?.();
};

module.exports = clearAllCaches;
