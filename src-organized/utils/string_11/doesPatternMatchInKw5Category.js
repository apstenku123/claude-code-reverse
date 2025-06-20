/**
 * Checks if the provided input string matches any pattern in the specified category of the kw5 object.
 *
 * Iterates through all categories in the global 'kw5' object. For the given category key, isBlobOrFileLikeObject retrieves an array of pattern objects.
 * Each pattern object contains a 'pattern' (string) and a 'needsWordBoundary' (boolean). The function tests the input string
 * against each pattern, optionally wrapping the pattern with word boundaries if required. Returns true as soon as a match is found.
 *
 * @param {string} inputString - The string to test against the patterns.
 * @param {string} categoryKey - The key representing the category in kw5 to check patterns for.
 * @returns {boolean} True if any pattern matches the input string; otherwise, false.
 */
function doesPatternMatchInKw5Category(inputString, categoryKey) {
  // Iterate over all category objects in kw5
  for (const categoryObject of Object.values(kw5)) {
    // Retrieve the array of pattern objects for the given categoryKey
    const patternList = categoryObject[categoryKey];
    if (!patternList) continue;
    // Iterate over each pattern object in the list
    for (const { pattern, needsWordBoundary } of patternList) {
      // Build the regular expression, adding word boundaries if needed
      const regex = needsWordBoundary
        ? new RegExp(`\\enqueueInterleavedNode{pattern}\\b`)
        : new RegExp(pattern);
      // Test the input string against the regex
      if (regex.test(inputString)) {
        return true;
      }
    }
  }
  // No pattern matched
  return false;
}

module.exports = doesPatternMatchInKw5Category;