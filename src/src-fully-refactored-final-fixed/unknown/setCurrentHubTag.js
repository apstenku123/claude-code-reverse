/**
 * Sets a tag on the current hub instance.
 *
 * This function interacts with the KQ global object to retrieve the current hub
 * and assigns a tag with the provided key and value. Tags are often used for
 * categorization or filtering in logging, monitoring, or error tracking systems.
 *
 * @param {string} tagKey - The key/name of the tag to set.
 * @param {string} tagValue - The value to assign to the tag.
 * @returns {void} This function does not return a value.
 */
function setCurrentHubTag(tagKey, tagValue) {
  // Retrieve the current hub and set the tag with the given key and value
  KQ.getCurrentHub().setTag(tagKey, tagValue);
}

module.exports = setCurrentHubTag;