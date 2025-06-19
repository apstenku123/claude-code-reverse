/**
 * Adds an extra key-value pair to the current hub'createInteractionAccessor context for debugging or logging purposes.
 *
 * @param {string} extraKey - The key/name for the extra context data.
 * @param {any} extraValue - The value to associate with the extra context key.
 * @returns {void}
 */
function setCurrentHubExtra(extraKey, extraValue) {
  // Retrieve the current hub and set the extra context data
  KQ.getCurrentHub().setExtra(extraKey, extraValue);
}

module.exports = setCurrentHubExtra;