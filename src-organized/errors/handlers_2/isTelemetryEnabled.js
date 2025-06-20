/**
 * Checks if telemetry is enabled by reading the CLAUDE_CODE_ENABLE_TELEMETRY environment variable.
 *
 * @returns {boolean} Returns true if telemetry is enabled, false otherwise.
 */
function isTelemetryEnabled() {
  // Convert the environment variable to a boolean value
  return Boolean(process.env.CLAUDE_CODE_ENABLE_TELEMETRY);
}

module.exports = isTelemetryEnabled;