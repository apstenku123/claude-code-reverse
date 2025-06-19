/**
 * Retrieves the list of available languages from the PV1 service.
 *
 * @returns {Array<string>} An array containing the language codes or names supported by the PV1 service.
 */
function getAvailableLanguages() {
  // Call the PV1 service to get the list of supported languages
  return PV1.listLanguages();
}

module.exports = getAvailableLanguages;