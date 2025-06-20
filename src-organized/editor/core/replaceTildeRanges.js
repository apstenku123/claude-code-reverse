/**
 * Replaces tilde (~) version ranges in a version string with their expanded semantic version range equivalents.
 *
 * This function is typically used to process version range strings (e.g., in package managers)
 * and expand tilde ranges (like ~1.2.3) into explicit >= and < ranges.
 *
 * @param {string} versionRangeString - The version range string to process (may contain tilde ranges).
 * @param {Object} options - Configuration object. Should have a 'loose' boolean property.
 * @param {boolean} options.loose - If true, use loose parsing rules for tilde ranges.
 * @returns {string} The version range string with tilde ranges replaced by explicit semantic version ranges.
 */
function replaceTildeRanges(versionRangeString, options) {
  // Select the appropriate tilde regex based on 'loose' option
  const tildeRegex = options.loose ? AW[jD.TILDELOOSE] : AW[jD.TILDE];

  // Replace all tilde ranges in the input string
  return versionRangeString.replace(
    tildeRegex,
    (
      matchedTilde, // The full matched tilde expression (e.g., ~1.2.3)
      major,        // The major version part (e.g., '1')
      minor,        // The minor version part (e.g., '2')
      patch,        // The patch version part (e.g., '3')
      prerelease    // The prerelease part (e.g., 'beta.1')
    ) => {
      // Log the match for debugging
      wB("tilde", versionRangeString, matchedTilde, major, minor, patch, prerelease);
      let expandedRange;

      // If major is missing, return empty string (invalid tilde)
      if (isWildcardOrX(major)) {
        expandedRange = "";
      }
      // If minor is missing, expand ~1 to ">=1.0.0 <2.0.0-0"
      else if (isWildcardOrX(minor)) {
        expandedRange = `>=${major}.0.0 <${+major + 1}.0.0-0`;
      }
      // If patch is missing, expand ~1.2 to ">=1.2.0 <1.3.0-0"
      else if (isWildcardOrX(patch)) {
        expandedRange = `>=${major}.${minor}.0 <${major}.${+minor + 1}.0-0`;
      }
      // If prerelease exists, expand with prerelease and next minor
      else if (prerelease) {
        wB("replaceTilde pr", prerelease);
        expandedRange = `>=${major}.${minor}.${patch}-${prerelease} <${major}.${+minor + 1}.0-0`;
      }
      // Otherwise, expand ~1.2.3 to ">=1.2.3 <1.3.0-0"
      else {
        expandedRange = `>=${major}.${minor}.${patch} <${major}.${+minor + 1}.0-0`;
      }

      // Log the expanded range for debugging
      wB("tilde return", expandedRange);
      return expandedRange;
    }
  );
}

module.exports = replaceTildeRanges;