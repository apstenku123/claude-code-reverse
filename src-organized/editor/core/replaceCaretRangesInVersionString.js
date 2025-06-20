/**
 * Replaces all caret (^) semver range specifiers in a version range string with explicit comparator expressions.
 * Each whitespace-separated version range in the input string is processed individually.
 *
 * @param {string} versionRangeString - The version range string containing one or more whitespace-separated semver ranges.
 * @param {object} options - Options to control how caret ranges are replaced (passed to replaceCaretRangeWithComparator).
 * @returns {string} The version range string with all caret ranges replaced by explicit comparator expressions.
 */
function replaceCaretRangesInVersionString(versionRangeString, options) {
  // Remove leading/trailing whitespace and split the string into individual version ranges
  const versionRanges = versionRangeString.trim().split(/\s+/);

  // Replace caret ranges in each version range using the provided options
  const replacedRanges = versionRanges.map((singleRange) => {
    return replaceCaretRangeWithComparator(singleRange, options);
  });

  // Join the processed ranges back into a single string
  return replacedRanges.join(" ");
}

module.exports = replaceCaretRangesInVersionString;
