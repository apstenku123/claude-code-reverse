/**
 * Applies JXL (JPEG XL) encoding options to the current instance based on the provided configuration object.
 * Validates and sets options such as quality, distance, decoding tier, lossless mode, and effort.
 * Throws an error if any parameter is invalid.
 *
 * @param {Object} jxlOptions - Configuration object for JXL encoding options.
 * @param {number} [jxlOptions.quality] - Quality level (integer between 1 and 100).
 * @param {number} [jxlOptions.distance] - Distance parameter (number between 0.0 and 15.0).
 * @param {number} [jxlOptions.decodingTier] - Decoding tier (integer between 0 and 4).
 * @param {boolean} [jxlOptions.lossless] - Whether to use lossless compression.
 * @param {number} [jxlOptions.effort] - Effort level (integer between 3 and 9).
 * @returns {any} The result of updating the output format with the given options.
 * @throws {Error} If any parameter is invalid.
 */
function applyJxlOptions(jxlOptions) {
  // Ensure the input is an object
  if (x1.object(jxlOptions)) {
    // Handle quality parameter
    if (x1.defined(jxlOptions.quality)) {
      if (x1.integer(jxlOptions.quality) && x1.inRange(jxlOptions.quality, 1, 100)) {
        // For quality >= 30, use one formula; otherwise, use another
        this.options.jxlDistance = jxlOptions.quality >= 30
          ? 0.1 + (100 - jxlOptions.quality) * 0.09
          : 0.017666666666666667 * jxlOptions.quality * jxlOptions.quality - 1.15 * jxlOptions.quality + 25;
      } else {
        throw x1.invalidParameterError("quality", "integer between 1 and 100", jxlOptions.quality);
      }
    } else if (x1.defined(jxlOptions.distance)) {
      // Handle distance parameter
      if (x1.number(jxlOptions.distance) && x1.inRange(jxlOptions.distance, 0, 15)) {
        this.options.jxlDistance = jxlOptions.distance;
      } else {
        throw x1.invalidParameterError("distance", "number between 0.0 and 15.0", jxlOptions.distance);
      }
    }

    // Handle decodingTier parameter
    if (x1.defined(jxlOptions.decodingTier)) {
      if (x1.integer(jxlOptions.decodingTier) && x1.inRange(jxlOptions.decodingTier, 0, 4)) {
        this.options.jxlDecodingTier = jxlOptions.decodingTier;
      } else {
        throw x1.invalidParameterError("decodingTier", "integer between 0 and 4", jxlOptions.decodingTier);
      }
    }

    // Handle lossless parameter
    if (x1.defined(jxlOptions.lossless)) {
      if (x1.bool(jxlOptions.lossless)) {
        this.options.jxlLossless = jxlOptions.lossless;
      } else {
        throw x1.invalidParameterError("lossless", "boolean", jxlOptions.lossless);
      }
    }

    // Handle effort parameter
    if (x1.defined(jxlOptions.effort)) {
      if (x1.integer(jxlOptions.effort) && x1.inRange(jxlOptions.effort, 3, 9)) {
        this.options.jxlEffort = jxlOptions.effort;
      } else {
        throw x1.invalidParameterError("effort", "integer between 3 and 9", jxlOptions.effort);
      }
    }
  }
  // Update the output format with the new options
  return this._updateFormatOut("jxl", jxlOptions);
}

module.exports = applyJxlOptions;