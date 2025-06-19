/**
 * Sets the extend options for the current instance, allowing for uniform or side-specific extension values.
 * Accepts either a positive integer (applies to all sides) or an object specifying individual sides and options.
 * Throws an error if invalid values are provided.
 *
 * @param {number|object} extendConfig - Either a positive integer (applies to all sides) or an object with side-specific extension values and options.
 * @param {number} [extendConfig.top] - Extension value for the top side (non-negative integer).
 * @param {number} [extendConfig.bottom] - Extension value for the bottom side (non-negative integer).
 * @param {number} [extendConfig.left] - Extension value for the left side (non-negative integer).
 * @param {number} [extendConfig.right] - Extension value for the right side (non-negative integer).
 * @param {string} [extendConfig.background] - Background color to use when extending.
 * @param {string} [extendConfig.extendWith] - Method to use for extending (e.g., 'background', 'copy', 'repeat', 'mirror').
 * @returns {this} Returns the current instance for chaining.
 * @throws {Error} Throws if parameters are invalid.
 */
function setExtendOptions(extendConfig) {
  // If a positive integer is provided, apply isBlobOrFileLikeObject to all sides
  if (C9.integer(extendConfig) && extendConfig > 0) {
    this.options.extendTop = extendConfig;
    this.options.extendBottom = extendConfig;
    this.options.extendLeft = extendConfig;
    this.options.extendRight = extendConfig;
  } else if (C9.object(extendConfig)) {
    // If an object is provided, check each side individually
    if (C9.defined(extendConfig.top)) {
      if (C9.integer(extendConfig.top) && extendConfig.top >= 0) {
        this.options.extendTop = extendConfig.top;
      } else {
        throw C9.invalidParameterError("top", "positive integer", extendConfig.top);
      }
    }
    if (C9.defined(extendConfig.bottom)) {
      if (C9.integer(extendConfig.bottom) && extendConfig.bottom >= 0) {
        this.options.extendBottom = extendConfig.bottom;
      } else {
        throw C9.invalidParameterError("bottom", "positive integer", extendConfig.bottom);
      }
    }
    if (C9.defined(extendConfig.left)) {
      if (C9.integer(extendConfig.left) && extendConfig.left >= 0) {
        this.options.extendLeft = extendConfig.left;
      } else {
        throw C9.invalidParameterError("left", "positive integer", extendConfig.left);
      }
    }
    if (C9.defined(extendConfig.right)) {
      if (C9.integer(extendConfig.right) && extendConfig.right >= 0) {
        this.options.extendRight = extendConfig.right;
      } else {
        throw C9.invalidParameterError("right", "positive integer", extendConfig.right);
      }
    }

    // Set background color option if provided
    this._setBackgroundColourOption("extendBackground", extendConfig.background);

    // Set extendWith option if provided
    if (C9.defined(extendConfig.extendWith)) {
      // wH2 is a mapping of allowed extendWith values
      if (C9.string(wH2[extendConfig.extendWith])) {
        this.options.extendWith = wH2[extendConfig.extendWith];
      } else {
        throw C9.invalidParameterError(
          "extendWith",
          "one of: background, copy, repeat, mirror",
          extendConfig.extendWith
        );
      }
    }
  } else {
    // If neither a positive integer nor a valid object, throw error
    throw C9.invalidParameterError("extend", "integer or object", extendConfig);
  }
  return this;
}

module.exports = setExtendOptions;
