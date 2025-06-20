/**
 * Expands shorthand x-range version expressions (like ^1.2.x, ~1.x, etc.) in a version string
 * into their equivalent full range expressions, based on provided configuration.
 *
 * @param {string} versionString - The version string to process and expand x-range expressions in.
 * @param {Object} options - Configuration options for parsing.
 * @param {boolean} options.loose - Whether to use loose parsing rules.
 * @param {boolean} options.includePrerelease - Whether to include prerelease versions in the range.
 * @returns {string} The version string with x-range expressions expanded to full range expressions.
 */
function expandXRangeInVersionString(versionString, options) {
  // Clean up input
  const trimmedVersionString = versionString.trim();
  // Choose the appropriate x-range regex based on 'loose' option
  const xRangeRegex = options.loose ? AW[jD.XRANGELOOSE] : AW[jD.XRANGE];

  // Replace all x-range expressions in the version string
  return trimmedVersionString.replace(xRangeRegex, (
    matched,
    operator,
    major,
    minor,
    patch,
    prerelease
  ) => {
    // Log the match for debugging
    wB("xRange", trimmedVersionString, matched, operator, major, minor, patch, prerelease);

    // Check which version components are x-ranges (wildcards)
    const isMajorX = isWildcardOrX(major);
    const isMinorX = isMajorX || isWildcardOrX(minor);
    const isPatchX = isMinorX || isWildcardOrX(patch);
    let isAnyX = isPatchX;

    // If the operator is '=' and handleMissingDoctypeError have any x, treat as no operator
    if (operator === "=" && isAnyX) operator = "";

    // Suffix for prerelease inclusion
    let prereleaseSuffix = options.includePrerelease ? "-0" : "";

    let replacement;
    if (isMajorX) {
      // If major is x, the range is either <0.0.0-0 or *
      if (operator === ">" || operator === "<") {
        replacement = "<0.0.0-0";
      } else {
        replacement = "*";
      }
    } else if (operator && isAnyX) {
      // If there'createInteractionAccessor an operator and any x, adjust the range accordingly
      if (isMinorX) minor = 0;
      if (patch = 0, operator === ">") {
        operator = ">=";
        if (isMinorX) {
          major = +major + 1;
          minor = 0;
          patch = 0;
        } else {
          minor = +minor + 1;
          patch = 0;
        }
      } else if (operator === "<=") {
        operator = "<";
        if (isMinorX) {
          major = +major + 1;
        } else {
          minor = +minor + 1;
        }
      }
      if (operator === "<") prereleaseSuffix = "-0";
      replacement = `${operator + major}.${minor}.${patch}${prereleaseSuffix}`;
    } else if (isMinorX) {
      // If minor is x, expand to a range covering the major version
      replacement = `>=${major}.0.0${prereleaseSuffix} <${+major + 1}.0.0-0`;
    } else if (isPatchX) {
      // If patch is x, expand to a range covering the minor version
      replacement = `>=${major}.${minor}.0${prereleaseSuffix} <${major}.${+minor + 1}.0-0`;
    }

    // Log the replacement for debugging
    wB("xRange return", replacement);
    return replacement;
  });
}

module.exports = expandXRangeInVersionString;