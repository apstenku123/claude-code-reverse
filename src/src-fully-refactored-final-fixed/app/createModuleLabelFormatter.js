/**
 * Generates a formatter function that produces a readable label for a given file path, 
 * relative to a base directory or node_modules, for use in logging or reporting.
 *
 * @param {string} [basePath] - The base directory to use for relative path calculations. Defaults to the directory of the running script or current working directory.
 * @param {boolean} [isWindows] - Whether to use Windows path conventions. Defaults to true if path separator is '\\'.
 * @returns {(filePath: string) => string|undefined} - a function that takes a file path and returns a formatted label string, or undefined if no file path is provided.
 */
function createModuleLabelFormatter(
  basePath = process.argv[1] ? RI9.dirname(process.argv[1]) : process.cwd(),
  isWindows = mZA.sep === "\\"
) {
  // Normalize the base path for Windows if necessary
  const normalizedBasePath = isWindows ? dZA(basePath) : basePath;

  /**
   * Formats a file path into a readable label for logging/reporting.
   *
   * @param {string} filePath - The file path to format.
   * @returns {string|undefined} - The formatted label, or undefined if no filePath is provided.
   */
  return function formatModuleLabel(filePath) {
    if (!filePath) return;

    // Normalize the file path for Windows if necessary
    const normalizedFilePath = isWindows ? dZA(filePath) : filePath;

    // Always use POSIX parsing for consistent path handling
    const { dir: directory, base: baseName, ext: extension } = mZA.posix.parse(normalizedFilePath);
    let moduleBaseName = baseName;
    let moduleDirectory = directory;
    let moduleLabel;

    // Remove .js, .mjs, or .cjs extension from the base name
    if (extension === ".js" || extension === ".mjs" || extension === ".cjs") {
      moduleBaseName = baseName.slice(0, extension.length * -1);
    }

    // If directory is empty, treat as current directory
    if (!moduleDirectory) moduleDirectory = ".";

    // Check if the path is inside node_modules
    const nodeModulesIndex = moduleDirectory.lastIndexOf("/node_modules");
    if (nodeModulesIndex > -1) {
      // Format: package.subdir:module
      moduleLabel = `${moduleDirectory.slice(nodeModulesIndex + 14).replace(/\//g, ".")}:${moduleBaseName}`;
      return moduleLabel;
    }

    // If the directory is within the base path, format as relative
    if (moduleDirectory.startsWith(normalizedBasePath)) {
      // Remove the base path and replace slashes with dots
      let relativePath = moduleDirectory.slice(normalizedBasePath.length + 1).replace(/\//g, ".");
      if (relativePath) relativePath += ":";
      moduleLabel = relativePath + moduleBaseName;
      return moduleLabel;
    }

    // Otherwise, just return the module base name
    return moduleBaseName;
  };
}

module.exports = createModuleLabelFormatter;