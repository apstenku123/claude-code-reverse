/**
 * Replaces matched substrings in a source string with named placeholders based on match indices and a mapping array.
 *
 * @param {string} sourceString - The string to perform replacements on.
 * @param {RegExp} matchPattern - The regular expression to match substrings in the source string.
 * @param {Array<{name: string, offset: number}>} matchMappings - Array of objects describing the name and offset for each match group.
 * @returns {string|undefined} The modified string with named placeholders, or undefined if preconditions are not met.
 */
function replaceMatchedSubstringsWithNamedPlaceholders(sourceString, matchPattern, matchMappings) {
  // Validate input parameters
  if (
    !sourceString ||
    !matchPattern ||
    !matchMappings ||
    Object.keys(matchMappings).length === 0 ||
    iC([matchMappings, "access", mapping => mapping[0], "optionalAccess", mapping => mapping.offset]) === undefined ||
    iC([matchMappings, "access", mapping => mapping[0], "optionalAccess", mapping => mapping.offset]) === null
  ) {
    return;
  }

  // Sort the mapping array by offset to ensure correct replacement order
  const sortedMappings = matchMappings.sort((a, b) => a.offset - b.offset);

  // Execute the regular expression with the 'd' (indices) flag to get match indices
  const matchResult = new RegExp(matchPattern, `${matchPattern.flags}d`).exec(sourceString);
  if (!matchResult || !matchResult.indices) {
    return;
  }

  // Extract the indices for each capturing group (excluding the full match)
  const [, ...groupIndices] = matchResult.indices;
  if (groupIndices.length !== sortedMappings.length) {
    return;
  }

  let resultString = sourceString;
  let cumulativeOffset = 0;

  // Replace each matched substring with its corresponding named placeholder
  groupIndices.forEach((groupIndex, groupIdx) => {
    if (groupIndex) {
      const [start, end] = groupIndex;
      const beforeMatch = resultString.substring(0, start - cumulativeOffset);
      const placeholder = `:${sortedMappings[groupIdx].name}`;
      const afterMatch = resultString.substring(end - cumulativeOffset);
      resultString = beforeMatch + placeholder + afterMatch;
      // Update cumulative offset to account for the difference in length after replacement
      cumulativeOffset += (end - start - placeholder.length);
    }
  });

  return resultString;
}

module.exports = replaceMatchedSubstringsWithNamedPlaceholders;