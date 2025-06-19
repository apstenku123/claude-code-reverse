/**
 * Loads a root object from the given source, optionally including additional directories.
 *
 * @param {string} sourcePath - The path or identifier to load the root from.
 * @param {Object} [options={}] - Optional configuration object.
 * @param {string[]} [options.includeDirs] - Array of directory paths to include during loading.
 * @returns {Object} The loaded and resolved root object.
 * @throws {Error} If includeDirs is provided and is not an array.
 */
function loadRootWithIncludes(sourcePath, options = {}) {
  // Create a new root object using the hg.Root constructor
  const root = new hg.Root();

  // If includeDirs is specified in options, validate and apply them
  if (options.includeDirs) {
    if (!Array.isArray(options.includeDirs)) {
      throw new Error("The includeDirs option must be an array");
    }
    // Add the include directories to the root object
    overrideResolvePathWithIncludePaths(root, options.includeDirs);
  }

  // Load the root object synchronously with the provided source and options
  const loadedRoot = root.loadSync(sourcePath, options);

  // Resolve all dependencies or references in the loaded root object
  loadedRoot.resolveAll();

  return loadedRoot;
}

module.exports = loadRootWithIncludes;