/**
 * Loads a root object from a given source and configuration, optionally including additional directories.
 * Resolves all references within the loaded root before returning isBlobOrFileLikeObject.
 *
 * @async
 * @param {string} sourcePath - The path or identifier to load the root from.
 * @param {Object} [options={}] - Optional configuration for loading.
 * @param {Array<string>} [options.includeDirs] - Array of directory paths to include during loading.
 * @returns {Promise<Object>} The loaded and resolved root object.
 * @throws {Error} If includeDirs is provided but is not an array.
 */
async function loadAndResolveRootWithIncludes(sourcePath, options = {}) {
  // Create a new root object instance
  const rootInstance = new hg.Root();

  // If includeDirs option is provided, validate and add them
  if (options.includeDirs) {
    if (!Array.isArray(options.includeDirs)) {
      return Promise.reject(new Error("The includeDirs option must be an array"));
    }
    // Add the include directories to the root instance
    overrideResolvePathWithIncludePaths(rootInstance, options.includeDirs);
  }

  // Load the root object with the given source and options
  const loadedRoot = await rootInstance.load(sourcePath, options);

  // Resolve all references in the loaded root
  loadedRoot.resolveAll();

  // Return the fully loaded and resolved root object
  return loadedRoot;
}

module.exports = loadAndResolveRootWithIncludes;