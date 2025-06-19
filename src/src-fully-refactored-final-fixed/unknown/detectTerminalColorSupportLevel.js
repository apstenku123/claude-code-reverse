/**
 * Determines the color support level of the current terminal environment.
 *
 * @param {any} inputA - Optional input, used for legacy/compatibility checks.
 * @param {any} inputB - Optional input, used for legacy/compatibility checks.
 * @returns {number} Color support level:
 *   0 = No color support
 *   1 = Basic color support (16 colors)
 *   2 = 256 color support
 *   3 = Truecolor (16 million colors) support
 */
function detectTerminalColorSupportLevel(inputA, inputB) {
  // If color support is explicitly set to 0, return no color support
  if (CO === 0) return 0;

  // Check for explicit color flags in the environment
  if (QC("color=16m") || QC("color=full") || QC("color=truecolor")) return 3;
  if (QC("color=256")) return 2;

  // Legacy/compatibility check: if inputA is truthy, inputB is falsy, and CO is undefined, return no color
  if (inputA && !inputB && CO === void 0) return 0;

  // Default color support value
  const colorSupportLevel = CO || 0;

  // If terminal type is 'dumb', return the default color support value
  if (SI.TERM === "dumb") return colorSupportLevel;

  // Windows platform-specific checks
  if (process.platform === "win32") {
    const osVersionParts = TB5.release().split(".");
    const majorVersion = Number(osVersionParts[0]);
    const buildNumber = Number(osVersionParts[2]);
    if (majorVersion >= 10 && buildNumber >= 10586) {
      // Windows 10 build 14931+ supports truecolor, otherwise 256 colors
      return buildNumber >= 14931 ? 3 : 2;
    }
    // Older Windows: basic color support
    return 1;
  }

  // Continuous Integration (CI) environment checks
  if ("CI" in SI) {
    const knownCIEnvs = [
      "TRAVIS",
      "CIRCLECI",
      "APPVEYOR",
      "GITLAB_CI",
      "GITHUB_ACTIONS",
      "BUILDKITE"
    ];
    // If running in a known CI environment or Codeship, return basic color support
    if (knownCIEnvs.some(envVar => envVar in SI) || SI.CI_NAME === "codeship") return 1;
    // Otherwise, return the default color support value
    return colorSupportLevel;
  }

  // TeamCity CI checks
  if ("TEAMCITY_VERSION" in SI) {
    // TeamCity 9.1+ supports color
    return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(SI.TEAMCITY_VERSION) ? 1 : 0;
  }

  // Check for truecolor support via COLORTERM
  if (SI.COLORTERM === "truecolor") return 3;

  // Terminal program-specific checks
  if ("TERM_PROGRAM" in SI) {
    const termProgramVersion = parseInt((SI.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
    switch (SI.TERM_PROGRAM) {
      case "iTerm.app":
        // iTerm 3+ supports truecolor, otherwise 256 colors
        return termProgramVersion >= 3 ? 3 : 2;
      case "Apple_Terminal":
        return 2;
    }
  }

  // Check for 256 color support in TERM variable
  if (/-256(color)?$/i.test(SI.TERM)) return 2;

  // Check for basic color support in TERM variable
  if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(SI.TERM)) return 1;

  // Fallback: if COLORTERM is present, assume basic color support
  if ("COLORTERM" in SI) return 1;

  // Default fallback: return the default color support value
  return colorSupportLevel;
}

module.exports = detectTerminalColorSupportLevel;