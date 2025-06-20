/**
 * Checks if the provided key exists in the global interaction route map (uL).
 *
 * @param {string} key - The key to check for existence in the interaction route map.
 * @returns {boolean} True if the key exists in the interaction route map; otherwise, false.
 */
function isKeyInInteractionRouteMap(key) {
  // Check if the key exists as a property in the global interaction route map object
  return key in uL;
}

module.exports = isKeyInInteractionRouteMap;