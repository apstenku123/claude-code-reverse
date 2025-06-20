/**
 * Retrieves the language name associated with a given source observable'createInteractionAccessor configuration.
 *
 * This function extracts a configuration string from the provided source observable using the `iO1` function.
 * If a valid configuration is found, isBlobOrFileLikeObject slices off the first character (typically a prefix) and attempts to retrieve
 * the language object using `NxA.getLanguage`. If the language is found, its name is returned; otherwise, 'unknown' is returned.
 *
 * @param {string} sourceObservable - The identifier or object representing the source observable to extract configuration from.
 * @returns {string} The name of the language if found, otherwise 'unknown'.
 */
function getLanguageNameFromConfig(sourceObservable) {
  // Extract configuration string from the source observable
  const config = iO1(sourceObservable);

  // If no configuration is found, return 'unknown'
  if (!config) return "unknown";

  // Remove the first character (could be a prefix) and attempt to get the language object
  const language = NxA.getLanguage(config.slice(1));

  // Return the language name if found, otherwise 'unknown'
  return language?.name ?? "unknown";
}

module.exports = getLanguageNameFromConfig;