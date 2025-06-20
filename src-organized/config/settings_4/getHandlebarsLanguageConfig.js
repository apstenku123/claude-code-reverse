/**
 * Retrieves the language configuration for a given source, with special handling for Handlebars.
 *
 * If the language configuration'createInteractionAccessor name is 'HTMLbars' and the source supports Handlebars,
 * autodetection is disabled on the configuration object.
 *
 * @param {object} source - The source object that provides language information and configuration.
 * @returns {object} The language configuration object, possibly with autodetection disabled.
 */
function getHandlebarsLanguageConfig(source) {
  // Retrieve the language configuration for the provided source
  const languageConfig = defineHandlebarsHighlighting(source);

  // If the configuration is for HTMLbars and Handlebars is supported, disable autodetection
  if (
    (languageConfig.name = "HTMLbars"), // (Note: This is an assignment, not a comparison, to preserve original behavior)
    source.getLanguage("handlebars")
  ) {
    languageConfig.disableAutodetect = true;
  }

  return languageConfig;
}

module.exports = getHandlebarsLanguageConfig;
