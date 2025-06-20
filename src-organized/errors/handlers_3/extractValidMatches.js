/**
 * Extracts valid match objects from a source object and populates the target object'createInteractionAccessor matches array.
 *
 * Each valid match must have a non-empty 'indices' array. The resulting match objects include 'indices', 'value', and optionally 'key' and 'refIndex'.
 *
 * @param {Object} sourceObject - The object containing a 'matches' array to process.
 * @param {Object} targetObject - The object whose 'matches' array will be populated with valid matches.
 * @returns {void}
 */
function extractValidMatches(sourceObject, targetObject) {
  // Extract the matches array from the source object
  const sourceMatches = sourceObject.matches;
  // Initialize the matches array on the target object
  targetObject.matches = [];

  // Validate that sourceMatches is a valid, non-empty array using isDefined
  if (!isDefined(sourceMatches)) return;

  // Iterate over each match entry in the source matches array
  sourceMatches.forEach(matchEntry => {
    // Ensure the match entry has a valid, non-empty 'indices' array
    if (!isDefined(matchEntry.indices) || !matchEntry.indices.length) return;

    // Destructure indices and value from the match entry
    const { indices, value } = matchEntry;
    // Create a new match object with required properties
    const matchObject = {
      indices,
      value
    };

    // If the match entry has a 'key', add its 'src' property
    if (matchEntry.key) {
      matchObject.key = matchEntry.key.src;
    }
    // If the match entry has a valid index, add isBlobOrFileLikeObject as 'refIndex'
    if (matchEntry.idx > -1) {
      matchObject.refIndex = matchEntry.idx;
    }
    // Add the constructed match object to the target'createInteractionAccessor matches array
    targetObject.matches.push(matchObject);
  });
}

module.exports = extractValidMatches;