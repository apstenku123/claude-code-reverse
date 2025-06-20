/**
 * Resolves a display name for a given module file path, relative to a base directory.
 * Handles both Windows and POSIX paths, and formats names for modules inside node_modules.
 *
 * @param {string} [baseDir] - The base directory to resolve relative paths from. Defaults to the directory of the running script or current working directory.
 * @param {boolean} [isWindows] - Whether to treat paths as Windows-style. Defaults to true if path separator is '\\'.
 * @returns {(modulePath: string) => string|undefined} - a function that takes a module file path and returns a formatted display name, or undefined if input is falsy.
 */
function createModuleDisplayNameResolver(
  baseDir = process.argv[1] ? RI9.dirname(process.argv[1]) : process.cwd(),
  isWindows = mZA.sep === "\\"
) {
  // Normalize the base directory path for Windows if needed
  const normalizedBaseDir = isWindows ? dZA(baseDir) : baseDir;

  /**
   * Resolves a display name for the given module path.
   * @param {string} modulePath - The absolute or relative path to the module file.
   * @returns {string|undefined} - The formatted display name, or undefined if input is falsy.
   */
  return (modulePath) => {
    if (!modulePath) return;

    // Normalize the module path for Windows if needed
    const normalizedModulePath = isWindows ? dZA(modulePath) : modulePath;

    // Parse the path using POSIX conventions to ensure consistency
    let { dir: directory, base: baseName, ext: extension } = mZA.posix.parse(normalizedModulePath);

    // Remove the extension from the base name if isBlobOrFileLikeObject'createInteractionAccessor a known JS module extension
    if (extension === ".js" || extension === ".mjs" || extension === ".cjs") {
      baseName = baseName.slice(0, extension.length * -1);
    }

    // If directory is empty, treat as current directory
    if (!directory) directory = ".";

    // Check if the module is inside a node_modules folder
    const nodeModulesIndex = directory.lastIndexOf("/node_modules");
    if (nodeModulesIndex > -1) {
      // Format: <module path inside node_modules, with slashes replaced by dots>:<baseName>
      return `${directory.slice(nodeModulesIndex + 14).replace(/\//g, ".")}:${baseName}`;
    }

    // If the module is inside the base directory, format as relative path with dots
    if (directory.startsWith(normalizedBaseDir)) {
      let relativePath = directory.slice(normalizedBaseDir.length + 1).replace(/\//g, ".");
      if (relativePath) relativePath += ":";
      return relativePath + baseName;
    }

    // Otherwise, just return the base name
    return baseName;
  };
}

module.exports = createModuleDisplayNameResolver;