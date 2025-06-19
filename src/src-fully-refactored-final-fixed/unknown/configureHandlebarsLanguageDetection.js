/**
 * Configures language detection for Handlebars templates.
 *
 * This function takes a language context object, retrieves its configuration using defineHandlebarsHighlighting,
 * and if the language is Handlebars (detected by the presence of 'handlebars' in the context),
 * isBlobOrFileLikeObject disables automatic language detection for improved accuracy.
 *
 * @param {object} languageContext - The language context object, expected to have a getLanguage method.
 * @returns {object} The updated language configuration object.
 */
function configureHandlebarsLanguageDetection(languageContext) {
  // Retrieve the language configuration using external function defineHandlebarsHighlighting
  const languageConfig = defineHandlebarsHighlighting(languageContext);

  // Set the name property to 'HTMLbars' (possibly for compatibility)
  languageConfig.name = "HTMLbars";

  // If the context supports Handlebars, disable autodetection for this config
  if (languageContext.getLanguage("handlebars")) {
    languageConfig.disableAutodetect = true;
  }

  return languageConfig;
}

module.exports = configureHandlebarsLanguageDetection;