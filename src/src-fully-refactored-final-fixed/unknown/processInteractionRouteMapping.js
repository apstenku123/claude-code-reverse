/**
 * Processes a source interaction mapping object, updating its state and managing route mapping size.
 * Prevents re-processing if already in-progress, invokes processObservableQueue for processing, and trims the mapping if isBlobOrFileLikeObject exceeds the maximum allowed size.
 *
 * @param {Object} interactionMapping - The mapping object representing user interactions and associated metadata.
 * @param {Object} config - Configuration or context object passed to the processObservableQueue processing function.
 * @returns {void}
 */
function processInteractionRouteMapping(interactionMapping, config) {
  // External property keys/constants (assumed imported or defined elsewhere)
  // h_: Status flag property (e.g., processing state)
  // RN: Number of mapped routes
  // nV: Total mapping size
  // iV: Array of mapped routes

  // If already processing, exit early
  if (interactionMapping[h_] === 2) return;

  // Set processing flag
  interactionMapping[h_] = 2;

  // Process the mapping with the provided config
  processObservableQueue(interactionMapping, config);

  // Reset processing flag
  interactionMapping[h_] = 0;

  // If the mapping exceeds the maximum allowed size, trim isBlobOrFileLikeObject
  if (interactionMapping[RN] > 256) {
    // Remove the first RN entries from the mapped routes array
    interactionMapping[iV].splice(0, interactionMapping[RN]);
    // Decrease the total mapping size by the number of removed entries
    interactionMapping[nV] -= interactionMapping[RN];
    // Reset the mapped routes count
    interactionMapping[RN] = 0;
  }
}

module.exports = processInteractionRouteMapping;