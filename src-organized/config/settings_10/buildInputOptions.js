/**
 * Builds and validates input options for image processing based on the provided input, options, and context.
 * Handles various input types (file path, Buffer, ArrayBuffer, TypedArray, plain object, etc.) and validates/normalizes options for downstream processing.
 * Throws descriptive errors for invalid or unsupported input types or option values.
 *
 * @param {*} input - The input source (file path, Buffer, ArrayBuffer, TypedArray, or options object)
 * @param {*} options - Optional configuration object for input processing
 * @param {*} context - Optional context object (e.g., for stream allowance)
 * @returns {Object} - Normalized and validated input options for image processing
 */
function buildInputOptions(input, options, context) {
  const inputOptions = {
    failOn: "warning",
    limitInputPixels: Math.pow(16383, 2),
    ignoreIcc: false,
    unlimited: false,
    sequentialRead: true
  };

  // Handle input source types
  if (lA.string(input)) {
    // Input is a file path
    inputOptions.file = input;
  } else if (lA.buffer(input)) {
    // Input is a Buffer
    if (input.length === 0) throw Error("Input Buffer is empty");
    inputOptions.buffer = input;
  } else if (lA.arrayBuffer(input)) {
    // Input is an ArrayBuffer
    if (input.byteLength === 0) throw Error("Input bit Array is empty");
    inputOptions.buffer = Buffer.from(input, 0, input.byteLength);
  } else if (lA.typedArray(input)) {
    // Input is a TypedArray
    if (input.length === 0) throw Error("Input Bit Array is empty");
    inputOptions.buffer = Buffer.from(input.buffer, input.byteOffset, input.byteLength);
  } else if (lA.plainObject(input) && !lA.defined(options)) {
    // Input is a plain object and options are not defined
    options = input;
    if (extractDefinedImageOptions(options)) inputOptions.buffer = [];
  } else if (!lA.defined(input) && !lA.defined(options) && lA.object(context) && context.allowStream) {
    // Input and options are undefined, but context allows stream
    inputOptions.buffer = [];
  } else {
    // Unsupported input type
    throw new Error(`Unsupported input '${input}' of type ${typeof input}${lA.defined(options) ? ` when also providing options of type ${typeof options}` : ""}`);
  }

  // Process options if provided
  if (lA.object(options)) {
    // failOnError: boolean (maps to failOn: "warning" or "none")
    if (lA.defined(options.failOnError)) {
      if (lA.bool(options.failOnError)) {
        inputOptions.failOn = options.failOnError ? "warning" : "none";
      } else {
        throw lA.invalidParameterError("failOnError", "boolean", options.failOnError);
      }
    }

    // failOn: string (must be one of allowed values)
    if (lA.defined(options.failOn)) {
      if (lA.string(options.failOn) && lA.inArray(options.failOn, ["none", "truncated", "error", "warning"])) {
        inputOptions.failOn = options.failOn;
      } else {
        throw lA.invalidParameterError("failOn", "one of: none, truncated, error, warning", options.failOn);
      }
    }

    // density: number (1-100000)
    if (lA.defined(options.density)) {
      if (lA.inRange(options.density, 1, 1e5)) {
        inputOptions.density = options.density;
      } else {
        throw lA.invalidParameterError("density", "number between 1 and 100000", options.density);
      }
    }

    // ignoreIcc: boolean
    if (lA.defined(options.ignoreIcc)) {
      if (lA.bool(options.ignoreIcc)) {
        inputOptions.ignoreIcc = options.ignoreIcc;
      } else {
        throw lA.invalidParameterError("ignoreIcc", "boolean", options.ignoreIcc);
      }
    }

    // limitInputPixels: boolean or integer
    if (lA.defined(options.limitInputPixels)) {
      if (lA.bool(options.limitInputPixels)) {
        inputOptions.limitInputPixels = options.limitInputPixels ? Math.pow(16383, 2) : 0;
      } else if (
        lA.integer(options.limitInputPixels) &&
        lA.inRange(options.limitInputPixels, 0, Number.MAX_SAFE_INTEGER)
      ) {
        inputOptions.limitInputPixels = options.limitInputPixels;
      } else {
        throw lA.invalidParameterError("limitInputPixels", "positive integer", options.limitInputPixels);
      }
    }

    // unlimited: boolean
    if (lA.defined(options.unlimited)) {
      if (lA.bool(options.unlimited)) {
        inputOptions.unlimited = options.unlimited;
      } else {
        throw lA.invalidParameterError("unlimited", "boolean", options.unlimited);
      }
    }

    // sequentialRead: boolean
    if (lA.defined(options.sequentialRead)) {
      if (lA.bool(options.sequentialRead)) {
        inputOptions.sequentialRead = options.sequentialRead;
      } else {
        throw lA.invalidParameterError("sequentialRead", "boolean", options.sequentialRead);
      }
    }

    // raw: {width, height, channels, [premultiplied]}
    if (lA.defined(options.raw)) {
      if (
        lA.object(options.raw) &&
        lA.integer(options.raw.width) && options.raw.width > 0 &&
        lA.integer(options.raw.height) && options.raw.height > 0 &&
        lA.integer(options.raw.channels) && lA.inRange(options.raw.channels, 1, 4)
      ) {
        inputOptions.rawWidth = options.raw.width;
        inputOptions.rawHeight = options.raw.height;
        inputOptions.rawChannels = options.raw.channels;
        inputOptions.rawPremultiplied = !!options.raw.premultiplied;
        // Determine rawDepth based on input TypedArray constructor
        switch (input.constructor) {
          case Uint8Array:
          case Uint8ClampedArray:
            inputOptions.rawDepth = "uchar";
            break;
          case Int8Array:
            inputOptions.rawDepth = "char";
            break;
          case Uint16Array:
            inputOptions.rawDepth = "ushort";
            break;
          case Int16Array:
            inputOptions.rawDepth = "short";
            break;
          case Uint32Array:
            inputOptions.rawDepth = "uint";
            break;
          case Int32Array:
            inputOptions.rawDepth = "int";
            break;
          case Float32Array:
            inputOptions.rawDepth = "float";
            break;
          case Float64Array:
            inputOptions.rawDepth = "double";
            break;
          default:
            inputOptions.rawDepth = "uchar";
            break;
        }
      } else {
        throw new Error("Expected width, height and channels for raw pixel input");
      }
    }

    // animated: boolean (maps to pages: -1 or 1)
    if (lA.defined(options.animated)) {
      if (lA.bool(options.animated)) {
        inputOptions.pages = options.animated ? -1 : 1;
      } else {
        throw lA.invalidParameterError("animated", "boolean", options.animated);
      }
    }

    // pages: integer (-1 to 100000)
    if (lA.defined(options.pages)) {
      if (lA.integer(options.pages) && lA.inRange(options.pages, -1, 1e5)) {
        inputOptions.pages = options.pages;
      } else {
        throw lA.invalidParameterError("pages", "integer between -1 and 100000", options.pages);
      }
    }

    // page: integer (0 to 100000)
    if (lA.defined(options.page)) {
      if (lA.integer(options.page) && lA.inRange(options.page, 0, 1e5)) {
        inputOptions.page = options.page;
      } else {
        throw lA.invalidParameterError("page", "integer between 0 and 100000", options.page);
      }
    }

    // level: integer (0 to 256)
    if (lA.defined(options.level)) {
      if (lA.integer(options.level) && lA.inRange(options.level, 0, 256)) {
        inputOptions.level = options.level;
      } else {
        throw lA.invalidParameterError("level", "integer between 0 and 256", options.level);
      }
    }

    // subifd: integer (-1 to 100000)
    if (lA.defined(options.subifd)) {
      if (lA.integer(options.subifd) && lA.inRange(options.subifd, -1, 1e5)) {
        inputOptions.subifd = options.subifd;
      } else {
        throw lA.invalidParameterError("subifd", "integer between -1 and 100000", options.subifd);
      }
    }

    // create: {width, height, channels, noise/background}
    if (lA.defined(options.create)) {
      if (
        lA.object(options.create) &&
        lA.integer(options.create.width) && options.create.width > 0 &&
        lA.integer(options.create.height) && options.create.height > 0 &&
        lA.integer(options.create.channels)
      ) {
        inputOptions.createWidth = options.create.width;
        inputOptions.createHeight = options.create.height;
        inputOptions.createChannels = options.create.channels;
        if (lA.defined(options.create.noise)) {
          // Noise creation
          if (!lA.object(options.create.noise)) throw new Error("Expected noise to be an object");
          if (!lA.inArray(options.create.noise.type, ["gaussian"])) throw new Error("Only gaussian noise is supported at the moment");
          if (!lA.inRange(options.create.channels, 1, 4)) throw lA.invalidParameterError("create.channels", "number between 1 and 4", options.create.channels);
          inputOptions.createNoiseType = options.create.noise.type;
          if (lA.number(options.create.noise.mean) && lA.inRange(options.create.noise.mean, 0, 1e4)) {
            inputOptions.createNoiseMean = options.create.noise.mean;
          } else {
            throw lA.invalidParameterError("create.noise.mean", "number between 0 and 10000", options.create.noise.mean);
          }
          if (lA.number(options.create.noise.sigma) && lA.inRange(options.create.noise.sigma, 0, 1e4)) {
            inputOptions.createNoiseSigma = options.create.noise.sigma;
          } else {
            throw lA.invalidParameterError("create.noise.sigma", "number between 0 and 10000", options.create.noise.sigma);
          }
        } else if (lA.defined(options.create.background)) {
          // Background creation
          if (!lA.inRange(options.create.channels, 3, 4)) throw lA.invalidParameterError("create.channels", "number between 3 and 4", options.create.channels);
          const backgroundColor = KQ5(options.create.background);
          inputOptions.createBackground = [
            backgroundColor.red(),
            backgroundColor.green(),
            backgroundColor.blue(),
            Math.round(backgroundColor.alpha() * 255)
          ];
        } else {
          throw new Error("Expected valid noise or background to create a new input image");
        }
        // Remove buffer if creating a new image
        delete inputOptions.buffer;
      } else {
        throw new Error("Expected valid width, height and channels to create a new input image");
      }
    }

    // text: {text, ...}
    if (lA.defined(options.text)) {
      if (lA.object(options.text) && lA.string(options.text.text)) {
        inputOptions.textValue = options.text.text;
        // Only one of height or dpi allowed
        if (lA.defined(options.text.height) && lA.defined(options.text.dpi)) {
          throw new Error("Expected only one of dpi or height");
        }
        if (lA.defined(options.text.font)) {
          if (lA.string(options.text.font)) {
            inputOptions.textFont = options.text.font;
          } else {
            throw lA.invalidParameterError("text.font", "string", options.text.font);
          }
        }
        if (lA.defined(options.text.fontfile)) {
          if (lA.string(options.text.fontfile)) {
            inputOptions.textFontfile = options.text.fontfile;
          } else {
            throw lA.invalidParameterError("text.fontfile", "string", options.text.fontfile);
          }
        }
        if (lA.defined(options.text.width)) {
          if (lA.integer(options.text.width) && options.text.width > 0) {
            inputOptions.textWidth = options.text.width;
          } else {
            throw lA.invalidParameterError("text.width", "positive integer", options.text.width);
          }
        }
        if (lA.defined(options.text.height)) {
          if (lA.integer(options.text.height) && options.text.height > 0) {
            inputOptions.textHeight = options.text.height;
          } else {
            throw lA.invalidParameterError("text.height", "positive integer", options.text.height);
          }
        }
        if (lA.defined(options.text.align)) {
          if (
            lA.string(options.text.align) &&
            lA.string(this.constructor.align[options.text.align])
          ) {
            inputOptions.textAlign = this.constructor.align[options.text.align];
          } else {
            throw lA.invalidParameterError("text.align", "valid alignment", options.text.align);
          }
        }
        if (lA.defined(options.text.justify)) {
          if (lA.bool(options.text.justify)) {
            inputOptions.textJustify = options.text.justify;
          } else {
            throw lA.invalidParameterError("text.justify", "boolean", options.text.justify);
          }
        }
        if (lA.defined(options.text.dpi)) {
          if (lA.integer(options.text.dpi) && lA.inRange(options.text.dpi, 1, 1e6)) {
            inputOptions.textDpi = options.text.dpi;
          } else {
            throw lA.invalidParameterError("text.dpi", "integer between 1 and 1000000", options.text.dpi);
          }
        }
        if (lA.defined(options.text.rgba)) {
          if (lA.bool(options.text.rgba)) {
            inputOptions.textRgba = options.text.rgba;
          } else {
            throw lA.invalidParameterError("text.rgba", "bool", options.text.rgba);
          }
        }
        if (lA.defined(options.text.spacing)) {
          if (lA.integer(options.text.spacing) && lA.inRange(options.text.spacing, -1e6, 1e6)) {
            inputOptions.textSpacing = options.text.spacing;
          } else {
            throw lA.invalidParameterError("text.spacing", "integer between -1000000 and 1000000", options.text.spacing);
          }
        }
        if (lA.defined(options.text.wrap)) {
          if (
            lA.string(options.text.wrap) &&
            lA.inArray(options.text.wrap, ["word", "char", "word-char", "none"])
          ) {
            inputOptions.textWrap = options.text.wrap;
          } else {
            throw lA.invalidParameterError("text.wrap", "one of: word, char, word-char, none", options.text.wrap);
          }
        }
        // Remove buffer if creating a text image
        delete inputOptions.buffer;
      } else {
        throw new Error("Expected a valid string to create an image with text.");
      }
    }
  } else if (lA.defined(options)) {
    // Options provided but not an object
    throw new Error("Invalid input options " + options);
  }

  return inputOptions;
}

module.exports = buildInputOptions;