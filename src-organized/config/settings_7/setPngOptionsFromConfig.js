/**
 * Sets PNG output options based on the provided configuration object.
 * Validates and applies various PNG-specific options such as progressive rendering,
 * compression level, adaptive filtering, palette usage, color count, quality, effort, and dither.
 * Throws errors for invalid parameter values.
 *
 * @param {Object} pngConfig - Configuration object for PNG output options.
 * @returns {any} The result of updating the output format to PNG with the given configuration.
 */
function setPngOptionsFromConfig(pngConfig) {
  // Ensure the input is an object
  if (x1.object(pngConfig)) {
    // Set progressive option if defined
    if (x1.defined(pngConfig.progressive)) {
      this._setBooleanOption("pngProgressive", pngConfig.progressive);
    }

    // Set compression level if defined and valid
    if (x1.defined(pngConfig.compressionLevel)) {
      if (
        x1.integer(pngConfig.compressionLevel) &&
        x1.inRange(pngConfig.compressionLevel, 0, 9)
      ) {
        this.options.pngCompressionLevel = pngConfig.compressionLevel;
      } else {
        throw x1.invalidParameterError(
          "compressionLevel",
          "integer between 0 and 9",
          pngConfig.compressionLevel
        );
      }
    }

    // Set adaptive filtering option if defined
    if (x1.defined(pngConfig.adaptiveFiltering)) {
      this._setBooleanOption("pngAdaptiveFiltering", pngConfig.adaptiveFiltering);
    }

    // Determine color count from either 'colours' or 'colors'
    const colorCount = pngConfig.colours || pngConfig.colors;
    if (x1.defined(colorCount)) {
      if (x1.integer(colorCount) && x1.inRange(colorCount, 2, 256)) {
        this.options.pngBitdepth = fH2(colorCount);
      } else {
        throw x1.invalidParameterError(
          "colours",
          "integer between 2 and 256",
          colorCount
        );
      }
    }

    // Set palette option if defined, or enable palette if any palette-related options are present
    if (x1.defined(pngConfig.palette)) {
      this._setBooleanOption("pngPalette", pngConfig.palette);
    } else if ([
      pngConfig.quality,
      pngConfig.effort,
      pngConfig.colours,
      pngConfig.colors,
      pngConfig.dither
    ].some(x1.defined)) {
      this._setBooleanOption("pngPalette", true);
    }

    // If palette is enabled, set palette-specific options
    if (this.options.pngPalette) {
      // Set quality if defined and valid
      if (x1.defined(pngConfig.quality)) {
        if (x1.integer(pngConfig.quality) && x1.inRange(pngConfig.quality, 0, 100)) {
          this.options.pngQuality = pngConfig.quality;
        } else {
          throw x1.invalidParameterError(
            "quality",
            "integer between 0 and 100",
            pngConfig.quality
          );
        }
      }
      // Set effort if defined and valid
      if (x1.defined(pngConfig.effort)) {
        if (x1.integer(pngConfig.effort) && x1.inRange(pngConfig.effort, 1, 10)) {
          this.options.pngEffort = pngConfig.effort;
        } else {
          throw x1.invalidParameterError(
            "effort",
            "integer between 1 and 10",
            pngConfig.effort
          );
        }
      }
      // Set dither if defined and valid
      if (x1.defined(pngConfig.dither)) {
        if (x1.number(pngConfig.dither) && x1.inRange(pngConfig.dither, 0, 1)) {
          this.options.pngDither = pngConfig.dither;
        } else {
          throw x1.invalidParameterError(
            "dither",
            "number between 0.0 and 1.0",
            pngConfig.dither
          );
        }
      }
    }
  }
  // Update the output format to PNG with the given configuration
  return this._updateFormatOut("png", pngConfig);
}

module.exports = setPngOptionsFromConfig;