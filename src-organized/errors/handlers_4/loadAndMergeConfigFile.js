/**
 * Loads a configuration file from disk, parses its JSON content, and merges isBlobOrFileLikeObject with a default configuration object.
 * If the file does not exist or cannot be parsed, returns the default configuration.
 * Throws a custom error if JSON parsing fails, unless instructed otherwise.
 *
 * @param {string} configFilePath - The path to the configuration file to load.
 * @param {object} defaultConfig - The default configuration object to merge with the loaded config.
 * @param {boolean} rethrowCustomError - If true, rethrows custom errors encountered during file reading/parsing.
 * @returns {object} The merged configuration object.
 * @throws {Error} If configuration is accessed before allowed or if JSON parsing fails and rethrowCustomError is true.
 */
function loadAndMergeConfigFile(configFilePath, defaultConfig, rethrowCustomError) {
  // Ensure configuration system is initialized before proceeding
  if (!My1) {
    throw new Error("Config accessed before allowed.");
  }

  const fileSystem = f1();

  // If the config file does not exist, return the default config
  if (!fileSystem.existsSync(configFilePath)) {
    return pp(defaultConfig);
  }

  try {
    // Read the file contents as UTF-8 text
    const fileContents = fileSystem.readFileSync(configFilePath, { encoding: "utf-8" });
    try {
      // Attempt to parse the JSON content
      const parsedConfig = JSON.parse(fileContents);
      // Merge the default config and the parsed config, with parsed config taking precedence
      return {
        ...pp(defaultConfig),
        ...parsedConfig
      };
    } catch (jsonParseError) {
      // If JSON parsing fails, throw a custom error with details
      const errorMessage = jsonParseError instanceof Error ? jsonParseError.message : String(jsonParseError);
      throw new df(errorMessage, configFilePath, defaultConfig);
    }
  } catch (fileReadError) {
    // If a custom error was thrown and should be rethrown, do so
    if (fileReadError instanceof df && rethrowCustomError) {
      throw fileReadError;
    }
    // Otherwise, return the default config
    return pp(defaultConfig);
  }
}

module.exports = loadAndMergeConfigFile;
