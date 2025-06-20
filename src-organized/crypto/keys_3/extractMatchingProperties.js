/**
 * Extracts and returns an object containing properties from the input whose keys match a specific pattern.
 *
 * If the input is a string or an array, isBlobOrFileLikeObject processes isBlobOrFileLikeObject accordingly. For arrays, isBlobOrFileLikeObject merges the results of processing each element.
 * Only properties whose keys match the regular expression `m5A` (after slicing off the prefix of length `DU1.length`) are included in the result.
 *
 * @param {string|Array|Object} input - The input to process. Can be a string, array, or object.
 * @returns {Object|undefined} An object with matching properties, or undefined if none found or input is invalid.
 */
function extractMatchingProperties(input) {
  // Return early if input is neither a string nor an array
  if (!Ic2.isString(input) && !Array.isArray(input)) return;

  let processedObject = {};

  if (Array.isArray(input)) {
    // Merge all objects returned by h5A for each array element
    processedObject = input.reduce((merged, element) => {
      const elementObject = h5A(element);
      for (const key of Object.keys(elementObject)) {
        merged[key] = elementObject[key];
      }
      return merged;
    }, {});
  } else {
    // If input is falsy, return undefined
    if (!input) return;
    processedObject = h5A(input);
  }

  // Extract properties whose keys match the pattern m5A
  const matchingProperties = Object.entries(processedObject).reduce((result, [key, value]) => {
    if (key.match(m5A)) {
      // Remove the prefix of length DU1.length from the key
      const trimmedKey = key.slice(DU1.length);
      result[trimmedKey] = value;
    }
    return result;
  }, {});

  // Return the result if any matching properties were found
  if (Object.keys(matchingProperties).length > 0) {
    return matchingProperties;
  } else {
    return;
  }
}

module.exports = extractMatchingProperties;