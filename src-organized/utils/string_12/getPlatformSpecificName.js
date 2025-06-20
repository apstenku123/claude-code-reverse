/**
 * Generates a platform-specific name by appending a suffix and processing isBlobOrFileLikeObject according to the current OS.
 *
 * @param {string} baseName - The base string to process (e.g., an executable or module name).
 * @param {Object} [options] - Optional configuration object.
 * @param {string} [options.suffix="nodejs"] - Suffix to append to the baseName. Defaults to "nodejs".
 * @returns {string} The processed name, formatted according to the current platform.
 * @throws {TypeError} If baseName is not a string.
 */
function getPlatformSpecificName(baseName, { suffix = "nodejs" } = {}) {
  // Validate that baseName is a string
  if (typeof baseName !== "string") {
    throw new TypeError(`Expected a string, got ${typeof baseName}`);
  }

  // Append the suffix if provided
  if (suffix) {
    baseName += `-${suffix}`;
  }

  // Determine the current platform and process the name accordingly
  if (YM1.platform === "darwin") {
    // macOS-specific processing
    return dE9(baseName);
  }
  if (YM1.platform === "win32") {
    // Windows-specific processing
    return uE9(baseName);
  }
  // Default processing for other platforms (e.g., Linux)
  return pE9(baseName);
}

module.exports = getPlatformSpecificName;
