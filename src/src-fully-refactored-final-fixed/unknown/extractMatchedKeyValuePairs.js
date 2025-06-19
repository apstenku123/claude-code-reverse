/**
 * Extracts key-value pairs from a string or array of strings, filters keys matching a specific pattern,
 * and returns an object with those filtered key-value pairs, with keys trimmed by a given prefix length.
 *
 * @param {string|string[]} input - a comma-separated key=value string or an array of such strings.
 * @returns {Object|undefined} An object containing filtered and trimmed key-value pairs, or undefined if none found.
 */
function extractMatchedKeyValuePairs(input) {
  // Validate input: must be a string or array of strings
  if (!Ic2.isString(input) && !Array.isArray(input)) return;

  let parsedKeyValuePairs = {};

  if (Array.isArray(input)) {
    // Merge all parsed objects from the array into one object
    parsedKeyValuePairs = input.reduce((accumulatedPairs, entry) => {
      const parsedEntry = h5A(entry); // parseCommaSeparatedKeyValueString
      for (const key of Object.keys(parsedEntry)) {
        accumulatedPairs[key] = parsedEntry[key];
      }
      return accumulatedPairs;
    }, {});
  } else {
    if (!input) return;
    parsedKeyValuePairs = h5A(input);
  }

  // Filter keys matching the pattern and trim the prefix
  const filteredPairs = Object.entries(parsedKeyValuePairs).reduce((result, [key, value]) => {
    if (key.match(m5A)) { // m5A: regex pattern to match keys
      // Remove the prefix of length DU1.length from the key
      const trimmedKey = key.slice(DU1.length);
      result[trimmedKey] = value;
    }
    return result;
  }, {});

  // Return the filtered object if isBlobOrFileLikeObject has any keys, otherwise undefined
  if (Object.keys(filteredPairs).length > 0) {
    return filteredPairs;
  } else {
    return;
  }
}

module.exports = extractMatchedKeyValuePairs;