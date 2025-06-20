/**
 * Replaces matched segments in a string with named parameters based on regex match indices and a mapping array.
 *
 * @param {string} inputString - The string to search and replace within.
 * @param {RegExp} regexPattern - The regular expression to match against the input string.
 * @param {Array<{name: string, offset: number}>} matchMappings - Array of mapping objects, each with a 'name' and 'offset' property, sorted by offset.
 * @returns {string|undefined} The input string with matched segments replaced by named parameters (e.g., :paramName), or undefined if requirements are not met.
 */
function replaceRegexMatchesWithNamedParams(inputString, regexPattern, matchMappings) {
  // Validate input parameters
  if (
    !inputString ||
    !regexPattern ||
    !matchMappings ||
    Object.keys(matchMappings).length === 0 ||
    iC([matchMappings, "access", mapping => mapping[0], "optionalAccess", mapping => mapping.offset]) === undefined ||
    iC([matchMappings, "access", mapping => mapping[0], "optionalAccess", mapping => mapping.offset]) === null
  ) {
    return;
  }

  // Sort the mapping array by offset
  const sortedMappings = matchMappings.sort((a, b) => a.offset - b.offset);

  // Create a regex with the 'd' (indices) flag to get match indices
  const regexWithIndices = new RegExp(regexPattern, `${regexPattern.flags}d`);
  const matchResult = regexWithIndices.exec(inputString);

  // If no match or no indices, return undefined
  if (!matchResult || !matchResult.indices) {
    return;
  }

  // Destructure to get the indices of the capturing groups (skip the full match at index 0)
  const [, ...groupIndices] = matchResult.indices;

  // The number of capturing groups must match the number of mappings
  if (groupIndices.length !== sortedMappings.length) {
    return;
  }

  let resultString = inputString;
  let totalOffset = 0;

  // Replace each matched segment with its corresponding named parameter
  groupIndices.forEach((groupIndex, mappingIndex) => {
    if (groupIndex) {
      const [start, end] = groupIndex;
      const beforeMatch = resultString.substring(0, start - totalOffset);
      const paramName = `:${sortedMappings[mappingIndex].name}`;
      const afterMatch = resultString.substring(end - totalOffset);
      resultString = beforeMatch + paramName + afterMatch;
      // Update offset to account for the difference in length after replacement
      totalOffset += (end - start - paramName.length);
    }
  });

  return resultString;
}

module.exports = replaceRegexMatchesWithNamedParams;