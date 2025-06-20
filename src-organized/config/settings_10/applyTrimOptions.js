/**
 * Applies trimming-related options to the current instance based on the provided configuration object.
 *
 * This function validates and sets options for trimming, such as background color, threshold, and line art detection.
 * If the configuration is invalid, isBlobOrFileLikeObject throws an appropriate error. It also sets a flag to rotate before pre-extract if required.
 *
 * @param {Object} trimConfig - Configuration object containing trim options.
 * @param {string} [trimConfig.background] - The background color to use for trimming.
 * @param {number} [trimConfig.threshold] - The threshold value for trimming (must be a non-negative number).
 * @param {boolean} [trimConfig.lineArt] - Whether to enable line art trimming.
 * @returns {this} Returns the current instance for chaining.
 * @throws {Error} Throws if the configuration object or its properties are invalid.
 */
function applyTrimOptions(trimConfig) {
  // Set default trim threshold
  this.options.trimThreshold = 10;

  // Validate that the config object is defined
  if (C9.defined(trimConfig)) {
    // Ensure the config is an object
    if (C9.object(trimConfig)) {
      // Set background color option if provided
      if (C9.defined(trimConfig.background)) {
        this._setBackgroundColourOption("trimBackground", trimConfig.background);
      }
      // Set threshold if provided and valid
      if (C9.defined(trimConfig.threshold)) {
        if (C9.number(trimConfig.threshold) && trimConfig.threshold >= 0) {
          this.options.trimThreshold = trimConfig.threshold;
        } else {
          throw C9.invalidParameterError("threshold", "positive number", trimConfig.threshold);
        }
      }
      // Set line art option if provided
      if (C9.defined(trimConfig.lineArt)) {
        this._setBooleanOption("trimLineArt", trimConfig.lineArt);
      }
    } else {
      // Throw error if config is not an object
      throw C9.invalidParameterError("trim", "object", trimConfig);
    }
  }

  // If options require, set rotateBeforePreExtract flag
  if (hasNonDefaultImageOrientation(this.options)) {
    this.options.rotateBeforePreExtract = true;
  }

  return this;
}

module.exports = applyTrimOptions;