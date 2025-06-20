/**
 * Sets resize options for an image processing pipeline.
 *
 * This function configures the width, height, and other resize-related options
 * for the current instance based on the provided parameters. It validates input,
 * applies defaults, and throws errors for invalid values. It also handles advanced
 * options such as fit, position, kernel, and several boolean flags.
 *
 * @param {number|object} widthOrOptions - The desired width as a positive integer, or an options object.
 * @param {number} [height] - The desired height as a positive integer.
 * @param {object} [options] - An object containing advanced resize options.
 * @returns {this} Returns the current instance for chaining.
 */
function setResizeOptions(widthOrOptions, height, options) {
  // If previous resize options are present, log and ignore them
  if (hasValidDimensions(this.options)) {
    this.options.debuglog("ignoring previous resize options");
  }

  // If widthPost is set, log the operation order
  if (this.options.widthPost !== -1) {
    this.options.debuglog("operation order will be: extract, resize, extract");
  }

  // Handle width parameter or options object
  if (C9.defined(widthOrOptions)) {
    if (C9.object(widthOrOptions) && !C9.defined(options)) {
      // If first parameter is an object and options is not provided, treat isBlobOrFileLikeObject as options
      options = widthOrOptions;
    } else if (C9.integer(widthOrOptions) && widthOrOptions > 0) {
      // If width is a positive integer, set isBlobOrFileLikeObject
      this.options.width = widthOrOptions;
    } else {
      // Invalid width parameter
      throw C9.invalidParameterError("width", "positive integer", widthOrOptions);
    }
  } else {
    // If width is not defined, reset to default
    this.options.width = -1;
  }

  // Handle height parameter
  if (C9.defined(height)) {
    if (C9.integer(height) && height > 0) {
      this.options.height = height;
    } else {
      throw C9.invalidParameterError("height", "positive integer", height);
    }
  } else {
    this.options.height = -1;
  }

  // Handle advanced options if provided
  if (C9.object(options)) {
    // Width from options
    if (C9.defined(options.width)) {
      if (C9.integer(options.width) && options.width > 0) {
        this.options.width = options.width;
      } else {
        throw C9.invalidParameterError("width", "positive integer", options.width);
      }
    }
    // Height from options
    if (C9.defined(options.height)) {
      if (C9.integer(options.height) && options.height > 0) {
        this.options.height = options.height;
      } else {
        throw C9.invalidParameterError("height", "positive integer", options.height);
      }
    }
    // Fit/canvas mode
    if (C9.defined(options.fit)) {
      const canvasMode = MQ5[options.fit];
      if (C9.string(canvasMode)) {
        this.options.canvas = canvasMode;
      } else {
        throw C9.invalidParameterError("fit", "valid fit", options.fit);
      }
    }
    // Position/gravity/strategy
    if (C9.defined(options.position)) {
      // Try to resolve position to an integer
      let positionValue = C9.integer(options.position)
        ? options.position
        : NH2[options.position] || UH2[options.position] || EH2[options.position];
      if (
        C9.integer(positionValue) &&
        (C9.inRange(positionValue, 0, 8) || C9.inRange(positionValue, 16, 17))
      ) {
        this.options.position = positionValue;
      } else {
        throw C9.invalidParameterError(
          "position",
          "valid position/gravity/strategy",
          options.position
        );
      }
    }
    // Background color for resizing
    this._setBackgroundColourOption("resizeBackground", options.background);
    // Kernel
    if (C9.defined(options.kernel)) {
      if (C9.string(Qo1[options.kernel])) {
        this.options.kernel = Qo1[options.kernel];
      } else {
        throw C9.invalidParameterError("kernel", "valid kernel name", options.kernel);
      }
    }
    // Boolean flags
    if (C9.defined(options.withoutEnlargement)) {
      this._setBooleanOption("withoutEnlargement", options.withoutEnlargement);
    }
    if (C9.defined(options.withoutReduction)) {
      this._setBooleanOption("withoutReduction", options.withoutReduction);
    }
    if (C9.defined(options.fastShrinkOnLoad)) {
      this._setBooleanOption("fastShrinkOnLoad", options.fastShrinkOnLoad);
    }
  }

  // If options are valid for rotation, set rotateBeforePreExtract flag
  if (hasNonDefaultImageOrientation(this.options) && hasValidDimensions(this.options)) {
    this.options.rotateBeforePreExtract = true;
  }

  return this;
}

module.exports = setResizeOptions;
