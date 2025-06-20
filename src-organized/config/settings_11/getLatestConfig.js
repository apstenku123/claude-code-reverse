/**
 * Retrieves the latest configuration from the file system, using caching to avoid unnecessary reads.
 * If the configuration file has not changed since the last read, returns the cached config.
 * Otherwise, reads and parses the config file, updates the cache, and returns the new config.
 * In case of error, attempts to read and parse the config file directly.
 *
 * @returns {object} The latest configuration object.
 */
function getLatestConfig() {
  try {
    // Get the file stats if the config file exists, otherwise null
    const fileSystem = getBm9Value();
    const configFilePath = XX();
    const fileExists = fileSystem.existsSync(configFilePath);
    const fileStats = fileExists ? fileSystem.statSync(configFilePath) : null;

    // If handleMissingDoctypeError have a cached config and the file has not changed, return the cached config
    if (fS.config && fileStats) {
      if (fileStats.mtimeMs <= fS.mtime) {
        return fS.config;
      }
    }

    // Read and parse the config file
    const parsedConfig = loadAndMergeConfigFile(configFilePath, bY);

    // Update the cache with the new config and modification time
    if (fileStats) {
      fS = {
        config: parsedConfig,
        mtime: fileStats.mtimeMs
      };
    } else {
      fS = {
        config: parsedConfig,
        mtime: Date.now()
      };
    }

    return parsedConfig;
  } catch {
    // On error, attempt to read and parse the config file directly
    return loadAndMergeConfigFile(XX(), bY);
  }
}

module.exports = getLatestConfig;