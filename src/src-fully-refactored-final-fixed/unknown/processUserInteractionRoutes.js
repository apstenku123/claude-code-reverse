/**
 * Processes a user interaction observable by mapping interactions to routes,
 * decoding any escaped character codes, and applying additional transformations.
 *
 * @param {Observable} userInteractionObservable - Observable stream of user interaction entries.
 * @returns {Observable} - The processed observable after all transformations.
 */
function processUserInteractionRoutes(userInteractionObservable) {
  // Step 1: Map user interactions to route names and store metadata
  let mappedRoutesObservable = mapInteractionsToRoutes(userInteractionObservable);

  // Step 2: Decode any numeric or hexadecimal escape sequences in the data
  let decodedObservable = decodeEscapedCharacterCodes(mappedRoutesObservable);

  // Step 3: Apply additional transformation (kt0)
  let transformedObservable = kt0(decodedObservable);

  // Step 4: Apply final transformation (replaceControlCharsWithSpacesAndTrim)
  let finalObservable = replaceControlCharsWithSpacesAndTrim(transformedObservable);

  // Return the fully processed observable
  return finalObservable;
}

module.exports = processUserInteractionRoutes;