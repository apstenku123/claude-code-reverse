/**
 * Safely processes an array of interaction entries by mapping each to a route name and storing associated metadata.
 * Handles errors gracefully by logging them and returning null if processing fails.
 *
 * @param {Array} interactionEntries - The array of interaction entries to process.
 * @returns {any|null} The result of processing the interaction entries, or null if input is falsy or an error occurs.
 */
function processInteractionEntriesSafely(interactionEntries) {
  if (!interactionEntries) {
    // Return null if input is falsy (null, undefined, etc.)
    return null;
  }
  try {
    // Attempt to process the interaction entries using the external BT1 function
    return BT1(interactionEntries);
  } catch (error) {
    // Log the error using the external reportErrorIfAllowed function, then return null
    reportErrorIfAllowed(error);
    return null;
  }
}

module.exports = processInteractionEntriesSafely;