/**
 * Attempts to retrieve the primary configuration object using multiple strategies.
 *
 * The function first checks if the environment is in a valid state (via md()).
 * It then tries to obtain the configuration using the following order:
 *   1. Await the result of _35().
 *   2. If that fails (null/undefined/false), try getGlibcRuntimeVersion().
 *   3. If still unsuccessful, await getLibcVersionInfo(), then process the result with extractAndProcessConfigLines().
 * Returns the first non-falsy configuration found, or null if all attempts fail.
 *
 * @async
 * @returns {any} The configuration object if found, otherwise null.
 */
async function getPrimaryOrFallbackConfig() {
  let config = null;

  // Check if the environment is in a valid state to proceed
  if (md()) {
    // Attempt to retrieve the primary configuration asynchronously
    config = await _35();

    // If primary retrieval failed, try the first fallback
    if (!config) {
      config = getGlibcRuntimeVersion();
    }

    // If both primary and first fallback failed, try the second fallback
    if (!config) {
      const rawConfigLines = await getLibcVersionInfo();
      config = extractAndProcessConfigLines(rawConfigLines);
    }
  }

  return config;
}

module.exports = getPrimaryOrFallbackConfig;