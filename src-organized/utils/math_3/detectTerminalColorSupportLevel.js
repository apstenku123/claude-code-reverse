/**
 * Determines the level of color support available in the current terminal environment.
 *
 * @param {Object} streamInfo - An object representing the output stream (e.g., process.stdout).
 *   Should have an isTTY property indicating if the stream is a TTY.
 * @returns {number} Color support level:
 *   0 = No color support
 *   1 = Basic (16 colors)
 *   2 = 256 colors
 *   3 = Truecolor (16 million colors)
 */
function detectTerminalColorSupportLevel(streamInfo) {
  // If color support is explicitly disabled, return 0
  if (fu === false) return 0;

  // Force truecolor support if any of these flags are present
  if (hK("color=16m") || hK("color=full") || hK("color=truecolor")) return 3;

  // Force 256 color support if this flag is present
  if (hK("color=256")) return 2;

  // If stream is not a TTY and color is not explicitly enabled, return 0
  if (streamInfo && !streamInfo.isTTY && fu !== true) return 0;

  // Default color support level if enabled: 1 (basic), else 0
  const defaultColorLevel = fu ? 1 : 0;

  // Windows platform specific checks
  if (process.platform === "win32") {
    const osReleaseParts = uK5.release().split(".");
    const nodeMajorVersion = Number(process.versions.node.split(".")[0]);
    const osMajor = Number(osReleaseParts[0]);
    const osBuild = Number(osReleaseParts[2]);
    // Windows 10 build 10586+ supports 256 colors, 14931+ supports truecolor
    if (nodeMajorVersion >= 8 && osMajor >= 10 && osBuild >= 10586) {
      return osBuild >= 14931 ? 3 : 2;
    }
    return 1;
  }

  // Continuous Integration (CI) environments
  if ("CI" in cD) {
    const knownCIs = ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"];
    const isKnownCI = knownCIs.some(ciName => ciName in cD);
    if (isKnownCI || cD.CI_NAME === "codeship") return 1;
    return defaultColorLevel;
  }

  // TeamCity CI detection
  if ("TEAMCITY_VERSION" in cD) {
    // TeamCity 9.1+ supports color
    return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(cD.TEAMCITY_VERSION) ? 1 : 0;
  }

  // Terminal program detection
  if ("TERM_PROGRAM" in cD) {
    const termProgramVersion = parseInt((cD.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
    switch (cD.TERM_PROGRAM) {
      case "iTerm.app":
        return termProgramVersion >= 3 ? 3 : 2;
      case "Hyper":
        return 3;
      case "Apple_Terminal":
        return 2;
    }
  }

  // TERM variable patterns for 256 color support
  if (/-256(color)?$/i.test(cD.TERM)) return 2;

  // TERM variable patterns for basic color support
  if (/^screen|^xterm|^vt100|^rxvt|color|ansi|cygwin|linux/i.test(cD.TERM)) return 1;

  // COLORTERM variable presence indicates basic color support
  if ("COLORTERM" in cD) return 1;

  // 'dumb' terminal returns default color level
  if (cD.TERM === "dumb") return defaultColorLevel;

  // Fallback to default color level
  return defaultColorLevel;
}

module.exports = detectTerminalColorSupportLevel;
