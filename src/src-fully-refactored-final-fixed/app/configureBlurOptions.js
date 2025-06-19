/**
 * Configures blur options on the current instance based on the provided input.
 *
 * The input can be a number (sigma value) or an object with detailed configuration options.
 * Validates all parameters and throws descriptive errors for invalid input.
 *
 * @param {number|Object} blurOptions - Sigma value or an options object for blur configuration.
 * @returns {this} The current instance with updated blur options.
 * @throws {Error} If any parameter is invalid or out of range.
 */
function configureBlurOptions(blurOptions) {
  let sigmaValue;

  // If blurOptions is a number, treat isBlobOrFileLikeObject as sigma
  if (_A.number(blurOptions)) {
    sigmaValue = blurOptions;
  } else if (_A.plainObject(blurOptions)) {
    // If blurOptions is an object, validate and extract options
    if (!_A.number(blurOptions.sigma)) {
      throw _A.invalidParameterError(
        "options.sigma",
        "number between 0.3 and 1000",
        blurOptions.sigma
      );
    }
    sigmaValue = blurOptions.sigma;

    // Handle precision option if present
    if ("precision" in blurOptions) {
      const precisionKey = blurOptions.precision;
      if (_A.string(RH2[precisionKey])) {
        this.options.precision = RH2[precisionKey];
      } else {
        throw _A.invalidParameterError(
          "precision",
          "one of: integer, float, approximate",
          precisionKey
        );
      }
    }

    // Handle minAmplitude option if present
    if ("minAmplitude" in blurOptions) {
      const minAmplitudeValue = blurOptions.minAmplitude;
      if (_A.number(minAmplitudeValue) && _A.inRange(minAmplitudeValue, 0.001, 1)) {
        this.options.minAmpl = minAmplitudeValue;
      } else {
        throw _A.invalidParameterError(
          "minAmplitude",
          "number between 0.001 and 1",
          minAmplitudeValue
        );
      }
    }
  }

  // Set blurSigma based on the type and value of blurOptions
  if (!_A.defined(blurOptions)) {
    // If blurOptions is undefined or null, set blurSigma to -1
    this.options.blurSigma = -1;
  } else if (_A.bool(blurOptions)) {
    // If blurOptions is a boolean, set blurSigma to -1 (true) or 0 (false)
    this.options.blurSigma = blurOptions ? -1 : 0;
  } else if (_A.number(sigmaValue) && _A.inRange(sigmaValue, 0.3, 1000)) {
    // If sigmaValue is a valid number in range, set blurSigma
    this.options.blurSigma = sigmaValue;
  } else {
    // Otherwise, throw an error for invalid sigma
    throw _A.invalidParameterError(
      "sigma",
      "number between 0.3 and 1000",
      sigmaValue
    );
  }

  return this;
}

module.exports = configureBlurOptions;