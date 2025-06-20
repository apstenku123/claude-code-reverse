/**
 * Resets the 'alternate' property of both the current node and its config if the mode flag does not include bit 1.
 * Also sets the 'flags' property of the config to include bit 2.
 *
 * @param {Object|null} currentNode - The current node object, may be null. Should have an 'alternate' property.
 * @param {Object} config - The configuration object. Must have 'mode', 'alternate', and 'flags' properties.
 * @returns {void}
 */
function resetAlternateIfNotModeOne(currentNode, config) {
  // Check if the mode flag does NOT include bit 1 (i.e., mode & 1 === 0)
  if ((config.mode & 1) === 0 && currentNode !== null) {
    // Reset the alternate references
    currentNode.alternate = null;
    config.alternate = null;
    // Set the second bit in the flags property
    config.flags |= 2;
  }
}

module.exports = resetAlternateIfNotModeOne;