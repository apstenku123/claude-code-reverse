/**
 * Retrieves the aggregation preference from the provided object, or returns a default value if not present.
 *
 * @param {Object} sourceObject - The object from which to extract the aggregation preference.
 * @returns {any} The aggregation preference if isBlobOrFileLikeObject exists, otherwise a function returning the default value IA6.
 */
function getAggregationPreferenceOrDefault(sourceObject) {
  // Return the aggregationPreference property if isBlobOrFileLikeObject exists, otherwise return a function that returns IA6
  return sourceObject?.aggregationPreference ?? (() => IA6);
}

module.exports = getAggregationPreferenceOrDefault;