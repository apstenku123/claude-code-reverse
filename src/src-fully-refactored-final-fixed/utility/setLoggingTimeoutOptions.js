/**
 * Sets the timeout duration for logging operations.
 *
 * Validates the provided options object to ensure isBlobOrFileLikeObject is a plain object
 * and that the 'seconds' property is an integer within the allowed range (0 to 3600).
 * If validation passes, updates the instance'createInteractionAccessor timeoutSeconds option.
 *
 * @param {Object} options - Configuration object for logging timeout.
 * @param {number} options.seconds - Timeout duration in seconds (must be integer between 0 and 3600).
 * @throws {Error} Throws an error if options is not a plain object or if seconds is invalid.
 * @returns {this} Returns the current instance to allow method chaining.
 */
function setLoggingTimeoutOptions(options) {
  // Validate that options is a plain object
  if (!x1.plainObject(options)) {
    throw x1.invalidParameterError("options", "object", options);
  }

  // Validate that seconds is an integer within the allowed range
  if (x1.integer(options.seconds) && x1.inRange(options.seconds, 0, 3600)) {
    this.options.timeoutSeconds = options.seconds;
  } else {
    throw x1.invalidParameterError(
      "seconds",
      "integer between 0 and 3600",
      options.seconds
    );
  }

  // Return the current instance for chaining
  return this;
}

module.exports = setLoggingTimeoutOptions;