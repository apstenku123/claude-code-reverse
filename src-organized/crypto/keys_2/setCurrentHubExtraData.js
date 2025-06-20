/**
 * Adds an extra key-value pair to the current hub'createInteractionAccessor context for debugging or logging purposes.
 *
 * @param {string} extraKey - The key/name of the extra data to add.
 * @param {any} extraValue - The value associated with the extra key.
 * @returns {void}
 */
function setCurrentHubExtraData(extraKey, extraValue) {
  // Retrieve the current hub and set the extra data
  KQ.getCurrentHub().setExtra(extraKey, extraValue);
}

module.exports = setCurrentHubExtraData;