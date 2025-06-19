/**
 * Expands x-range version specifiers (like 1.x, 1.2.x, etc.) in a semver range string to their equivalent explicit comparator ranges.
 *
 * @param {string} rangeString - The semver range string potentially containing x-range specifiers.
 * @param {Object} options - Options object controlling parsing behavior.
 * @param {boolean} options.loose - If true, use loose parsing rules for semver.
 * @param {boolean} options.includePrerelease - If true, include prerelease versions in the range.
 * @returns {string} The range string with all x-range specifiers expanded to explicit comparators.
 */
function expandXRangeSpecifier(rangeString, options) {
  // Remove leading/trailing whitespace
  const trimmedRange = rangeString.trim();

  // Select the appropriate x-range regex based on 'loose' option
  const xRangeRegex = options.loose ? AW[jD.XRANGELOOSE] : AW[jD.XRANGE];

  // Replace all x-range specifiers in the range string
  return trimmedRange.replace(xRangeRegex, (
    matched,
    operator,         // e.g. '>', '<', '=', etc.
    majorVersion,     // e.g. '1' in '1.x'
    minorVersion,     // e.g. '2' in '1.2.x'
    patchVersion,     // e.g. '3' in '1.2.3.x'
    prerelease        // e.g. '-alpha' or undefined
  ) => {
    // Log the match for debugging
    wB("xRange", trimmedRange, matched, operator, majorVersion, minorVersion, patchVersion, prerelease);

    // Determine if each version part is an x (wildcard)
    const isMajorX = isWildcardOrX(majorVersion);
    const isMinorX = isMajorX || isWildcardOrX(minorVersion);
    const isPatchX = isMinorX || isWildcardOrX(patchVersion);

    let includePrereleaseSuffix = options.includePrerelease ? "-0" : "";
    let replacement;

    // If operator is '=' and there is a wildcard, treat as no operator
    if (operator === "=" && isPatchX) {
      operator = "";
    }

    // If major is a wildcard (e.g. 'x', '*', or undefined)
    if (isMajorX) {
      // For '>' or '<', convert to '<0.0.0-0', otherwise to '*'
      if (operator === ">" || operator === "<") {
        replacement = "<0.0.0-0";
      } else {
        replacement = "*";
      }
    }
    // If there is an operator and a wildcard in the minor or patch position
    else if (operator && isPatchX) {
      // If minor is a wildcard, set minor to 0
      if (isMinorX) minorVersion = 0;
      // Always set patch to 0
      patchVersion = 0;

      if (operator === ">") {
        // For '>1.x' or '>1.2.x', convert to '>=2.0.0' or '>=1.3.0'
        operator = ">=";
        if (isMinorX) {
          majorVersion = +majorVersion + 1;
          minorVersion = 0;
          patchVersion = 0;
        } else {
          minorVersion = +minorVersion + 1;
          patchVersion = 0;
        }
      } else if (operator === "<=") {
        // For '<=1.x' or '<=1.2.x', convert to '<2.0.0' or '<1.3.0'
        operator = "<";
        if (isMinorX) {
          majorVersion = +majorVersion + 1;
        } else {
          minorVersion = +minorVersion + 1;
        }
      }
      // For '<', always include prerelease suffix
      if (operator === "<") {
        includePrereleaseSuffix = "-0";
      }
      replacement = `${operator}${majorVersion}.${minorVersion}.${patchVersion}${includePrereleaseSuffix}`;
    }
    // If minor is a wildcard, expand to a range covering all patch/minor versions
    else if (isMinorX) {
      replacement = `>=${majorVersion}.0.0${includePrereleaseSuffix} <${+majorVersion + 1}.0.0-0`;
    }
    // If patch is a wildcard, expand to a range covering all patch versions
    else if (isPatchX) {
      replacement = `>=${majorVersion}.${minorVersion}.0${includePrereleaseSuffix} <${majorVersion}.${+minorVersion + 1}.0-0`;
    }

    // Log the replacement for debugging
    wB("xRange return", replacement);
    return replacement;
  });
}

module.exports = expandXRangeSpecifier;
