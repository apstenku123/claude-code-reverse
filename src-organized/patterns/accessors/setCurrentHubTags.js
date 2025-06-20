/**
 * Sets tags on the current hub for contextual tracking or logging.
 *
 * @param {Object} tags - An object containing key-value pairs to set as tags on the current hub.
 * @returns {void}
 *
 * This function is typically used to add contextual information (tags) to the current hub,
 * which can be useful for debugging, monitoring, or categorizing events.
 */
function setCurrentHubTags(tags) {
  // Retrieve the current hub instance and set the provided tags
  KQ.getCurrentHub().setTags(tags);
}

module.exports = setCurrentHubTags;