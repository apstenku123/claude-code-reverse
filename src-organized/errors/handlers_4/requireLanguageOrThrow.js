/**
 * Attempts to require (load) a language by its name. If the language is not loaded, throws an error.
 * Logs deprecation warnings indicating that this function will be removed in a future version.
 *
 * @param {string} languageName - The name of the language to require.
 * @returns {object} The loaded language module if available.
 * @throws {Error} If the language is not loaded.
 */
function requireLanguageOrThrow(languageName) {
  // Log deprecation warnings (only once per unique message)
  logDeprecationOnce(
    "10.4.0",
    "requireLanguage will be removed entirely in v11."
  );
  logDeprecationOnce(
    "10.4.0",
    "Please see https://github.com/highlightjs/highlight.js/pull/2844"
  );

  // Attempt to load the requested language
  const loadedLanguage = loadLanguage(languageName);
  if (loadedLanguage) {
    return loadedLanguage;
  }

  // If the language is not loaded, throw an error with a descriptive message
  throw new Error(
    "The '{}' language is required, but not loaded.".replace("{}", languageName)
  );
}

module.exports = requireLanguageOrThrow;