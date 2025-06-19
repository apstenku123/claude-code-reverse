/**
 * Maps an array of result objects to a new array, enriching each item with its corresponding reference from the provided items array.
 * Optionally, applies additional enhancement functions (such as including match details or score) based on configuration flags.
 *
 * @param {Array<Object>} resultsArray - Array of result objects, each expected to have an 'idx' property referencing an item in itemsArray.
 * @param {Array<any>} itemsArray - Array of items to be referenced by index from resultsArray.
 * @param {Object} [options={}] - Optional configuration object.
 * @param {boolean} [options.includeMatches=N4.includeMatches] - Whether to include match details using the extractValidMatches enhancer.
 * @param {boolean} [options.includeScore=N4.includeScore] - Whether to include score details using the copyScoreProperty enhancer.
 * @returns {Array<Object>} Array of mapped result objects, each containing the referenced item, its index, and any optional enhancements.
 */
function mapResultsWithOptionalEnhancements(
  resultsArray,
  itemsArray,
  {
    includeMatches = N4.includeMatches,
    includeScore = N4.includeScore
  } = {}
) {
  // Array to hold enhancer functions based on options
  const enhancers = [];

  // Conditionally add enhancer functions
  if (includeMatches) enhancers.push(extractValidMatches); // Adds match details
  if (includeScore) enhancers.push(copyScoreProperty);   // Adds score details

  // Map each result to an enriched object
  return resultsArray.map(result => {
    const { idx: itemIndex } = result;
    // Base mapped object
    const mappedResult = {
      item: itemsArray[itemIndex],
      refIndex: itemIndex
    };
    // Apply each enhancer function if any are present
    if (enhancers.length) {
      enhancers.forEach(enhancerFn => {
        enhancerFn(result, mappedResult);
      });
    }
    return mappedResult;
  });
}

module.exports = mapResultsWithOptionalEnhancements;