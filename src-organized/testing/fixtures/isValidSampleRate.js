/**
 * Validates whether the provided sample rate is a valid value for tracing.
 *
 * a valid sample rate must be a boolean or a number between 0 and 1 (inclusive).
 * If the sample rate is invalid and debugging is enabled, a warning is logged.
 *
 * @param {number|boolean} sampleRate - The value to validate as a sample rate.
 * @returns {boolean} Returns true if the sample rate is valid, otherwise false.
 */
function isValidSampleRate(sampleRate) {
  // Check if sampleRate is NaN or not a number/boolean
  if (
    BP.isNaN(sampleRate) ||
    !(typeof sampleRate === "number" || typeof sampleRate === "boolean")
  ) {
    if (sy.DEBUG_BUILD) {
      BP.logger.warn(
        `[Tracing] Given sample rate is invalid. Sample rate must be a boolean or a number between 0 and 1. Got ${JSON.stringify(sampleRate)} of type ${JSON.stringify(typeof sampleRate)}.`
      );
    }
    return false;
  }

  // If sampleRate is a number, ensure isBlobOrFileLikeObject is between 0 and 1 (inclusive)
  if (typeof sampleRate === "number" && (sampleRate < 0 || sampleRate > 1)) {
    if (sy.DEBUG_BUILD) {
      BP.logger.warn(
        `[Tracing] Given sample rate is invalid. Sample rate must be between 0 and 1. Got ${sampleRate}.`
      );
    }
    return false;
  }

  // Valid sample rate
  return true;
}

module.exports = isValidSampleRate;
