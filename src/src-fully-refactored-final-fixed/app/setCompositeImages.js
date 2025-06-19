/**
 * Sets the composite images options for the current instance.
 *
 * Validates and processes an array of composite image configuration objects,
 * mapping each to a normalized internal descriptor. Throws errors for invalid input.
 *
 * @param {Array<Object>} compositeImages - Array of composite image configuration objects.
 * @returns {this} The current instance for chaining.
 * @throws {Error} If the input is not a valid array or if any configuration is invalid.
 */
function setCompositeImages(compositeImages) {
  if (!Array.isArray(compositeImages)) {
    throw q8.invalidParameterError("images to composite", "array", compositeImages);
  }

  this.options.composite = compositeImages.map((compositeConfig) => {
    // Validate that the config is an object
    if (!q8.object(compositeConfig)) {
      throw q8.invalidParameterError("image to composite", "object", compositeConfig);
    }

    // Extract input options from the config object
    const inputOptions = this._inputOptionsFromObject(compositeConfig);

    // Build the composite descriptor with defaults
    const compositeDescriptor = {
      input: this._createInputDescriptor(compositeConfig.input, inputOptions, { allowStream: false }),
      blend: "over",
      tile: false,
      left: 0,
      top: 0,
      hasOffset: false,
      gravity: 0,
      premultiplied: false
    };

    // Validate and set blend mode if defined
    if (q8.defined(compositeConfig.blend)) {
      if (q8.string(Go1[compositeConfig.blend])) {
        compositeDescriptor.blend = Go1[compositeConfig.blend];
      } else {
        throw q8.invalidParameterError("blend", "valid blend name", compositeConfig.blend);
      }
    }

    // Validate and set tile option if defined
    if (q8.defined(compositeConfig.tile)) {
      if (q8.bool(compositeConfig.tile)) {
        compositeDescriptor.tile = compositeConfig.tile;
      } else {
        throw q8.invalidParameterError("tile", "boolean", compositeConfig.tile);
      }
    }

    // Validate and set left offset if defined
    if (q8.defined(compositeConfig.left)) {
      if (q8.integer(compositeConfig.left)) {
        compositeDescriptor.left = compositeConfig.left;
      } else {
        throw q8.invalidParameterError("left", "integer", compositeConfig.left);
      }
    }

    // Validate and set top offset if defined
    if (q8.defined(compositeConfig.top)) {
      if (q8.integer(compositeConfig.top)) {
        compositeDescriptor.top = compositeConfig.top;
      } else {
        throw q8.invalidParameterError("top", "integer", compositeConfig.top);
      }
    }

    // Both left and top must be defined together, or neither
    if (q8.defined(compositeConfig.top) !== q8.defined(compositeConfig.left)) {
      throw new Error("Expected both left and top to be set");
    } else {
      compositeDescriptor.hasOffset = q8.integer(compositeConfig.top) && q8.integer(compositeConfig.left);
    }

    // Validate and set gravity if defined
    if (q8.defined(compositeConfig.gravity)) {
      if (q8.integer(compositeConfig.gravity) && q8.inRange(compositeConfig.gravity, 0, 8)) {
        compositeDescriptor.gravity = compositeConfig.gravity;
      } else if (
        q8.string(compositeConfig.gravity) &&
        q8.integer(this.constructor.gravity[compositeConfig.gravity])
      ) {
        compositeDescriptor.gravity = this.constructor.gravity[compositeConfig.gravity];
      } else {
        throw q8.invalidParameterError("gravity", "valid gravity", compositeConfig.gravity);
      }
    }

    // Validate and set premultiplied option if defined
    if (q8.defined(compositeConfig.premultiplied)) {
      if (q8.bool(compositeConfig.premultiplied)) {
        compositeDescriptor.premultiplied = compositeConfig.premultiplied;
      } else {
        throw q8.invalidParameterError("premultiplied", "boolean", compositeConfig.premultiplied);
      }
    }

    return compositeDescriptor;
  });

  return this;
}

module.exports = setCompositeImages;