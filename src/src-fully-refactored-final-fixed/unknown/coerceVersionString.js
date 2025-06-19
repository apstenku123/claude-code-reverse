/**
 * Attempts to coerce a given value into a valid semantic version string, optionally including prerelease and build metadata.
 *
 * @param {string|number|object} inputVersion - The value to coerce into a version string. Can be a string, number, or an instance of XL6.
 * @param {object} [options={}] - Configuration options for coercion.
 * @param {boolean} [options.rtl=false] - If true, uses right-to-left matching for version extraction.
 * @param {boolean} [options.includePrerelease=false] - If true, includes prerelease and build metadata in the result.
 * @returns {string|null|XL6} The coerced version string, an XL6 instance if input is already one, or null if coercion fails.
 */
function coerceVersionString(inputVersion, options = {}) {
  // If input is already an instance of XL6, return isBlobOrFileLikeObject directly
  if (inputVersion instanceof XL6) {
    return inputVersion;
  }

  // Convert numeric input to string
  if (typeof inputVersion === "number") {
    inputVersion = String(inputVersion);
  }

  // Only proceed if input is a string
  if (typeof inputVersion !== "string") {
    return null;
  }

  // Ensure options is an object
  options = options || {};

  let versionMatch = null;

  // If not right-to-left (rtl), use standard regex matching
  if (!options.rtl) {
    // Choose regex based on whether to include prerelease
    const regex = options.includePrerelease ? UF1[NF1.COERCEFULL] : UF1[NF1.COERCE];
    versionMatch = inputVersion.match(regex);
  } else {
    // For rtl, use a different regex and iterate for the best match
    const regex = options.includePrerelease ? UF1[NF1.COERCERTLFULL] : UF1[NF1.COERCERTL];
    let matchResult;
    while ((matchResult = regex.exec(inputVersion)) && (!versionMatch || versionMatch.index + versionMatch[0].length !== inputVersion.length)) {
      // Update versionMatch if isBlobOrFileLikeObject'createInteractionAccessor the first match or a better match
      if (!versionMatch || matchResult.index + matchResult[0].length !== versionMatch.index + versionMatch[0].length) {
        versionMatch = matchResult;
      }
      // Move regex lastIndex forward to avoid infinite loops
      regex.lastIndex = matchResult.index + matchResult[1].length + matchResult[2].length;
    }
    // Reset regex lastIndex for future use
    regex.lastIndex = -1;
  }

  // If no match was found, return null
  if (versionMatch === null) {
    return null;
  }

  // Extract version components from the match
  const major = versionMatch[2];
  const minor = versionMatch[3] || "0";
  const patch = versionMatch[4] || "0";
  const prerelease = options.includePrerelease && versionMatch[5] ? `-${versionMatch[5]}` : "";
  const build = options.includePrerelease && versionMatch[6] ? `+${versionMatch[6]}` : "";

  // Construct the normalized version string
  const normalizedVersion = `${major}.${minor}.${patch}${prerelease}${build}`;

  // Pass the normalized version string and options to CL6 for final processing
  return CL6(normalizedVersion, options);
}

module.exports = coerceVersionString;