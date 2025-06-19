/**
 * Returns commonly used application directory paths for the given app name.
 *
 * @param {string} appName - The name of the application.
 * @returns {Object} An object containing paths for data, config, cache, log, and temp directories.
 */
const getAppDirectoryPaths = (appName) => {
  // Construct the base Library path
  const libraryPath = Y3.join(aq, "Library");

  return {
    // Path to Application Support directory for the app
    data: Y3.join(libraryPath, "Application Support", appName),
    // Path to Preferences directory for the app
    config: Y3.join(libraryPath, "Preferences", appName),
    // Path to Caches directory for the app
    cache: Y3.join(libraryPath, "Caches", appName),
    // Path to Logs directory for the app
    log: Y3.join(libraryPath, "Logs", appName),
    // Path to temporary files directory for the app
    temp: Y3.join(WM1, appName)
  };
};

module.exports = getAppDirectoryPaths;
