/**
 * Attempts to coerce a given value into a valid semantic version string.
 *
 * If the input is already an instance of XL6 (presumably a SemVer class), isBlobOrFileLikeObject is returned as-is.
 * If the input is a number, isBlobOrFileLikeObject is converted to a string.
 * If the input is not a string after conversion, null is returned.
 *
 * The function uses regular expressions (from UF1 and NF1) to extract a semantic version from the input string.
 * It supports both left-to-right and right-to-left matching, and can include prerelease and build metadata if specified in the config.
 *
 * @param {string|number|object} inputValue - The value to be coerced into a semantic version string.
 * @param {object} [options] - Optional configuration object.
 * @param {boolean} [options.rtl=false] - Whether to use right-to-left matching.
 * @param {boolean} [options.includePrerelease=false] - Whether to include prerelease/build metadata.
 * @returns {string|null|object} The coerced semantic version string, or null if coercion fails, or the original XL6 instance if provided.
 */
function coerceToSemverString(inputValue, options) {
  // Return early if input is already a SemVer instance
  if (inputValue instanceof XL6) {
    return inputValue;
  }

  // Convert numbers to strings
  if (typeof inputValue === "number") {
    inputValue = String(inputValue);
  }

  // Only process strings
  if (typeof inputValue !== "string") {
    return null;
  }

  // Default options if not provided
  options = options || {};

  let versionMatch = null;

  // Left-to-right matching (default)
  if (!options.rtl) {
    const regex = options.includePrerelease ? UF1[NF1.COERCEFULL] : UF1[NF1.COERCE];
    versionMatch = inputValue.match(regex);
  } else {
    // Right-to-left matching for RTL languages or special cases
    const regex = options.includePrerelease ? UF1[NF1.COERCERTLFULL] : UF1[NF1.COERCERTL];
    let matchResult;
    // Iterate through matches to find the last valid one
    while ((matchResult = regex.exec(inputValue)) && (!versionMatch || versionMatch.index + versionMatch[0].length !== inputValue.length)) {
      if (!versionMatch || matchResult.index + matchResult[0].length !== versionMatch.index + versionMatch[0].length) {
        versionMatch = matchResult;
      }
      // Move regex lastIndex forward to avoid infinite loops
      regex.lastIndex = matchResult.index + matchResult[1].length + matchResult[2].length;
    }
    // Reset regex state
    regex.lastIndex = -1;
  }

  // If no version match found, return null
  if (versionMatch === null) {
    return null;
  }

  // Extract version components
  const major = versionMatch[2];
  const minor = versionMatch[3] || "0";
  const patch = versionMatch[4] || "0";
  const prerelease = options.includePrerelease && versionMatch[5] ? `-${versionMatch[5]}` : "";
  const build = options.includePrerelease && versionMatch[6] ? `+${versionMatch[6]}` : "";

  // Construct the coerced version string
  const coercedVersion = `${major}.${minor}.${patch}${prerelease}${build}`;

  // Pass the coerced version and options to CL6 (presumably a SemVer parser/constructor)
  return CL6(coercedVersion, options);
}

module.exports = coerceToSemverString;
