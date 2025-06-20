/**
 * Adds an extra key-value pair to the current hub'createInteractionAccessor context for error tracking or logging purposes.
 *
 * @param {string} extraKey - The key/name for the extra data to be set in the hub context.
 * @param {any} extraValue - The value associated with the extra key to be stored.
 * @returns {void}
 */
function setHubExtraData(extraKey, extraValue) {
  // Retrieve the current hub instance and set the extra data
  KQ.getCurrentHub().setExtra(extraKey, extraValue);
}

module.exports = setHubExtraData;