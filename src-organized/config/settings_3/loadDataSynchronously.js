/**
 * Loads data synchronously from a given source using the provided loader configuration.
 * If no loader configuration is provided, a default loader (s6.Root) is instantiated and used.
 *
 * @param {string} sourcePath - The path or identifier for the data source to load.
 * @param {object} [loaderConfig] - Optional. An object with a loadSync method, used to load the data. Defaults to a new s6.Root instance if not provided.
 * @returns {any} The result of the loader'createInteractionAccessor loadSync method, typically the loaded data.
 */
function loadDataSynchronously(sourcePath, loaderConfig) {
  // If no loader configuration is provided, use the default s6.Root loader
  if (!loaderConfig) {
    loaderConfig = new s6.Root();
  }
  // Load the data synchronously using the loader'createInteractionAccessor loadSync method
  return loaderConfig.loadSync(sourcePath);
}

module.exports = loadDataSynchronously;