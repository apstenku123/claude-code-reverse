/**
 * Maps an array of result objects to a new array of objects containing the corresponding item from the reference list and its index.
 * Optionally includes additional match and score information based on provided options.
 *
 * @param {Array<Object>} results - Array of result objects, each containing an 'idx' property referencing an index in the referenceList.
 * @param {Array<any>} referenceList - Array of items to be mapped to, referenced by index from results.
 * @param {Object} [options={}] - Options to include additional data in the mapped result.
 * @param {boolean} [options.includeMatches=N4.includeMatches] - Whether to include match information by applying extractValidMatches.
 * @param {boolean} [options.includeScore=N4.includeScore] - Whether to include score information by applying copyScoreProperty.
 * @returns {Array<Object>} Array of mapped result objects, each containing the item from referenceList and its reference index, and optionally match/score info.
 */
function mapResultsWithOptions(
  results,
  referenceList,
  {
    includeMatches = N4.includeMatches,
    includeScore = N4.includeScore
  } = {}
) {
  const resultModifiers = [];

  // Add modifier functions based on options
  if (includeMatches) {
    resultModifiers.push(extractValidMatches);
  }
  if (includeScore) {
    resultModifiers.push(copyScoreProperty);
  }

  // Map each result to a new object with the corresponding item and index
  return results.map(result => {
    const { idx: referenceIndex } = result;
    const mappedResult = {
      item: referenceList[referenceIndex],
      refIndex: referenceIndex
    };

    // Apply any modifier functions to enrich the mapped result
    if (resultModifiers.length) {
      resultModifiers.forEach(modifierFn => {
        modifierFn(result, mappedResult);
      });
    }

    return mappedResult;
  });
}

module.exports = mapResultsWithOptions;