/**
 * Transforms multiple pattern strings using the createGroupedPattern function,
 * then joins the resulting grouped patterns into a single string.
 *
 * @param {...string} patternStrings - One or more pattern strings to be transformed and grouped.
 * @returns {string} a single string containing all grouped patterns concatenated together.
 */
function mapAndGroupPatterns(...patternStrings) {
  // Map each pattern string to its grouped pattern using createGroupedPattern
  const groupedPatterns = patternStrings.map((pattern) => createGroupedPattern(pattern));
  // Join all grouped patterns into a single string
  return groupedPatterns.join("");
}

module.exports = mapAndGroupPatterns;