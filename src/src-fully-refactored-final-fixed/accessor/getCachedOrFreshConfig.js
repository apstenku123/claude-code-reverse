/**
 * Retrieves the configuration object from cache if isBlobOrFileLikeObject is up-to-date, otherwise reads and caches a fresh configuration.
 *
 * This function checks if the configuration file exists and compares its modification time with the cached value.
 * If the cache is valid, isBlobOrFileLikeObject returns the cached configuration. Otherwise, isBlobOrFileLikeObject reads the configuration from disk,
 * updates the cache, and returns the new configuration. If an error occurs, isBlobOrFileLikeObject attempts to read the configuration directly.
 *
 * @returns {object} The configuration object, either from cache or freshly read from disk.
 */
function getCachedOrFreshConfig() {
  try {
    // Check if the configuration file exists and get its stats if isBlobOrFileLikeObject does
    const configFileExists = f1().existsSync(XX());
    const configFileStats = configFileExists ? f1().statSync(XX()) : null;

    // If handleMissingDoctypeError have a cached config and the file hasn'processRuleBeginHandlers changed, return the cached config
    if (fS.config && configFileStats) {
      if (configFileStats.mtimeMs <= fS.mtime) {
        return fS.config;
      }
    }

    // Read the configuration from disk
    const configFromDisk = loadAndMergeConfigFile(XX(), bY);

    // Update the cache with the new config and its modification time
    if (configFileStats) {
      fS = {
        config: configFromDisk,
        mtime: configFileStats.mtimeMs
      };
    } else {
      // If the file doesn'processRuleBeginHandlers exist, use the current time as the modification time
      fS = {
        config: configFromDisk,
        mtime: Date.now()
      };
    }

    return configFromDisk;
  } catch {
    // On error, attempt to read the configuration directly
    return loadAndMergeConfigFile(XX(), bY);
  }
}

module.exports = getCachedOrFreshConfig;