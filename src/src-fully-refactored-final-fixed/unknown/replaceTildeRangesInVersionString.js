/**
 * Replaces tilde (~) version ranges in a version string with their expanded semantic version range equivalents.
 *
 * This function is typically used to process version strings (e.g., in package.json dependencies)
 * and expand tilde ranges (like ~1.2.3) into their full semantic version range (e.g., ">=1.2.3 <1.3.0-0").
 *
 * @param {string} versionString - The version string to process and replace tilde ranges in.
 * @param {Object} options - Configuration object.
 * @param {boolean} options.loose - If true, use loose parsing rules for tilde ranges.
 * @returns {string} The version string with tilde ranges replaced by their expanded equivalents.
 */
function replaceTildeRangesInVersionString(versionString, options) {
  // Select the appropriate tilde regex based on 'loose' option
  const tildeRegex = options.loose ? AW[jD.TILDELOOSE] : AW[jD.TILDE];

  // Replace all tilde ranges in the version string
  return versionString.replace(tildeRegex, (
    matchedTilde, // The full matched tilde range (e.g., ~1.2.3)
    major,        // Major version component
    minor,        // Minor version component
    patch,        // Patch version component
    prerelease    // Prerelease component (if any)
  ) => {
    // Log the match for debugging
    wB("tilde", versionString, matchedTilde, major, minor, patch, prerelease);

    let expandedRange;

    // If major is missing, return empty string (invalid tilde)
    if (isWildcardOrX(major)) {
      expandedRange = "";
    }
    // If only major is present (e.g., ~1)
    else if (isWildcardOrX(minor)) {
      expandedRange = `>=${major}.0.0 <${+major + 1}.0.0-0`;
    }
    // If major and minor are present (e.g., ~1.2)
    else if (isWildcardOrX(patch)) {
      expandedRange = `>=${major}.${minor}.0 <${major}.${+minor + 1}.0-0`;
    }
    // If prerelease is present (e.g., ~1.2.3-beta)
    else if (prerelease) {
      wB("replaceTilde pr", prerelease);
      expandedRange = `>=${major}.${minor}.${patch}-${prerelease} <${major}.${+minor + 1}.0-0`;
    }
    // If major, minor, patch are present (e.g., ~1.2.3)
    else {
      expandedRange = `>=${major}.${minor}.${patch} <${major}.${+minor + 1}.0-0`;
    }

    // Log the expanded range for debugging
    wB("tilde return", expandedRange);
    return expandedRange;
  });
}

module.exports = replaceTildeRangesInVersionString;