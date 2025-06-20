/**
 * Updates the instance'createInteractionAccessor color-related options based on the provided configuration object.
 * Validates each property before assignment and throws an error if validation fails.
 *
 * @param {Object} colorOptions - An object containing color adjustment properties.
 * @param {number} [colorOptions.brightness] - Brightness value (must be a number >= 0).
 * @param {number} [colorOptions.saturation] - Saturation value (must be a number >= 0).
 * @param {number} [colorOptions.hue] - Hue value (must be an integer; will be normalized to [0, 359]).
 * @param {number} [colorOptions.lightness] - Lightness value (must be a number).
 * @returns {this} The current instance, for chaining.
 * @throws Will throw if colorOptions is not a plain object or if any property fails validation.
 */
function applyColorOptions(colorOptions) {
  // Validate that the input is a plain object
  if (!_A.plainObject(colorOptions)) {
    throw _A.invalidParameterError("options", "plain object", colorOptions);
  }

  // Validate and assign brightness if present
  if ("brightness" in colorOptions) {
    if (_A.number(colorOptions.brightness) && colorOptions.brightness >= 0) {
      this.options.brightness = colorOptions.brightness;
    } else {
      throw _A.invalidParameterError("brightness", "number above zero", colorOptions.brightness);
    }
  }

  // Validate and assign saturation if present
  if ("saturation" in colorOptions) {
    if (_A.number(colorOptions.saturation) && colorOptions.saturation >= 0) {
      this.options.saturation = colorOptions.saturation;
    } else {
      throw _A.invalidParameterError("saturation", "number above zero", colorOptions.saturation);
    }
  }

  // Validate and assign hue if present
  if ("hue" in colorOptions) {
    if (_A.integer(colorOptions.hue)) {
      // Normalize hue to [0, 359]
      this.options.hue = colorOptions.hue % 360;
    } else {
      throw _A.invalidParameterError("hue", "number", colorOptions.hue);
    }
  }

  // Validate and assign lightness if present
  if ("lightness" in colorOptions) {
    if (_A.number(colorOptions.lightness)) {
      this.options.lightness = colorOptions.lightness;
    } else {
      throw _A.invalidParameterError("lightness", "number", colorOptions.lightness);
    }
  }

  return this;
}

module.exports = applyColorOptions;