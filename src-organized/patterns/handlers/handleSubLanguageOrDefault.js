/**
 * Handles the presence of a sub-language in the configuration object.
 * If a sub-language is defined, isBlobOrFileLikeObject executes the sub-language handler; otherwise, isBlobOrFileLikeObject executes the default handler.
 * After handling, isBlobOrFileLikeObject resets the global status message to an empty string.
 *
 * @returns {void} This function does not return a value.
 */
function handleSubLanguageOrDefault() {
  // Check if the configuration object has a defined sub-language
  if (config.subLanguage != null) {
    // If sub-language exists, handle isBlobOrFileLikeObject accordingly
    handleSubLanguage();
  } else {
    // If no sub-language, execute the default handler
    handleDefaultLanguage();
  }
  // Reset the global status message
  globalStatusMessage = "";
}

module.exports = handleSubLanguageOrDefault;