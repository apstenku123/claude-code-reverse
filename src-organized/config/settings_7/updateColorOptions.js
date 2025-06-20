/**
 * Updates the color-related options (brightness, saturation, hue, lightness) for this instance.
 * Validates the input object and each property before updating.
 *
 * @param {Object} options - An object containing color option properties to update.
 * @param {number} [options.brightness] - Brightness value (must be a number >= 0).
 * @param {number} [options.saturation] - Saturation value (must be a number >= 0).
 * @param {number} [options.hue] - Hue value (must be an integer; will be normalized to 0-359).
 * @param {number} [options.lightness] - Lightness value (must be a number).
 * @returns {this} Returns the current instance for chaining.
 * @throws Will throw an error if the input is not a plain object or if any property fails validation.
 */
function updateColorOptions(options) {
  // Validate that the input is a plain object
  if (!_A.plainObject(options)) {
    throw _A.invalidParameterError("options", "plain object", options);
  }

  // Validate and update brightness if provided
  if ("brightness" in options) {
    if (_A.number(options.brightness) && options.brightness >= 0) {
      this.options.brightness = options.brightness;
    } else {
      throw _A.invalidParameterError("brightness", "number above zero", options.brightness);
    }
  }

  // Validate and update saturation if provided
  if ("saturation" in options) {
    if (_A.number(options.saturation) && options.saturation >= 0) {
      this.options.saturation = options.saturation;
    } else {
      throw _A.invalidParameterError("saturation", "number above zero", options.saturation);
    }
  }

  // Validate and update hue if provided
  if ("hue" in options) {
    if (_A.integer(options.hue)) {
      // Normalize hue to be within 0-359
      this.options.hue = options.hue % 360;
    } else {
      throw _A.invalidParameterError("hue", "number", options.hue);
    }
  }

  // Validate and update lightness if provided
  if ("lightness" in options) {
    if (_A.number(options.lightness)) {
      this.options.lightness = options.lightness;
    } else {
      throw _A.invalidParameterError("lightness", "number", options.lightness);
    }
  }

  // Return the current instance for chaining
  return this;
}

module.exports = updateColorOptions;
