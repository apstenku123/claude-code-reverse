/**
 * Expands all tilde (~) version ranges in a space-separated version string to their full semantic version range equivalents.
 *
 * Each version or range in the input string is processed individually using the replaceTildeRanges function.
 *
 * @param {string} versionString - a space-separated string containing one or more version numbers or version ranges.
 * @param {object} options - Configuration options to control how tilde ranges are expanded (passed to replaceTildeRanges).
 * @returns {string} a space-separated string with all tilde ranges expanded to their full semantic version range equivalents.
 */
function expandTildeRangesInVersionString(versionString, options) {
  // Remove leading/trailing whitespace and split the string into individual versions/ranges
  const versionSegments = versionString.trim().split(/\s+/);

  // Expand tilde ranges in each segment using replaceTildeRanges
  const expandedSegments = versionSegments.map(
    (segment) => replaceTildeRanges(segment, options)
  );

  // Join the expanded segments back into a single space-separated string
  return expandedSegments.join(" ");
}

// Dependency: replaceTildeRanges must be imported or defined elsewhere
// Example: const replaceTildeRanges = require('./replaceTildeRanges');

module.exports = expandTildeRangesInVersionString;
