/**
 * Parses and validates input source and configuration options for image processing.
 *
 * This function accepts various types of input sources (file path, Buffer, ArrayBuffer, TypedArray, or configuration object)
 * and an optional configuration object. It validates and normalizes the input, applying defaults and enforcing constraints.
 * Throws descriptive errors for invalid input or configuration.
 *
 * @param {string|Buffer|ArrayBuffer|TypedArray|Object} inputSource - The image input source (file path, Buffer, ArrayBuffer, TypedArray, or config object).
 * @param {Object} [inputOptions] - Optional configuration options for processing the input.
 * @param {Object} [contextOptions] - Optional context, used for stream allowance.
 * @returns {Object} Normalized and validated options object for downstream image processing.
 */
function parseInputOptions(inputSource, inputOptions, contextOptions) {
  const options = {
    failOn: "warning",
    limitInputPixels: Math.pow(16383, 2),
    ignoreIcc: false,
    unlimited: false,
    sequentialRead: true
  };

  // Handle inputSource type and assign to options
  if (lA.string(inputSource)) {
    // Input is a file path
    options.file = inputSource;
  } else if (lA.buffer(inputSource)) {
    // Input is a Buffer
    if (inputSource.length === 0) {
      throw new Error("Input Buffer is empty");
    }
    options.buffer = inputSource;
  } else if (lA.arrayBuffer(inputSource)) {
    // Input is an ArrayBuffer
    if (inputSource.byteLength === 0) {
      throw new Error("Input bit Array is empty");
    }
    options.buffer = Buffer.from(inputSource, 0, inputSource.byteLength);
  } else if (lA.typedArray(inputSource)) {
    // Input is a TypedArray
    if (inputSource.length === 0) {
      throw new Error("Input Bit Array is empty");
    }
    options.buffer = Buffer.from(inputSource.buffer, inputSource.byteOffset, inputSource.byteLength);
  } else if (lA.plainObject(inputSource) && !lA.defined(inputOptions)) {
    // Input is a plain object and no inputOptions provided
    inputOptions = inputSource;
    if (extractDefinedImageOptions(inputOptions)) {
      options.buffer = [];
    }
  } else if (!lA.defined(inputSource) && !lA.defined(inputOptions) && lA.object(contextOptions) && contextOptions.allowStream) {
    // No inputSource or inputOptions, but context allows stream
    options.buffer = [];
  } else {
    // Unsupported input type
    throw new Error(
      `Unsupported input '${inputSource}' of type ${typeof inputSource}` +
      (lA.defined(inputOptions) ? ` when also providing options of type ${typeof inputOptions}` : "")
    );
  }

  // If inputOptions is provided, validate and assign its properties
  if (lA.object(inputOptions)) {
    // failOnError: boolean (legacy)
    if (lA.defined(inputOptions.failOnError)) {
      if (lA.bool(inputOptions.failOnError)) {
        options.failOn = inputOptions.failOnError ? "warning" : "none";
      } else {
        throw lA.invalidParameterError("failOnError", "boolean", inputOptions.failOnError);
      }
    }
    // failOn: string (enum)
    if (lA.defined(inputOptions.failOn)) {
      if (lA.string(inputOptions.failOn) && lA.inArray(inputOptions.failOn, ["none", "truncated", "error", "warning"])) {
        options.failOn = inputOptions.failOn;
      } else {
        throw lA.invalidParameterError("failOn", "one of: none, truncated, error, warning", inputOptions.failOn);
      }
    }
    // density: number (1-100000)
    if (lA.defined(inputOptions.density)) {
      if (lA.inRange(inputOptions.density, 1, 1e5)) {
        options.density = inputOptions.density;
      } else {
        throw lA.invalidParameterError("density", "number between 1 and 100000", inputOptions.density);
      }
    }
    // ignoreIcc: boolean
    if (lA.defined(inputOptions.ignoreIcc)) {
      if (lA.bool(inputOptions.ignoreIcc)) {
        options.ignoreIcc = inputOptions.ignoreIcc;
      } else {
        throw lA.invalidParameterError("ignoreIcc", "boolean", inputOptions.ignoreIcc);
      }
    }
    // limitInputPixels: boolean or integer
    if (lA.defined(inputOptions.limitInputPixels)) {
      if (lA.bool(inputOptions.limitInputPixels)) {
        options.limitInputPixels = inputOptions.limitInputPixels ? Math.pow(16383, 2) : 0;
      } else if (
        lA.integer(inputOptions.limitInputPixels) &&
        lA.inRange(inputOptions.limitInputPixels, 0, Number.MAX_SAFE_INTEGER)
      ) {
        options.limitInputPixels = inputOptions.limitInputPixels;
      } else {
        throw lA.invalidParameterError("limitInputPixels", "positive integer", inputOptions.limitInputPixels);
      }
    }
    // unlimited: boolean
    if (lA.defined(inputOptions.unlimited)) {
      if (lA.bool(inputOptions.unlimited)) {
        options.unlimited = inputOptions.unlimited;
      } else {
        throw lA.invalidParameterError("unlimited", "boolean", inputOptions.unlimited);
      }
    }
    // sequentialRead: boolean
    if (lA.defined(inputOptions.sequentialRead)) {
      if (lA.bool(inputOptions.sequentialRead)) {
        options.sequentialRead = inputOptions.sequentialRead;
      } else {
        throw lA.invalidParameterError("sequentialRead", "boolean", inputOptions.sequentialRead);
      }
    }
    // raw: {width, height, channels, [premultiplied]}
    if (lA.defined(inputOptions.raw)) {
      const raw = inputOptions.raw;
      if (
        lA.object(raw) &&
        lA.integer(raw.width) && raw.width > 0 &&
        lA.integer(raw.height) && raw.height > 0 &&
        lA.integer(raw.channels) && lA.inRange(raw.channels, 1, 4)
      ) {
        options.rawWidth = raw.width;
        options.rawHeight = raw.height;
        options.rawChannels = raw.channels;
        options.rawPremultiplied = !!raw.premultiplied;
        // Determine rawDepth based on inputSource'createInteractionAccessor constructor
        switch (inputSource.constructor) {
          case Uint8Array:
          case Uint8ClampedArray:
            options.rawDepth = "uchar";
            break;
          case Int8Array:
            options.rawDepth = "char";
            break;
          case Uint16Array:
            options.rawDepth = "ushort";
            break;
          case Int16Array:
            options.rawDepth = "short";
            break;
          case Uint32Array:
            options.rawDepth = "uint";
            break;
          case Int32Array:
            options.rawDepth = "int";
            break;
          case Float32Array:
            options.rawDepth = "float";
            break;
          case Float64Array:
            options.rawDepth = "double";
            break;
          default:
            options.rawDepth = "uchar";
            break;
        }
      } else {
        throw new Error("Expected width, height and channels for raw pixel input");
      }
    }
    // animated: boolean
    if (lA.defined(inputOptions.animated)) {
      if (lA.bool(inputOptions.animated)) {
        options.pages = inputOptions.animated ? -1 : 1;
      } else {
        throw lA.invalidParameterError("animated", "boolean", inputOptions.animated);
      }
    }
    // pages: integer (-1 to 100000)
    if (lA.defined(inputOptions.pages)) {
      if (lA.integer(inputOptions.pages) && lA.inRange(inputOptions.pages, -1, 1e5)) {
        options.pages = inputOptions.pages;
      } else {
        throw lA.invalidParameterError("pages", "integer between -1 and 100000", inputOptions.pages);
      }
    }
    // page: integer (0 to 100000)
    if (lA.defined(inputOptions.page)) {
      if (lA.integer(inputOptions.page) && lA.inRange(inputOptions.page, 0, 1e5)) {
        options.page = inputOptions.page;
      } else {
        throw lA.invalidParameterError("page", "integer between 0 and 100000", inputOptions.page);
      }
    }
    // level: integer (0 to 256)
    if (lA.defined(inputOptions.level)) {
      if (lA.integer(inputOptions.level) && lA.inRange(inputOptions.level, 0, 256)) {
        options.level = inputOptions.level;
      } else {
        throw lA.invalidParameterError("level", "integer between 0 and 256", inputOptions.level);
      }
    }
    // subifd: integer (-1 to 100000)
    if (lA.defined(inputOptions.subifd)) {
      if (lA.integer(inputOptions.subifd) && lA.inRange(inputOptions.subifd, -1, 1e5)) {
        options.subifd = inputOptions.subifd;
      } else {
        throw lA.invalidParameterError("subifd", "integer between -1 and 100000", inputOptions.subifd);
      }
    }
    // create: {width, height, channels, noise/background}
    if (lA.defined(inputOptions.create)) {
      const create = inputOptions.create;
      if (
        lA.object(create) &&
        lA.integer(create.width) && create.width > 0 &&
        lA.integer(create.height) && create.height > 0 &&
        lA.integer(create.channels)
      ) {
        options.createWidth = create.width;
        options.createHeight = create.height;
        options.createChannels = create.channels;
        if (lA.defined(create.noise)) {
          // Noise creation
          if (!lA.object(create.noise)) {
            throw new Error("Expected noise to be an object");
          }
          if (!lA.inArray(create.noise.type, ["gaussian"])) {
            throw new Error("Only gaussian noise is supported at the moment");
          }
          if (!lA.inRange(create.channels, 1, 4)) {
            throw lA.invalidParameterError("create.channels", "number between 1 and 4", create.channels);
          }
          options.createNoiseType = create.noise.type;
          if (lA.number(create.noise.mean) && lA.inRange(create.noise.mean, 0, 1e4)) {
            options.createNoiseMean = create.noise.mean;
          } else {
            throw lA.invalidParameterError("create.noise.mean", "number between 0 and 10000", create.noise.mean);
          }
          if (lA.number(create.noise.sigma) && lA.inRange(create.noise.sigma, 0, 1e4)) {
            options.createNoiseSigma = create.noise.sigma;
          } else {
            throw lA.invalidParameterError("create.noise.sigma", "number between 0 and 10000", create.noise.sigma);
          }
        } else if (lA.defined(create.background)) {
          // Background color creation
          if (!lA.inRange(create.channels, 3, 4)) {
            throw lA.invalidParameterError("create.channels", "number between 3 and 4", create.channels);
          }
          const backgroundColor = KQ5(create.background);
          options.createBackground = [
            backgroundColor.red(),
            backgroundColor.green(),
            backgroundColor.blue(),
            Math.round(backgroundColor.alpha() * 255)
          ];
        } else {
          throw new Error("Expected valid noise or background to create a new input image");
        }
        // Remove buffer property if creating new image
        delete options.buffer;
      } else {
        throw new Error("Expected valid width, height and channels to create a new input image");
      }
    }
    // text: {text, ...}
    if (lA.defined(inputOptions.text)) {
      const text = inputOptions.text;
      if (lA.object(text) && lA.string(text.text)) {
        options.textValue = text.text;
        // Only one of height or dpi allowed
        if (lA.defined(text.height) && lA.defined(text.dpi)) {
          throw new Error("Expected only one of dpi or height");
        }
        if (lA.defined(text.font)) {
          if (lA.string(text.font)) {
            options.textFont = text.font;
          } else {
            throw lA.invalidParameterError("text.font", "string", text.font);
          }
        }
        if (lA.defined(text.fontfile)) {
          if (lA.string(text.fontfile)) {
            options.textFontfile = text.fontfile;
          } else {
            throw lA.invalidParameterError("text.fontfile", "string", text.fontfile);
          }
        }
        if (lA.defined(text.width)) {
          if (lA.integer(text.width) && text.width > 0) {
            options.textWidth = text.width;
          } else {
            throw lA.invalidParameterError("text.width", "positive integer", text.width);
          }
        }
        if (lA.defined(text.height)) {
          if (lA.integer(text.height) && text.height > 0) {
            options.textHeight = text.height;
          } else {
            throw lA.invalidParameterError("text.height", "positive integer", text.height);
          }
        }
        if (lA.defined(text.align)) {
          if (lA.string(text.align) && lA.string(this.constructor.align[text.align])) {
            options.textAlign = this.constructor.align[text.align];
          } else {
            throw lA.invalidParameterError("text.align", "valid alignment", text.align);
          }
        }
        if (lA.defined(text.justify)) {
          if (lA.bool(text.justify)) {
            options.textJustify = text.justify;
          } else {
            throw lA.invalidParameterError("text.justify", "boolean", text.justify);
          }
        }
        if (lA.defined(text.dpi)) {
          if (lA.integer(text.dpi) && lA.inRange(text.dpi, 1, 1e6)) {
            options.textDpi = text.dpi;
          } else {
            throw lA.invalidParameterError("text.dpi", "integer between 1 and 1000000", text.dpi);
          }
        }
        if (lA.defined(text.rgba)) {
          if (lA.bool(text.rgba)) {
            options.textRgba = text.rgba;
          } else {
            throw lA.invalidParameterError("text.rgba", "bool", text.rgba);
          }
        }
        if (lA.defined(text.spacing)) {
          if (lA.integer(text.spacing) && lA.inRange(text.spacing, -1e6, 1e6)) {
            options.textSpacing = text.spacing;
          } else {
            throw lA.invalidParameterError("text.spacing", "integer between -1000000 and 1000000", text.spacing);
          }
        }
        if (lA.defined(text.wrap)) {
          if (lA.string(text.wrap) && lA.inArray(text.wrap, ["word", "char", "word-char", "none"])) {
            options.textWrap = text.wrap;
          } else {
            throw lA.invalidParameterError("text.wrap", "one of: word, char, word-char, none", text.wrap);
          }
        }
        // Remove buffer property if creating text image
        delete options.buffer;
      } else {
        throw new Error("Expected a valid string to create an image with text.");
      }
    }
  } else if (lA.defined(inputOptions)) {
    // inputOptions is defined but not an object
    throw new Error("Invalid input options " + inputOptions);
  }

  return options;
}

module.exports = parseInputOptions;