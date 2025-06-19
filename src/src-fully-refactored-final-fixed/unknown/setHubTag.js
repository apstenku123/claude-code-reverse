/**
 * Sets a tag on the current hub instance.
 *
 * This function uses the KQ global object to access the current hub and sets a tag
 * with the provided key and value. Tags are commonly used for categorizing or annotating
 * events or contexts in monitoring/logging systems.
 *
 * @param {string} tagKey - The key/name of the tag to set.
 * @param {string} tagValue - The value to associate with the tag key.
 * @returns {void} This function does not return a value.
 */
function setHubTag(tagKey, tagValue) {
  // Retrieve the current hub instance and set the tag
  KQ.getCurrentHub().setTag(tagKey, tagValue);
}

module.exports = setHubTag;