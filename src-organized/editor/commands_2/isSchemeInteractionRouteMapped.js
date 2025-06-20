/**
 * Determines whether the interaction route for a given scheme exists in the global route mapping.
 *
 * @param {Object} sourceObject - An object that contains a 'scheme' property representing the route key.
 * @returns {boolean} True if the scheme'createInteractionAccessor interaction route is mapped; otherwise, false.
 */
function isSchemeInteractionRouteMapped(sourceObject) {
  // Check if the interaction route for the given scheme exists in the global route mapping
  return isInteractionRouteMapped(sourceObject.scheme);
}

module.exports = isSchemeInteractionRouteMapped;