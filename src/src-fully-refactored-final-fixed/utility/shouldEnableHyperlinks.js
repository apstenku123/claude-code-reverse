/**
 * Determines whether terminal hyperlinks should be enabled based on environment variables,
 * command-line flags, terminal capabilities, and platform specifics.
 *
 * @param {Object} stream - The stream object (e.g., process.stdout) to check for TTY and color support.
 * @returns {boolean} True if hyperlinks should be enabled, false otherwise.
 */
function shouldEnableHyperlinks(stream) {
  const { env: environment } = process;

  // Explicit override via environment variable
  if ("FORCE_HYPERLINK" in environment) {
    // If FORCE_HYPERLINK is set to a non-empty string and not '0', enable hyperlinks
    return !(
      environment.FORCE_HYPERLINK.length > 0 &&
      parseInt(environment.FORCE_HYPERLINK, 10) === 0
    );
  }

  // Command-line flags or environment variables that explicitly disable hyperlinks
  if (
    oh("no-hyperlink") ||
    oh("no-hyperlinks") ||
    oh("hyperlink=false") ||
    oh("hyperlink=never")
  ) {
    return false;
  }

  // Command-line flags or environment variables that explicitly enable hyperlinks
  if (
    oh("hyperlink=true") ||
    oh("hyperlink=always")
  ) {
    return true;
  }

  // Netlify CI/CD environment always supports hyperlinks
  if ("NETLIFY" in environment) {
    return true;
  }

  // If color is not supported, hyperlinks are not supported
  if (!createRangeIterator$6.supportsColor(stream)) {
    return false;
  }

  // If the stream is not a TTY, hyperlinks are not supported
  if (stream && !stream.isTTY) {
    return false;
  }

  // Windows platform does not support hyperlinks
  if (process.platform === "win32") {
    return false;
  }

  // CI environments generally do not support hyperlinks
  if ("CI" in environment) {
    return false;
  }

  // TeamCity CI environment does not support hyperlinks
  if ("TEAMCITY_VERSION" in environment) {
    return false;
  }

  // Check for specific terminal programs and their versions
  if ("TERM_PROGRAM" in environment) {
    const termProgramVersion = $i0(environment.TERM_PROGRAM_VERSION);
    switch (environment.TERM_PROGRAM) {
      case "iTerm.app":
        // iTerm.app supports hyperlinks from version 3.1+
        if (termProgramVersion.major === 3) {
          return termProgramVersion.minor >= 1;
        }
        return termProgramVersion.major > 3;
      case "WezTerm":
        // WezTerm supports hyperlinks from version 20200620+
        return termProgramVersion.major >= 20200620;
      case "vscode":
        // VSCode supports hyperlinks from version 1.72+
        return (
          termProgramVersion.major > 1 ||
          (termProgramVersion.major === 1 && termProgramVersion.minor >= 72)
        );
    }
  }

  // Check for VTE-based terminals and their versions
  if ("VTE_VERSION" in environment) {
    // VTE version 0.50.0 is known to be broken
    if (environment.VTE_VERSION === "0.50.0") {
      return false;
    }
    const vteVersion = $i0(environment.VTE_VERSION);
    // VTE supports hyperlinks from version 0.50+
    return vteVersion.major > 0 || vteVersion.minor >= 50;
  }

  // Default: hyperlinks are not supported
  return false;
}

module.exports = shouldEnableHyperlinks;