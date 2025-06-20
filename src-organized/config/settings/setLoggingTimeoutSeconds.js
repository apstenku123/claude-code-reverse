/**
 * Sets the timeout (in seconds) for logging operations.
 *
 * Validates the provided options object and ensures the 'seconds' property is an integer between 0 and 3600.
 * Updates the instance'createInteractionAccessor timeoutSeconds option if validation passes.
 *
 * @param {Object} options - Configuration options for setting the logging timeout.
 * @param {number} options.seconds - The timeout duration in seconds (must be an integer between 0 and 3600).
 * @throws {Error} Throws an error if the options object or the seconds value is invalid.
 * @returns {this} Returns the current instance for chaining.
 */
function setLoggingTimeoutSeconds(options) {
  // Ensure the options parameter is a plain object
  if (!x1.plainObject(options)) {
    throw x1.invalidParameterError("options", "object", options);
  }

  // Validate that 'seconds' is an integer within the allowed range
  const { seconds } = options;
  const isValidSeconds = x1.integer(seconds) && x1.inRange(seconds, 0, 3600);

  if (isValidSeconds) {
    // Set the timeoutSeconds option
    this.options.timeoutSeconds = seconds;
  } else {
    throw x1.invalidParameterError(
      "seconds",
      "integer between 0 and 3600",
      seconds
    );
  }

  // Allow method chaining
  return this;
}

module.exports = setLoggingTimeoutSeconds;