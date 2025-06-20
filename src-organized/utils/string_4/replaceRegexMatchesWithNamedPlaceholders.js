/**
 * Replaces regex match segments in a string with named placeholders based on match offsets.
 *
 * @param {string} inputString - The string to process and replace matches in.
 * @param {RegExp} regexPattern - The regular expression to match against the input string.
 * @param {Array<Object>} matchDescriptors - Array of objects describing each match, each with at least a 'name' and 'offset' property.
 * @returns {string|undefined} The modified string with named placeholders, or undefined if input is invalid or no matches found.
 */
function replaceRegexMatchesWithNamedPlaceholders(inputString, regexPattern, matchDescriptors) {
  // Validate input parameters
  if (
    !inputString ||
    !regexPattern ||
    !matchDescriptors ||
    Object.keys(matchDescriptors).length === 0 ||
    iC([
      matchDescriptors,
      "access",
      desc => desc[0],
      "optionalAccess",
      desc => desc.offset
    ]) === undefined ||
    iC([
      matchDescriptors,
      "access",
      desc => desc[0],
      "optionalAccess",
      desc => desc.offset
    ]) === null
  ) {
    return;
  }

  // Sort match descriptors by their offset property
  const sortedDescriptors = matchDescriptors.sort((a, b) => a.offset - b.offset);

  // Create a new regex with the 'd' (indices) flag to get match indices
  const regexWithIndices = new RegExp(regexPattern, `${regexPattern.flags}d`);
  const matchResult = regexWithIndices.exec(inputString);

  // If no match or no indices, return undefined
  if (!matchResult || !matchResult.indices) {
    return;
  }

  // Destructure to get the indices for each capturing group (excluding the full match)
  const [, ...groupIndices] = matchResult.indices;

  // Ensure the number of match descriptors matches the number of capturing groups
  if (groupIndices.length !== sortedDescriptors.length) {
    return;
  }

  let resultString = inputString;
  let offsetAdjustment = 0;

  // Replace each matched segment with its corresponding named placeholder
  groupIndices.forEach((groupIndex, idx) => {
    if (groupIndex) {
      const [start, end] = groupIndex;
      const beforeMatch = resultString.substring(0, start - offsetAdjustment);
      const placeholder = `:${sortedDescriptors[idx].name}`;
      const afterMatch = resultString.substring(end - offsetAdjustment);
      resultString = beforeMatch + placeholder + afterMatch;
      // Update offset adjustment to account for the difference in length after replacement
      offsetAdjustment += (end - start - placeholder.length);
    }
  });

  return resultString;
}

module.exports = replaceRegexMatchesWithNamedPlaceholders;
