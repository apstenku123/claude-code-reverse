/**
 * Determines whether terminal hyperlink support should be enabled based on environment variables,
 * terminal capabilities, and platform-specific checks.
 *
 * @param {Object} stream - The output stream object (e.g., process.stdout) to check for TTY and color support.
 * @returns {boolean} True if hyperlinks should be enabled, false otherwise.
 */
function shouldEnableHyperlinkSupport(stream) {
  const { env: environment } = process;

  // Explicit override via environment variable
  if ("FORCE_HYPERLINK" in environment) {
    // If FORCE_HYPERLINK is set to a non-empty value and not 0, enable hyperlinks
    return !(
      environment.FORCE_HYPERLINK.length > 0 &&
      parseInt(environment.FORCE_HYPERLINK, 10) === 0
    );
  }

  // Disable if any CLI flags explicitly disable hyperlinks
  if (
    oh("no-hyperlink") ||
    oh("no-hyperlinks") ||
    oh("hyperlink=false") ||
    oh("hyperlink=never")
  ) {
    return false;
  }

  // Enable if any CLI flags explicitly enable hyperlinks
  if (
    oh("hyperlink=true") ||
    oh("hyperlink=always")
  ) {
    return true;
  }

  // Enable on Netlify CI
  if ("NETLIFY" in environment) {
    return true;
  }

  // Disable if color is not supported
  if (!createRangeIterator$6.supportsColor(stream)) {
    return false;
  }

  // Disable if stream is not a TTY
  if (stream && !stream.isTTY) {
    return false;
  }

  // Disable on Windows
  if (process.platform === "win32") {
    return false;
  }

  // Disable in CI environments
  if ("CI" in environment) {
    return false;
  }

  // Disable in TeamCity
  if ("TEAMCITY_VERSION" in environment) {
    return false;
  }

  // Check for specific terminal programs
  if ("TERM_PROGRAM" in environment) {
    const termProgramVersion = $i0(environment.TERM_PROGRAM_VERSION);
    switch (environment.TERM_PROGRAM) {
      case "iTerm.app":
        // iTerm >= 3.1 supports hyperlinks
        if (termProgramVersion.major === 3) {
          return termProgramVersion.minor >= 1;
        }
        return termProgramVersion.major > 3;
      case "WezTerm":
        // WezTerm >= 20200620 supports hyperlinks
        return termProgramVersion.major >= 20200620;
      case "vscode":
        // VSCode >= 1.72 supports hyperlinks
        return (
          termProgramVersion.major > 1 ||
          (termProgramVersion.major === 1 && termProgramVersion.minor >= 72)
        );
    }
  }

  // Check for VTE-based terminals
  if ("VTE_VERSION" in environment) {
    // VTE version 0.50.0 is known to be broken
    if (environment.VTE_VERSION === "0.50.0") {
      return false;
    }
    const vteVersion = $i0(environment.VTE_VERSION);
    // VTE >= 0.50 supports hyperlinks
    return vteVersion.major > 0 || vteVersion.minor >= 50;
  }

  // Default: hyperlinks not supported
  return false;
}

module.exports = shouldEnableHyperlinkSupport;