/**
 * Retrieves the language name associated with a given observable configuration.
 *
 * @param {any} sourceObservable - The observable or configuration object to extract the language from.
 * @returns {string} The name of the language if found, otherwise 'unknown'.
 */
function getLanguageNameFromObservable(sourceObservable) {
  // Extract configuration or identifier from the observable
  const config = iO1(sourceObservable);

  // If extraction fails, return 'unknown'
  if (!config) {
    return "unknown";
  }

  // Remove the first character (possibly a prefix) and attempt to get the language name
  const languageName = NxA.getLanguage(config.slice(1))?.name ?? "unknown";
  return languageName;
}

module.exports = getLanguageNameFromObservable;