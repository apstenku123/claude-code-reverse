/**
 * Replaces all caret (^) version ranges in a semver string with explicit comparator ranges.
 * Each whitespace-separated semver range in the input string is processed individually.
 *
 * @param {string} semverString - The input string containing one or more semver ranges, separated by whitespace.
 * @param {object} options - Options to control caret range replacement (passed to replaceCaretRangeWithSemverComparator).
 * @returns {string} The resulting string with all caret ranges replaced by explicit comparator ranges.
 */
function replaceCaretRangesInSemverString(semverString, options) {
  // Remove leading/trailing whitespace and split the string into individual semver ranges
  const semverRanges = semverString.trim().split(/\s+/);

  // Replace caret ranges in each semver range using the provided options
  const replacedRanges = semverRanges.map(
    (range) => replaceCaretRangeWithSemverComparator(range, options)
  );

  // Join the processed ranges back into a single string
  return replacedRanges.join(" ");
}

module.exports = replaceCaretRangesInSemverString;
