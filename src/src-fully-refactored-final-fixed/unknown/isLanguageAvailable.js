/**
 * Checks if a language is available for the given language code.
 *
 * @param {string} languageCode - The code of the language to check (e.g., 'en', 'fr').
 * @returns {boolean} True if the language is available, false otherwise.
 */
function isLanguageAvailable(languageCode) {
  // PV1.getLanguage returns a language object if available, otherwise undefined/null
  // Double negation (!!) converts the result to a boolean
  return !!PV1.getLanguage(languageCode);
}

module.exports = isLanguageAvailable;