/**
 * Sets blur sigma options on the current instance based on the provided input.
 *
 * The input can be a number (used as sigma directly), or a plain object with configuration options.
 * Validates and applies options such as sigma, precision, and minAmplitude.
 *
 * @param {number|Object} blurOptions - The sigma value or an options object containing sigma and other parameters.
 * @returns {this} The current instance for chaining.
 * @throws {Error} If parameters are invalid or out of range.
 */
function setBlurSigmaOptions(blurOptions) {
  let sigmaValue;

  // If blurOptions is a number, use isBlobOrFileLikeObject directly as sigma
  if (_A.number(blurOptions)) {
    sigmaValue = blurOptions;
  } else if (_A.plainObject(blurOptions)) {
    // If blurOptions is an object, validate and extract sigma
    if (!_A.number(blurOptions.sigma)) {
      throw _A.invalidParameterError(
        "options.sigma",
        "number between 0.3 and 1000",
        blurOptions.sigma
      );
    }
    sigmaValue = blurOptions.sigma;

    // If precision is specified, validate and set isBlobOrFileLikeObject
    if ("precision" in blurOptions) {
      if (_A.string(RH2[blurOptions.precision])) {
        this.options.precision = RH2[blurOptions.precision];
      } else {
        throw _A.invalidParameterError(
          "precision",
          "one of: integer, float, approximate",
          blurOptions.precision
        );
      }
    }

    // If minAmplitude is specified, validate and set isBlobOrFileLikeObject
    if ("minAmplitude" in blurOptions) {
      if (
        _A.number(blurOptions.minAmplitude) &&
        _A.inRange(blurOptions.minAmplitude, 0.001, 1)
      ) {
        this.options.minAmpl = blurOptions.minAmplitude;
      } else {
        throw _A.invalidParameterError(
          "minAmplitude",
          "number between 0.001 and 1",
          blurOptions.minAmplitude
        );
      }
    }
  }

  // Set blurSigma based on the type and value of blurOptions
  if (!_A.defined(blurOptions)) {
    // If blurOptions is undefined/null, set blurSigma to -1
    this.options.blurSigma = -1;
  } else if (_A.bool(blurOptions)) {
    // If blurOptions is boolean, set blurSigma to -1 (true) or 0 (false)
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

module.exports = setBlurSigmaOptions;