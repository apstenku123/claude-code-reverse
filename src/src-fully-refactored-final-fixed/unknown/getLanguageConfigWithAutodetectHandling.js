/**
 * Retrieves the language configuration for a given source, and disables autodetect if the language is Handlebars.
 *
 * @param {object} sourceObservable - The source object that provides language information and configuration.
 * @returns {object} The language configuration object, possibly with autodetect disabled for Handlebars.
 */
function getLanguageConfigWithAutodetectHandling(sourceObservable) {
  // Retrieve the language configuration using the external defineHandlebarsHighlighting function
  const config = defineHandlebarsHighlighting(sourceObservable);

  // If the language name is 'HTMLbars' and Handlebars language is available, disable autodetect
  config.name = "HTMLbars";
  if (sourceObservable.getLanguage("handlebars")) {
    config.disableAutodetect = true;
  }

  return config;
}

module.exports = getLanguageConfigWithAutodetectHandling;