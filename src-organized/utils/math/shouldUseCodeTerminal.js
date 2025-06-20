/**
 * Determines whether the code terminal should be used based on internal flags or environment variable.
 *
 * Checks two internal flags (`isCodeTerminalEnabled`, `isTerminalFeatureActive`) and the environment variable `FORCE_CODE_TERMINAL`.
 * Returns true if any of these are truthy.
 *
 * @returns {boolean} True if the code terminal should be used, otherwise false.
 */
function shouldUseCodeTerminal() {
  // Check if either internal flag is set or if the environment variable is truthy
  return (
    isCodeTerminalEnabled ||
    isTerminalFeatureActive ||
    Boolean(process.env.FORCE_CODE_TERMINAL)
  );
}

module.exports = shouldUseCodeTerminal;