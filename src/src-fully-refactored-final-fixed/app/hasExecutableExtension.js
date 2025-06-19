/**
 * Determines if a given file path ends with an executable extension based on the provided configuration or environment variable.
 *
 * @param {string} filePath - The file path to check for an executable extension.
 * @param {Object} options - Configuration object that may contain a custom 'pathExt' property.
 * @param {string} [options.pathExt] - Optional semicolon-separated list of executable extensions (e.g., '.EXE;.BAT'). If not provided, uses process.env.PATHEXT.
 * @returns {boolean} True if the file path ends with a recognized executable extension, or if no extensions are defined; otherwise, false.
 */
function hasExecutableExtension(filePath, options) {
  // Determine the list of executable extensions, either from options or environment
  const pathExtList = options.pathExt !== undefined ? options.pathExt : process.env.PATHEXT;
  if (!pathExtList) {
    // If no extensions are defined, treat all files as executable
    return true;
  }
  // Split the extensions into an array
  const extensions = pathExtList.split(";");
  // If the list contains an empty string, treat all files as executable
  if (extensions.indexOf("") !== -1) {
    return true;
  }
  // Check if the file path ends with any of the executable extensions
  for (let i = 0; i < extensions.length; i++) {
    const extension = extensions[i].toLowerCase();
    if (
      extension &&
      filePath.substr(-extension.length).toLowerCase() === extension
    ) {
      return true;
    }
  }
  // No matching extension found
  return false;
}

module.exports = hasExecutableExtension;
