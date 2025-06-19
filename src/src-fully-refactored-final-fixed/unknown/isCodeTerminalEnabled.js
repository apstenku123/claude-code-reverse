/**
 * Determines if the code terminal feature is enabled based on runtime flags or environment variables.
 *
 * Checks if either the runtime flag `isTerminalEnabled`, the configuration flag `isTerminalForced`,
 * or the environment variable `FORCE_CODE_TERMINAL` is set to a truthy value.
 *
 * @returns {boolean} True if code terminal is enabled by any of the flags or environment variable, otherwise false.
 */
function isCodeTerminalEnabled() {
  // Check if the runtime flag for enabling terminal is set
  const isTerminalEnabled = jR;
  // Check if the configuration forces the terminal to be enabled
  const isTerminalForced = kZ;
  // Check if the environment variable FORCE_CODE_TERMINAL is set (as a string)
  const isEnvForceTerminal = Boolean(process.env.FORCE_CODE_TERMINAL);

  // Return true if any of the above conditions are true
  return isTerminalEnabled || isTerminalForced || isEnvForceTerminal;
}

module.exports = isCodeTerminalEnabled;