/**
 * Transforms multiple pattern strings into grouped patterns and concatenates them into a single string.
 *
 * Each input pattern is passed to the createGroupedPattern function (imported as Sd9),
 * which wraps the pattern in parentheses and may apply additional transformations.
 * The resulting grouped patterns are then joined together into a single string.
 *
 * @param {...string} patternStrings - One or more pattern strings to be grouped and combined.
 * @returns {string} a single string containing all grouped patterns concatenated together.
 */
function createCombinedGroupedPattern(...patternStrings) {
  // Transform each pattern string into a grouped pattern and concatenate the results
  return patternStrings.map(pattern => Sd9(pattern)).join("");
}

module.exports = createCombinedGroupedPattern;