/**
 * Extracts the scope and isolationScope properties from a given observable object.
 *
 * @param {Object} observableObject - The observable object containing scope information.
 * @returns {Object} An object containing the extracted 'scope' and 'isolationScope' properties.
 */
function extractScopesFromObservable(observableObject) {
  // $BA and qBA are assumed to be external property keys/constants
  return {
    scope: observableObject[$BA],
    isolationScope: observableObject[qBA]
  };
}

module.exports = extractScopesFromObservable;