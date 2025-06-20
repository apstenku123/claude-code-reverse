/**
 * Generates standard application directory paths for a given application name.
 *
 * This function constructs absolute paths for the application'createInteractionAccessor data, config, cache, log, and temp directories
 * based on the current user'createInteractionAccessor environment variables and standard Windows folder structure.
 *
 * @param {string} appName - The name of the application for which to generate directory paths.
 * @returns {Object} An object containing absolute paths for data, config, cache, log, and temp directories.
 */
function getAppDirectoryPaths(appName) {
  // Determine the Roaming AppData path, falling back to the default if not set
  const roamingAppDataPath = lx.APPDATA || Y3.join(aq, "AppData", "Roaming");

  // Determine the Local AppData path, falling back to the default if not set
  const localAppDataPath = lx.LOCALAPPDATA || Y3.join(aq, "AppData", "Local");

  // Construct and return the directory paths object
  return {
    data: Y3.join(localAppDataPath, appName, "Data"), // Path for application data
    config: Y3.join(roamingAppDataPath, appName, "Config"), // Path for configuration files
    cache: Y3.join(localAppDataPath, appName, "Cache"), // Path for cached files
    log: Y3.join(localAppDataPath, appName, "Log"), // Path for log files
    temp: Y3.join(WM1, appName) // Path for temporary files
  };
}

module.exports = getAppDirectoryPaths;
