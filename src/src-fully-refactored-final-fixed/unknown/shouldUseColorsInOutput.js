/**
 * Determines whether colored output should be used in the CLI.
 *
 * Checks if the 'colors' property exists in the inspection options (ZXA.inspectOpts).
 * If present, returns its boolean value. Otherwise, checks if the current stderr is a TTY.
 *
 * @returns {boolean} True if colored output should be used, false otherwise.
 */
function shouldUseColorsInOutput() {
  // Check if the 'colors' option is explicitly set in inspection options
  if ('colors' in inspectionOptions) {
    return Boolean(inspectionOptions.colors);
  }
  // Fallback: check if stderr is a TTY (terminal)
  return terminalUtils.isatty(process.stderr.fd);
}

// External dependencies (assumed to be imported elsewhere in the actual codebase)
const inspectionOptions = ZXA.inspectOpts;
const terminalUtils = VK9;

module.exports = shouldUseColorsInOutput;