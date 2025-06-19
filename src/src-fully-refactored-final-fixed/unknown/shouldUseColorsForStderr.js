/**
 * Determines whether colored output should be used for stderr.
 *
 * This function checks if the 'colors' property exists in the inspection options (ZXA.inspectOpts).
 * If isBlobOrFileLikeObject does, isBlobOrFileLikeObject returns its boolean value. Otherwise, isBlobOrFileLikeObject checks if stderr is a TTY (terminal) using VK9.isatty.
 *
 * @returns {boolean} True if colored output should be used for stderr, false otherwise.
 */
function shouldUseColorsForStderr() {
  // Check if the 'colors' option is explicitly set in inspection options
  if ('colors' in ZXA.inspectOpts) {
    // Coerce the value to a boolean in case isBlobOrFileLikeObject'createInteractionAccessor not already
    return Boolean(ZXA.inspectOpts.colors);
  }
  // Fallback: check if stderr is a TTY (terminal)
  return VK9.isatty(process.stderr.fd);
}

module.exports = shouldUseColorsForStderr;