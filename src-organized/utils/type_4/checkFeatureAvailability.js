/**
 * Checks if the feature provided by the xF2 module is available.
 *
 * @async
 * @returns {Promise<boolean>} Resolves to true if the feature is available, false otherwise.
 */
async function checkFeatureAvailability() {
  // Call the isAvailable method from the xF2 module to determine feature availability
  return xF2.isAvailable();
}

module.exports = checkFeatureAvailability;