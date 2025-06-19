/**
 * Safely retrieves the 'target' property from an event-like object.
 * If accessing the 'target' property throws an error (e.g., due to a Proxy or malformed object),
 * the function returns null instead of throwing.
 *
 * @param {Object} eventObject - The object from which to retrieve the 'target' property.
 * @returns {any|null} The 'target' property of the object, or null if inaccessible.
 */
function getEventTargetSafely(eventObject) {
  try {
    // Attempt to access the 'target' property
    return eventObject.target;
  } catch (error) {
    // If accessing 'target' throws, return null
    return null;
  }
}

module.exports = getEventTargetSafely;