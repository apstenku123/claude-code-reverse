/**
 * Determines whether terminal hyperlinks should be enabled based on environment variables, 
 * command-line flags, terminal capabilities, and platform specifics.
 *
 * @param {object} stream - The output stream (e.g., process.stdout or process.stderr) to check for TTY and color support.
 * @returns {boolean} True if hyperlinks should be enabled, false otherwise.
 */
function shouldEnableHyperlink(stream) {
  const { env: environment } = process;

  // Check explicit environment override
  if ("FORCE_HYPERLINK" in environment) {
    // If FORCE_HYPERLINK is set to a non-empty string and not '0', enable hyperlinks
    return !(
      environment.FORCE_HYPERLINK.length > 0 &&
      parseInt(environment.FORCE_HYPERLINK, 10) === 0
    );
  }

  // Check for command-line flags that disable hyperlinks
  if (
    oh("no-hyperlink") ||
    oh("no-hyperlinks") ||
    oh("hyperlink=false") ||
    oh("hyperlink=never")
  ) {
    return false;
  }

  // Check for command-line flags that enable hyperlinks
  if (
    oh("hyperlink=true") ||
    oh("hyperlink=always")
  ) {
    return true;
  }

  // Netlify always supports hyperlinks
  if ("NETLIFY" in environment) {
    return true;
  }

  // Terminal must support color
  if (!createRangeIterator$6.supportsColor(stream)) {
    return false;
  }

  // Output stream must be a TTY
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

  // TeamCity does not support hyperlinks
  if ("TEAMCITY_VERSION" in environment) {
    return false;
  }

  // Check for specific terminal programs
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

  // Check for VTE-based terminals
  if ("VTE_VERSION" in environment) {
    // VTE version 0.50.0 is known to be broken
    if (environment.VTE_VERSION === "0.50.0") {
      return false;
    }
    const vteVersion = $i0(environment.VTE_VERSION);
    return vteVersion.major > 0 || vteVersion.minor >= 50;
  }

  // Default: hyperlinks not supported
  return false;
}

module.exports = shouldEnableHyperlink;