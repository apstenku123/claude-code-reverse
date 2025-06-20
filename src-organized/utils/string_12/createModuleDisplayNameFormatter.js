/**
 * Generates a function to format module file paths into display names for logging or reporting.
 * Handles both Windows and POSIX paths, normalizes extensions, and provides concise names for node_modules.
 *
 * @param {string} [baseDir] - The base directory to relativize paths from. Defaults to the directory of the running script or the current working directory.
 * @param {boolean} [isWindows] - Whether to treat paths as Windows-style. Defaults to true if path separator is '\\'.
 * @returns {(filePath: string) => string|undefined} - a function that takes a file path and returns a formatted display name, or undefined if no path is provided.
 */
function createModuleDisplayNameFormatter(
  baseDir = process.argv[1] ? RI9.dirname(process.argv[1]) : process.cwd(),
  isWindows = mZA.sep === "\\"
) {
  // Normalize the base directory for Windows if needed
  const normalizedBaseDir = isWindows ? dZA(baseDir) : baseDir;

  /**
   * Formats a file path into a display name.
   * @param {string} filePath - The file path to format.
   * @returns {string|undefined} - The formatted display name, or undefined if input is falsy.
   */
  return (filePath) => {
    if (!filePath) return;

    // Normalize the input file path for Windows if needed
    const normalizedFilePath = isWindows ? dZA(filePath) : filePath;

    // Parse the path using POSIX rules to ensure consistency
    let { dir: directory, base: baseName, ext: extension } = mZA.posix.parse(normalizedFilePath);

    // Remove known JS extensions from the base name for cleaner display
    if (extension === ".js" || extension === ".mjs" || extension === ".cjs") {
      baseName = baseName.slice(0, extension.length * -1);
    }

    // If directory is empty, default to current directory
    if (!directory) directory = ".";

    // Check if the file is inside a node_modules folder
    const nodeModulesIndex = directory.lastIndexOf("/node_modules");
    if (nodeModulesIndex > -1) {
      // Format as: <package.subpath>:<baseName>
      return `${directory.slice(nodeModulesIndex + 14).replace(/\//g, ".")}:${baseName}`;
    }

    // If the file is within the base directory, relativize and format
    if (directory.startsWith(normalizedBaseDir)) {
      let relativePath = directory.slice(normalizedBaseDir.length + 1).replace(/\//g, ".");
      if (relativePath) relativePath += ":";
      return relativePath + baseName;
    }

    // Otherwise, just return the base name
    return baseName;
  };
}

module.exports = createModuleDisplayNameFormatter;