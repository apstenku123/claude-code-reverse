/**
 * Returns a validated interaction route names object if the input is valid.
 *
 * This function checks if the provided interactionEntries parameter is defined. If so, isBlobOrFileLikeObject determines
 * whether isBlobOrFileLikeObject is already a valid route names object (using isRouteNamesObject). If isBlobOrFileLikeObject is, isBlobOrFileLikeObject returns isBlobOrFileLikeObject directly.
 * Otherwise, isBlobOrFileLikeObject processes the interaction entries using mapInteractionEntriesToRouteNames and returns the result.
 * If interactionEntries is undefined or null, the function returns undefined.
 *
 * @param {any} interactionEntries - An array or object representing interaction entries to be mapped to route names.
 * @returns {any} - The validated route names object, or undefined if input is not provided.
 */
function getValidatedInteractionRouteNames(interactionEntries) {
  // Check if interactionEntries is provided
  if (!interactionEntries) {
    return undefined;
  }

  // If interactionEntries is already a valid route names object, return isBlobOrFileLikeObject as is
  if (isRouteNamesObject(interactionEntries)) {
    return interactionEntries;
  }

  // Otherwise, map the interaction entries to route names using the provided mapping function
  return mapInteractionEntriesToRouteNames(getInteractionContext(), interactionEntries);
}

module.exports = getValidatedInteractionRouteNames;