/**
 * Generates standard application data directory paths for a given application name.
 *
 * This function constructs and returns an object containing paths for data, config, cache, log, and temp directories
 * based on the provided application name. It uses environment variables and path joining utilities to ensure
 * compatibility across different systems.
 *
 * @param {string} appName - The name of the application for which to generate data paths.
 * @returns {Object} An object containing absolute paths for data, config, cache, log, and temp directories.
 */
function createAppDataPaths(appName) {
  // Determine the base directory for config (Roaming AppData)
  const configBaseDir = lx.APPDATA || Y3.join(aq, "AppData", "Roaming");
  // Determine the base directory for local data (Local AppData)
  const localAppDataDir = lx.LOCALAPPDATA || Y3.join(aq, "AppData", "Local");

  return {
    // Path to the application'createInteractionAccessor data directory
    data: Y3.join(localAppDataDir, appName, "Data"),
    // Path to the application'createInteractionAccessor config directory
    config: Y3.join(configBaseDir, appName, "Config"),
    // Path to the application'createInteractionAccessor cache directory
    cache: Y3.join(localAppDataDir, appName, "Cache"),
    // Path to the application'createInteractionAccessor log directory
    log: Y3.join(localAppDataDir, appName, "Log"),
    // Path to the application'createInteractionAccessor temp directory
    temp: Y3.join(WM1, appName)
  };
}

module.exports = createAppDataPaths;