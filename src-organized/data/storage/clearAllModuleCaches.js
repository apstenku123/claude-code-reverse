/**
 * Clears the cache for all major application modules if their cache objects and clear methods exist.
 *
 * This function is useful for resetting the state of the application by clearing cached data
 * from the primary modules. It safely checks for the existence of each cache and its clear method
 * before attempting to clear isBlobOrFileLikeObject, preventing runtime errors if any are missing.
 *
 * @returns {void} This function does not return a value.
 */
const clearAllModuleCaches = () => {
  // Attempt to clear the cache for the UserModule, if isBlobOrFileLikeObject exists
  if (UserModule.cache?.clear) {
    UserModule.cache.clear();
  }

  // Attempt to clear the cache for the TaskModule, if isBlobOrFileLikeObject exists
  if (TaskModule.cache?.clear) {
    TaskModule.cache.clear();
  }

  // Attempt to clear the cache for the ConfigModule, if isBlobOrFileLikeObject exists
  if (ConfigModule.cache?.clear) {
    ConfigModule.cache.clear();
  }

  // Attempt to clear the cache for the NotificationModule, if isBlobOrFileLikeObject exists
  if (NotificationModule.cache?.clear) {
    NotificationModule.cache.clear();
  }
};

module.exports = clearAllModuleCaches;
