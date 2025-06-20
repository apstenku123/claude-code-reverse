/**
 * Applies GIF-specific encoding options to the current instance based on the provided configuration object.
 * Validates and sets options such as reuse, progressive, color depth, effort, dither, and error thresholds.
 * Throws descriptive errors if any parameter is invalid.
 *
 * @param {Object} gifOptions - An object containing GIF encoding options.
 * @param {boolean} [gifOptions.reuse] - Whether to reuse the GIF palette.
 * @param {boolean} [gifOptions.progressive] - Whether to use progressive encoding for GIF.
 * @param {number} [gifOptions.colours|gifOptions.colors] - Number of colors to use (integer between 2 and 256).
 * @param {number} [gifOptions.effort] - Effort level for encoding (integer between 1 and 10).
 * @param {number} [gifOptions.dither] - Dithering amount (number between 0.0 and 1.0).
 * @param {number} [gifOptions.interFrameMaxError] - Maximum error between frames (number between 0.0 and 32.0).
 * @param {number} [gifOptions.interPaletteMaxError] - Maximum error between palettes (number between 0.0 and 256.0).
 * @returns {any} The result of updating the output format for GIF.
 */
function applyGifOptions(gifOptions) {
  // Ensure the input is an object
  if (x1.object(gifOptions)) {
    // Set boolean option for GIF palette reuse
    if (x1.defined(gifOptions.reuse)) {
      this._setBooleanOption("gifReuse", gifOptions.reuse);
    }

    // Set boolean option for progressive GIF encoding
    if (x1.defined(gifOptions.progressive)) {
      this._setBooleanOption("gifProgressive", gifOptions.progressive);
    }

    // Determine color count (accepts both British and American spelling)
    const colorCount = gifOptions.colours || gifOptions.colors;
    if (x1.defined(colorCount)) {
      // Validate color count is an integer between 2 and 256
      if (x1.integer(colorCount) && x1.inRange(colorCount, 2, 256)) {
        this.options.gifBitdepth = fH2(colorCount);
      } else {
        throw x1.invalidParameterError(
          "colours",
          "integer between 2 and 256",
          colorCount
        );
      }
    }

    // Validate and set encoding effort (1-10)
    if (x1.defined(gifOptions.effort)) {
      if (x1.number(gifOptions.effort) && x1.inRange(gifOptions.effort, 1, 10)) {
        this.options.gifEffort = gifOptions.effort;
      } else {
        throw x1.invalidParameterError(
          "effort",
          "integer between 1 and 10",
          gifOptions.effort
        );
      }
    }

    // Validate and set dither amount (0.0-1.0)
    if (x1.defined(gifOptions.dither)) {
      if (x1.number(gifOptions.dither) && x1.inRange(gifOptions.dither, 0, 1)) {
        this.options.gifDither = gifOptions.dither;
      } else {
        throw x1.invalidParameterError(
          "dither",
          "number between 0.0 and 1.0",
          gifOptions.dither
        );
      }
    }

    // Validate and set maximum error between frames (0.0-32.0)
    if (x1.defined(gifOptions.interFrameMaxError)) {
      if (
        x1.number(gifOptions.interFrameMaxError) &&
        x1.inRange(gifOptions.interFrameMaxError, 0, 32)
      ) {
        this.options.gifInterFrameMaxError = gifOptions.interFrameMaxError;
      } else {
        throw x1.invalidParameterError(
          "interFrameMaxError",
          "number between 0.0 and 32.0",
          gifOptions.interFrameMaxError
        );
      }
    }

    // Validate and set maximum error between palettes (0.0-256.0)
    if (x1.defined(gifOptions.interPaletteMaxError)) {
      if (
        x1.number(gifOptions.interPaletteMaxError) &&
        x1.inRange(gifOptions.interPaletteMaxError, 0, 256)
      ) {
        this.options.gifInterPaletteMaxError = gifOptions.interPaletteMaxError;
      } else {
        throw x1.invalidParameterError(
          "interPaletteMaxError",
          "number between 0.0 and 256.0",
          gifOptions.interPaletteMaxError
        );
      }
    }
  }

  // Apply additional processing and update output format
  applyLoopAndDelayConfig(gifOptions, this.options);
  return this._updateFormatOut("gif", gifOptions);
}

module.exports = applyGifOptions;
