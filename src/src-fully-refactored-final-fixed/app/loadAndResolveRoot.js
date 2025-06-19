/**
 * Loads a root object from the provided source and configuration, optionally including additional directories,
 * and resolves all dependencies within the loaded root object.
 *
 * @param {string} sourcePath - The path or identifier of the source to load.
 * @param {Object} [options={}] - Optional configuration object.
 * @param {string[]} [options.includeDirs] - Optional array of directory paths to include during loading.
 * @returns {Object} The loaded and resolved root object.
 * @throws {Error} If options.includeDirs is provided and is not an array.
 */
function loadAndResolveRoot(sourcePath, options = {}) {
  // Create a new root object using the external hg.Root constructor
  const root = new hg.Root();

  // If includeDirs is specified in options, validate and process them
  if (options.includeDirs) {
    if (!Array.isArray(options.includeDirs)) {
      throw new Error("The includeDirs option must be an array");
    }
    // overrideResolvePathWithIncludePaths is assumed to add the includeDirs to the root object
    overrideResolvePathWithIncludePaths(root, options.includeDirs);
  }

  // Load the source synchronously into the root object
  const loadedRoot = root.loadSync(sourcePath, options);

  // Resolve all dependencies or references within the loaded root
  loadedRoot.resolveAll();

  // Return the fully loaded and resolved root object
  return loadedRoot;
}

module.exports = loadAndResolveRoot;