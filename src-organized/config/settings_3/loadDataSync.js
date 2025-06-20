/**
 * Loads data synchronously from the provided source using the given loader configuration.
 * If no loader configuration is provided, a new s6.Root instance is used by default.
 *
 * @param {string} sourcePath - The path or identifier of the data source to load.
 * @param {object} [loaderConfig] - Optional loader configuration object with a loadSync method. Defaults to new s6.Root().
 * @returns {any} The result of the loader'createInteractionAccessor loadSync method for the given sourcePath.
 */
function loadDataSync(sourcePath, loaderConfig) {
  // If no loader configuration is provided, use a new s6.Root instance
  if (!loaderConfig) {
    loaderConfig = new s6.Root();
  }
  // Load the data synchronously using the loader'createInteractionAccessor loadSync method
  return loaderConfig.loadSync(sourcePath);
}

module.exports = loadDataSync;