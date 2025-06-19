/**
 * Safely maps an array of user interaction entries to route names and stores relevant metadata.
 * If an error occurs during processing, logs the error and returns null.
 *
 * @param {Array<Object>} interactionEntries - Array of user interaction entries to be processed.
 * @returns {Object|null} The mapping result object, or null if input is falsy or an error occurs.
 */
function mapInteractionsToRoutesSafe(interactionEntries) {
  if (!interactionEntries) {
    // Return null if input is falsy (null, undefined, etc.)
    return null;
  }
  try {
    // Attempt to process the interaction entries using the mapping utility
    return BT1(interactionEntries);
  } catch (error) {
    // Log the error using the provided logging utility and return null
    reportErrorIfAllowed(error);
    return null;
  }
}

module.exports = mapInteractionsToRoutesSafe;