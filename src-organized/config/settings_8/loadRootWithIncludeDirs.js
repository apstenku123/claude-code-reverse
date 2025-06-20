/**
 * Loads a root object (hg.Root) with optional include directories and resolves all dependencies.
 *
 * @param {string} sourcePath - The path to the source file or directory to load.
 * @param {Object} [options={}] - Optional configuration object.
 * @param {string[]} [options.includeDirs] - Array of directory paths to include during loading.
 * @returns {Object} The loaded and resolved root object.
 * @throws {Error} If includeDirs is provided and is not an array.
 */
function loadRootWithIncludeDirs(sourcePath, options = {}) {
  // Create a new root object from the hg module
  const root = new hg.Root();

  // If includeDirs is specified in options, validate and apply them
  if (options.includeDirs) {
    if (!Array.isArray(options.includeDirs)) {
      throw new Error("The includeDirs option must be an array");
    }
    // overrideResolvePathWithIncludePaths presumably registers include directories with the root
    overrideResolvePathWithIncludePaths(root, options.includeDirs);
  }

  // Load the source synchronously with the given options
  const loadedRoot = root.loadSync(sourcePath, options);

  // Resolve all dependencies or references in the loaded root
  loadedRoot.resolveAll();

  return loadedRoot;
}

module.exports = loadRootWithIncludeDirs;