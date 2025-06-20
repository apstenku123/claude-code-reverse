/**
 * Sets JPEG XL (JXL) encoding options based on the provided configuration object.
 * Validates each option and updates the corresponding property in this.options.
 * Throws an error if any option is invalid.
 *
 * @param {Object} jxlConfig - Configuration object for JXL encoding options.
 * @param {number} [jxlConfig.quality] - Quality setting (integer between 1 and 100).
 * @param {number} [jxlConfig.distance] - Distance setting (number between 0.0 and 15.0).
 * @param {number} [jxlConfig.decodingTier] - Decoding tier (integer between 0 and 4).
 * @param {boolean} [jxlConfig.lossless] - Whether to use lossless compression.
 * @param {number} [jxlConfig.effort] - Effort level (integer between 3 and 9).
 * @returns {any} The result of updating the output format to 'jxl' with the given configuration.
 * @throws {Error} If any configuration parameter is invalid.
 */
function setJxlOptions(jxlConfig) {
  // Ensure the input is an object
  if (x1.object(jxlConfig)) {
    // Handle quality parameter
    if (x1.defined(jxlConfig.quality)) {
      if (x1.integer(jxlConfig.quality) && x1.inRange(jxlConfig.quality, 1, 100)) {
        // Calculate jxlDistance based on quality
        this.options.jxlDistance = jxlConfig.quality >= 30
          ? 0.1 + (100 - jxlConfig.quality) * 0.09
          : 0.017666666666666667 * jxlConfig.quality * jxlConfig.quality - 1.15 * jxlConfig.quality + 25;
      } else {
        throw x1.invalidParameterError("quality", "integer between 1 and 100", jxlConfig.quality);
      }
    } else if (x1.defined(jxlConfig.distance)) {
      // Handle distance parameter
      if (x1.number(jxlConfig.distance) && x1.inRange(jxlConfig.distance, 0, 15)) {
        this.options.jxlDistance = jxlConfig.distance;
      } else {
        throw x1.invalidParameterError("distance", "number between 0.0 and 15.0", jxlConfig.distance);
      }
    }

    // Handle decodingTier parameter
    if (x1.defined(jxlConfig.decodingTier)) {
      if (x1.integer(jxlConfig.decodingTier) && x1.inRange(jxlConfig.decodingTier, 0, 4)) {
        this.options.jxlDecodingTier = jxlConfig.decodingTier;
      } else {
        throw x1.invalidParameterError("decodingTier", "integer between 0 and 4", jxlConfig.decodingTier);
      }
    }

    // Handle lossless parameter
    if (x1.defined(jxlConfig.lossless)) {
      if (x1.bool(jxlConfig.lossless)) {
        this.options.jxlLossless = jxlConfig.lossless;
      } else {
        throw x1.invalidParameterError("lossless", "boolean", jxlConfig.lossless);
      }
    }

    // Handle effort parameter
    if (x1.defined(jxlConfig.effort)) {
      if (x1.integer(jxlConfig.effort) && x1.inRange(jxlConfig.effort, 3, 9)) {
        this.options.jxlEffort = jxlConfig.effort;
      } else {
        throw x1.invalidParameterError("effort", "integer between 3 and 9", jxlConfig.effort);
      }
    }
  }
  // Update the output format to 'jxl' with the provided configuration
  return this._updateFormatOut("jxl", jxlConfig);
}

module.exports = setJxlOptions;
