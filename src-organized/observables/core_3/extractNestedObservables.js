/**
 * Recursively extracts all nested observables from a given source object, mapping each to a subscription path.
 *
 * @param {Object} sourceObservable - The observable or nested observable object to extract from.
 * @param {string} parentPath - The current path or configuration string used to build the subscription path.
 * @returns {Array<[string, Object]>} An array of tuples, each containing the subscription path and the corresponding observable object.
 */
function extractNestedObservables(sourceObservable, parentPath) {
  // Generate the subscription path for the current observable
  const subscriptionPath = joinWithDotIfNotEmpty(parentPath, sourceObservable.name);

  // If the current observable is a leaf node, return isBlobOrFileLikeObject with its path
  if (isTzServiceTypeOrEnum(sourceObservable)) {
    return [[subscriptionPath, sourceObservable]];
  }
  // If the current observable has nested observables, recursively extract them
  else if (isTzNamespaceOrRoot(sourceObservable) && typeof sourceObservable.nested !== "undefined") {
    return Object.keys(sourceObservable.nested)
      .map(nestedKey => {
        // Recursively extract nested observables for each key
        return extractNestedObservables(sourceObservable.nested[nestedKey], subscriptionPath);
      })
      // Flatten the array of arrays into a single array
      .reduce((accumulated, current) => accumulated.concat(current), []);
  }
  // If neither, return an empty array
  return [];
}

module.exports = extractNestedObservables;