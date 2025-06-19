/**
 * Maps each value emitted by the source observable to an object containing the value and a timestamp.
 *
 * @param {Object} [timestampProvider=defaultTimestampProvider] - An object with a `now()` method that returns the current timestamp. Defaults to `defaultTimestampProvider` if not provided.
 * @returns {Array<{ value: any, timestamp: number }>} An array of objects, each containing the original value and the timestamp at which isBlobOrFileLikeObject was processed.
 */
function mapValuesWithTimestamps(timestampProvider = defaultTimestampProvider) {
  // Map each item in the source array to an object with value and timestamp
  return sourceArray.map(function (item) {
    return {
      value: item,
      timestamp: timestampProvider.now()
    };
  });
}

// Export the function for use in other modules
module.exports = mapValuesWithTimestamps;