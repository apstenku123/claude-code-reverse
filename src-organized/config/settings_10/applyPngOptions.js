/**
 * Applies PNG-specific options to the current instance based on the provided configuration object.
 * Validates and sets options such as progressive rendering, compression level, adaptive filtering, palette usage, bit depth, quality, effort, and dither.
 * Throws an error if any provided option is invalid.
 *
 * @param {Object} pngOptions - Configuration object containing PNG output options.
 * @param {boolean} [pngOptions.progressive] - Whether to use progressive (interlaced) PNG output.
 * @param {number} [pngOptions.compressionLevel] - Compression level (integer between 0 and 9).
 * @param {boolean} [pngOptions.adaptiveFiltering] - Whether to use adaptive filtering.
 * @param {number} [pngOptions.colours|pngOptions.colors] - Number of palette colors (integer between 2 and 256).
 * @param {boolean} [pngOptions.palette] - Whether to use a palette (indexed color PNG).
 * @param {number} [pngOptions.quality] - Palette quality (integer between 0 and 100).
 * @param {number} [pngOptions.effort] - Palette effort (integer between 1 and 10).
 * @param {number} [pngOptions.dither] - Dithering level (number between 0.0 and 1.0).
 * @returns {any} The result of updating the output format to PNG with the applied options.
 * @throws {Error} If any option is invalid.
 */
function applyPngOptions(pngOptions) {
  if (x1.object(pngOptions)) {
    // Set progressive option if defined
    if (x1.defined(pngOptions.progressive)) {
      this._setBooleanOption("pngProgressive", pngOptions.progressive);
    }

    // Set compression level if defined and valid
    if (x1.defined(pngOptions.compressionLevel)) {
      if (x1.integer(pngOptions.compressionLevel) && x1.inRange(pngOptions.compressionLevel, 0, 9)) {
        this.options.pngCompressionLevel = pngOptions.compressionLevel;
      } else {
        throw x1.invalidParameterError(
          "compressionLevel",
          "integer between 0 and 9",
          pngOptions.compressionLevel
        );
      }
    }

    // Set adaptive filtering if defined
    if (x1.defined(pngOptions.adaptiveFiltering)) {
      this._setBooleanOption("pngAdaptiveFiltering", pngOptions.adaptiveFiltering);
    }

    // Determine palette color count (colours/colors)
    const paletteColorCount = pngOptions.colours || pngOptions.colors;
    if (x1.defined(paletteColorCount)) {
      if (x1.integer(paletteColorCount) && x1.inRange(paletteColorCount, 2, 256)) {
        // Use getNextPowerOfTwo to determine bit depth
        this.options.pngBitdepth = getNextPowerOfTwo(paletteColorCount);
      } else {
        throw x1.invalidParameterError(
          "colours",
          "integer between 2 and 256",
          paletteColorCount
        );
      }
    }

    // Set palette option if defined, or infer from related options
    if (x1.defined(pngOptions.palette)) {
      this._setBooleanOption("pngPalette", pngOptions.palette);
    } else if ([
      pngOptions.quality,
      pngOptions.effort,
      pngOptions.colours,
      pngOptions.colors,
      pngOptions.dither
    ].some(x1.defined)) {
      // If any palette-related option is defined, enable palette
      this._setBooleanOption("pngPalette", true);
    }

    // If palette is enabled, validate and set palette-specific options
    if (this.options.pngPalette) {
      // Set quality if defined and valid
      if (x1.defined(pngOptions.quality)) {
        if (x1.integer(pngOptions.quality) && x1.inRange(pngOptions.quality, 0, 100)) {
          this.options.pngQuality = pngOptions.quality;
        } else {
          throw x1.invalidParameterError(
            "quality",
            "integer between 0 and 100",
            pngOptions.quality
          );
        }
      }
      // Set effort if defined and valid
      if (x1.defined(pngOptions.effort)) {
        if (x1.integer(pngOptions.effort) && x1.inRange(pngOptions.effort, 1, 10)) {
          this.options.pngEffort = pngOptions.effort;
        } else {
          throw x1.invalidParameterError(
            "effort",
            "integer between 1 and 10",
            pngOptions.effort
          );
        }
      }
      // Set dither if defined and valid
      if (x1.defined(pngOptions.dither)) {
        if (x1.number(pngOptions.dither) && x1.inRange(pngOptions.dither, 0, 1)) {
          this.options.pngDither = pngOptions.dither;
        } else {
          throw x1.invalidParameterError(
            "dither",
            "number between 0.0 and 1.0",
            pngOptions.dither
          );
        }
      }
    }
  }
  // Update the output format to PNG with the applied options
  return this._updateFormatOut("png", pngOptions);
}

module.exports = applyPngOptions;