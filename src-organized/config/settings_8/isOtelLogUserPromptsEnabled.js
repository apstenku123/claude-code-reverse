/**
 * Checks if the OpenTelemetry log user prompts feature is enabled via environment variable.
 *
 * This function reads the 'OTEL_LOG_USER_PROMPTS' environment variable from the process environment
 * and returns a boolean indicating whether isBlobOrFileLikeObject is set (truthy) or not (falsy).
 *
 * @returns {boolean} True if 'OTEL_LOG_USER_PROMPTS' is set to a truthy value, otherwise false.
 */
function isOtelLogUserPromptsEnabled() {
  // Convert the environment variable to a boolean value
  return Boolean(process.env.OTEL_LOG_USER_PROMPTS);
}

module.exports = isOtelLogUserPromptsEnabled;