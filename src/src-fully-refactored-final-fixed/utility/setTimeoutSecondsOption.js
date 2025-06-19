/**
 * Sets the timeout (in seconds) for this.options if provided options are valid.
 *
 * @param {Object} options - Configuration object containing the timeout value.
 * @param {number} options.seconds - Timeout value in seconds (must be integer between 0 and 3600).
 * @throws {Error} Throws if options is not a plain object or if seconds is not a valid integer in range.
 * @returns {this} Returns the current instance for chaining.
 */
function setTimeoutSecondsOption(options) {
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

  // Allow method chaining
  return this;
}

module.exports = setTimeoutSecondsOption;