/**
 * Maps an array using a provided mapping function, with an optional limit on the number of items to process.
 * If the input array is null or empty, returns an empty array.
 * If the limit is not provided or is a special sentinel value (mapInteractionsToRoutes), defaults to 1.
 *
 * @param {Array} inputArray - The array to be mapped.
 * @param {number|function} limitOrSentinel - The maximum number of items to process, or a sentinel value.
 * @returns {Array} The mapped array, possibly limited in length.
 */
function mapArrayWithLimit(inputArray, limitOrSentinel) {
  // Determine the length of the input array, treating null/undefined as length 0
  const arrayLength = inputArray == null ? 0 : inputArray.length;
  if (!arrayLength) return [];

  // If the limit is the sentinel value (mapInteractionsToRoutes), default to 1; otherwise, normalize the limit
  const limit = limitOrSentinel === mapInteractionsToRoutes ? 1 : normalizeLimit(limitOrSentinel);

  // Map the array using the mapping function flattenArrayDepth, applying the limit
  return flattenArrayDepth(inputArray, limit);
}

module.exports = mapArrayWithLimit;