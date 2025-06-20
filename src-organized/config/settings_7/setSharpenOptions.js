/**
 * Sets the sharpening options for the current instance based on provided parameters.
 *
 * This function configures sharpening parameters such as sigma, m1, m2, x1, y2, and y3
 * on the instance'createInteractionAccessor `options` property. It validates the input types and ranges, and throws
 * descriptive errors if any parameter is invalid.
 *
 * @param {number|boolean|object} sharpenSigmaOrOptions - The main sharpening parameter. Can be:
 *   - undefined: disables sharpening
 *   - boolean: true disables, false sets sigma to 0
 *   - number: sets sigma directly (must be between 0.01 and 10000)
 *   - object: advanced options with keys sigma, m1, m2, x1, y2, y3
 * @param {number} [flatness] - Optional. Flatness parameter (m1), number between 0 and 10000
 * @param {number} [jaggedness] - Optional. Jaggedness parameter (m2), number between 0 and 10000
 * @returns {this} Returns the current instance for chaining
 * @throws {Error} Throws if any parameter is invalid
 */
function setSharpenOptions(sharpenSigmaOrOptions, flatness, jaggedness) {
  // If no sharpening parameter is defined, disable sharpening
  if (!_A.defined(sharpenSigmaOrOptions)) {
    this.options.sharpenSigma = -1;
    return this;
  }

  // If a boolean is provided, set sharpenSigma accordingly
  if (_A.bool(sharpenSigmaOrOptions)) {
    this.options.sharpenSigma = sharpenSigmaOrOptions ? -1 : 0;
    return this;
  }

  // If a number is provided, validate and set sharpenSigma, and optionally m1/m2
  if (_A.number(sharpenSigmaOrOptions) && _A.inRange(sharpenSigmaOrOptions, 0.01, 1e4)) {
    this.options.sharpenSigma = sharpenSigmaOrOptions;

    // If flatness (m1) is defined, validate and set
    if (_A.defined(flatness)) {
      if (_A.number(flatness) && _A.inRange(flatness, 0, 1e4)) {
        this.options.sharpenM1 = flatness;
      } else {
        throw _A.invalidParameterError("flat", "number between 0 and 10000", flatness);
      }
    }

    // If jaggedness (m2) is defined, validate and set
    if (_A.defined(jaggedness)) {
      if (_A.number(jaggedness) && _A.inRange(jaggedness, 0, 1e4)) {
        this.options.sharpenM2 = jaggedness;
      } else {
        throw _A.invalidParameterError("jagged", "number between 0 and 10000", jaggedness);
      }
    }
    return this;
  }

  // If an object is provided, treat as advanced options
  if (_A.plainObject(sharpenSigmaOrOptions)) {
    const options = sharpenSigmaOrOptions;

    // Validate and set sigma
    if (_A.number(options.sigma) && _A.inRange(options.sigma, 0.000001, 10)) {
      this.options.sharpenSigma = options.sigma;
    } else {
      throw _A.invalidParameterError("options.sigma", "number between 0.000001 and 10", options.sigma);
    }

    // Validate and set m1 (flatness)
    if (_A.defined(options.m1)) {
      if (_A.number(options.m1) && _A.inRange(options.m1, 0, 1e6)) {
        this.options.sharpenM1 = options.m1;
      } else {
        throw _A.invalidParameterError("options.m1", "number between 0 and 1000000", options.m1);
      }
    }

    // Validate and set m2 (jaggedness)
    if (_A.defined(options.m2)) {
      if (_A.number(options.m2) && _A.inRange(options.m2, 0, 1e6)) {
        this.options.sharpenM2 = options.m2;
      } else {
        throw _A.invalidParameterError("options.m2", "number between 0 and 1000000", options.m2);
      }
    }

    // Validate and set x1
    if (_A.defined(options.x1)) {
      if (_A.number(options.x1) && _A.inRange(options.x1, 0, 1e6)) {
        this.options.sharpenX1 = options.x1;
      } else {
        throw _A.invalidParameterError("options.x1", "number between 0 and 1000000", options.x1);
      }
    }

    // Validate and set y2
    if (_A.defined(options.y2)) {
      if (_A.number(options.y2) && _A.inRange(options.y2, 0, 1e6)) {
        this.options.sharpenY2 = options.y2;
      } else {
        throw _A.invalidParameterError("options.y2", "number between 0 and 1000000", options.y2);
      }
    }

    // Validate and set y3
    if (_A.defined(options.y3)) {
      if (_A.number(options.y3) && _A.inRange(options.y3, 0, 1e6)) {
        this.options.sharpenY3 = options.y3;
      } else {
        throw _A.invalidParameterError("options.y3", "number between 0 and 1000000", options.y3);
      }
    }
    return this;
  }

  // If none of the above, throw an error for invalid sigma
  throw _A.invalidParameterError("sigma", "number between 0.01 and 10000", sharpenSigmaOrOptions);
}

module.exports = setSharpenOptions;
