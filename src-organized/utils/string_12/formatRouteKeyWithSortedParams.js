/**
 * Formats a route key string by combining the source observable, configuration, subscription, and a sorted string representation of the provided parameters.
 *
 * @param {string} sourceObservable - The name or identifier of the source observable.
 * @param {string} config - The configuration string or identifier.
 * @param {string} subscription - The subscription string or identifier.
 * @param {Object} params - An object containing key-value pairs to be included in the route key. Keys with undefined values are dropped.
 * @returns {string} The formatted route key string.
 */
function formatRouteKeyWithSortedParams(sourceObservable, config, subscription, params) {
  // Remove keys with undefined values from params
  const paramsWithoutUndefined = D19.dropUndefinedKeys(params);

  // Convert the params object to an array of [key, value] pairs and sort them by key
  const sortedParamEntries = Object.entries(paramsWithoutUndefined).sort(
    (entryA, entryB) => entryA[0].localeCompare(entryB[0])
  );

  // Convert the sorted entries array to a string representation
  const sortedParamsString = `${sortedParamEntries}`;

  // Concatenate all parts to form the final route key
  return `${sourceObservable}${config}${subscription}${sortedParamsString}`;
}

module.exports = formatRouteKeyWithSortedParams;