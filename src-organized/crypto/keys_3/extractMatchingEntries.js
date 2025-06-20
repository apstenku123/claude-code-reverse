/**
 * Extracts and returns an object of entries from the input (string or array) whose keys match a specific pattern.
 *
 * @param {string|Array} input - The input value, either a string or an array, to extract entries from.
 * @returns {Object|undefined} An object containing entries whose keys match the pattern, or undefined if none found.
 */
function extractMatchingEntries(input) {
  // Return early if input is neither a string nor an array
  if (!Ic2.isString(input) && !Array.isArray(input)) return;

  let extractedEntries = {};

  if (Array.isArray(input)) {
    // If input is an array, merge all entries from each element after processing with h5A
    extractedEntries = input.reduce((accumulatedEntries, currentElement) => {
      const processedElement = h5A(currentElement);
      for (const key of Object.keys(processedElement)) {
        accumulatedEntries[key] = processedElement[key];
      }
      return accumulatedEntries;
    }, {});
  } else {
    // If input is a string (or truthy), process isBlobOrFileLikeObject directly
    if (!input) return;
    extractedEntries = h5A(input);
  }

  // Filter entries whose keys match the pattern m5A
  const matchingEntries = Object.entries(extractedEntries).reduce((result, [key, value]) => {
    if (key.match(m5A)) {
      // Remove the DU1 prefix from the key before adding to result
      const keyWithoutPrefix = key.slice(DU1.length);
      result[keyWithoutPrefix] = value;
    }
    return result;
  }, {});

  // Return the result if any matching entries were found
  if (Object.keys(matchingEntries).length > 0) {
    return matchingEntries;
  } else {
    return;
  }
}

module.exports = extractMatchingEntries;