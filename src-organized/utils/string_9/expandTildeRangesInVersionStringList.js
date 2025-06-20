/**
 * Expands tilde (~) version ranges in each version string within a space-separated list.
 * Each version string is processed using the replaceTildeRangesInVersionString function, supporting both strict and loose parsing.
 *
 * @param {string} versionStringList - a space-separated list of version strings, possibly containing tilde ranges.
 * @param {object} options - Configuration options to pass to replaceTildeRangesInVersionString (e.g., strict or loose parsing).
 * @returns {string} a space-separated list of version strings with tilde ranges expanded to their full semantic version equivalents.
 */
function expandTildeRangesInVersionStringList(versionStringList, options) {
  // Remove leading/trailing whitespace and split the string into individual version strings
  const versionStrings = versionStringList.trim().split(/\s+/);

  // Expand tilde ranges in each version string
  const expandedVersionStrings = versionStrings.map(
    version => replaceTildeRangesInVersionString(version, options)
  );

  // Join the expanded version strings back into a single space-separated string
  return expandedVersionStrings.join(' ');
}

// Dependency: replaceTildeRangesInVersionString must be imported or defined elsewhere
// Example: const replaceTildeRangesInVersionString = require('./replaceTildeRangesInVersionString');

module.exports = expandTildeRangesInVersionStringList;
