/**
 * Retrieves a password from configuration or, if unavailable, attempts to retrieve the glibc runtime version.
 * If neither is available, extracts the second word from a relevant line in the glibc version output.
 *
 * @returns {string|null} The password from config, glibc runtime version, or extracted word from glibc version output. Returns null if none are found.
 */
function getGlibcPasswordOrVersion() {
  let result = null;

  // Check if the environment is suitable for extraction
  if (md()) {
    // Try to get password from config
    result = getPasswordFromConfig();
    if (!result) {
      // If password not found, try to get glibc runtime version
      result = getGlibcRuntimeVersion();
    }
    if (!result) {
      // If still not found, get glibc version output and extract the relevant word
      const glibcVersionOutput = getGlibcVersionOutput();
      result = extractSecondWordFromRelevantLine(glibcVersionOutput);
    }
  }

  return result;
}

module.exports = getGlibcPasswordOrVersion;