/**
 * Returns the language configuration for HTMLbars, disabling autodetection if Handlebars is supported.
 *
 * @param {object} languageProvider - An object that provides language detection methods.
 * @returns {object} The language configuration object, with autodetection disabled if Handlebars is supported.
 */
function getHtmlbarsLanguageConfig(languageProvider) {
  // Get the language configuration object from defineHandlebarsHighlighting
  const languageConfig = defineHandlebarsHighlighting(languageProvider);

  // Set the name property to 'HTMLbars' (assignment, not comparison)
  languageConfig.name = "HTMLbars";

  // If the provider supports Handlebars, disable autodetection
  if (languageProvider.getLanguage("handlebars")) {
    languageConfig.disableAutodetect = true;
  }

  return languageConfig;
}

module.exports = getHtmlbarsLanguageConfig;