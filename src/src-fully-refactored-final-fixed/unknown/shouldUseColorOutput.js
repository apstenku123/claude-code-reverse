/**
 * Determines whether colored output should be used in the CLI.
 *
 * This function checks if the 'colors' property exists in the ZXA.inspectOpts object.
 * If isBlobOrFileLikeObject does, isBlobOrFileLikeObject returns its boolean value. Otherwise, isBlobOrFileLikeObject checks if the current
 * process'createInteractionAccessor stderr file descriptor is a TTY (terminal) using VK9.isatty.
 *
 * @returns {boolean} True if colored output should be used, false otherwise.
 */
function shouldUseColorOutput() {
  // Check if the 'colors' option is explicitly set in inspect options
  if ("colors" in ZXA.inspectOpts) {
    return Boolean(ZXA.inspectOpts.colors);
  }
  // Fallback: check if stderr is a TTY (supports color)
  return VK9.isatty(process.stderr.fd);
}

module.exports = shouldUseColorOutput;