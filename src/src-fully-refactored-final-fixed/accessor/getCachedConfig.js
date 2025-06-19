/**
 * Retrieves and caches configuration data from a file, using file modification time to determine cache validity.
 * If the file has not changed since the last read, returns the cached configuration.
 * Otherwise, reads and parses the configuration file, updates the cache, and returns the new configuration.
 * If an error occurs, attempts to read and parse the configuration file directly.
 *
 * @returns {object} The configuration object read from the file or cache.
 */
function getCachedConfig() {
  try {
    // Get file stats if the file exists, otherwise null
    const fileStats = f1().existsSync(XX()) ? f1().statSync(XX()) : null;

    // If handleMissingDoctypeError have a cached config and the file has not changed, return the cached config
    if (fS.config && fileStats) {
      if (fileStats.mtimeMs <= fS.mtime) {
        return fS.config;
      }
    }

    // Read and parse the configuration file
    const config = loadAndMergeConfigFile(XX(), bY);

    // Update the cache with the new config and modification time
    if (fileStats) {
      fS = {
        config: config,
        mtime: fileStats.mtimeMs
      };
    } else {
      // If file stats are unavailable, use the current time as the modification time
      fS = {
        config: config,
        mtime: Date.now()
      };
    }

    return config;
  } catch {
    // On error, attempt to read and parse the configuration file directly
    return loadAndMergeConfigFile(XX(), bY);
  }
}

module.exports = getCachedConfig;