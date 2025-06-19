/**
 * Checks if a language is associated with the given source observable.
 *
 * @param {string} sourceObservable - The identifier or object representing the source to check for language support.
 * @returns {boolean} True if a language is associated with the source, false otherwise.
 */
function hasLanguageForSource(sourceObservable) {
  // PV1.getLanguage returns a language object or null/undefined if not found
  return !!PV1.getLanguage(sourceObservable);
}

module.exports = hasLanguageForSource;