/**
 * Sets TIFF-specific output options based on the provided configuration object.
 * Validates each option and updates the instance'createInteractionAccessor TIFF options accordingly.
 * Throws an error if any option is invalid.
 *
 * @param {Object} tiffOptionsConfig - Configuration object containing TIFF output options.
 * @param {number} [tiffOptionsConfig.quality] - TIFF quality (integer between 1 and 100).
 * @param {number} [tiffOptionsConfig.bitdepth] - TIFF bit depth (1, 2, 4, or 8).
 * @param {boolean} [tiffOptionsConfig.tile] - Whether to enable tiling.
 * @param {number} [tiffOptionsConfig.tileWidth] - Tile width (integer > 0).
 * @param {number} [tiffOptionsConfig.tileHeight] - Tile height (integer > 0).
 * @param {boolean} [tiffOptionsConfig.miniswhite] - Whether to use miniswhite photometric interpretation.
 * @param {boolean} [tiffOptionsConfig.pyramid] - Whether to enable pyramid TIFF.
 * @param {number} [tiffOptionsConfig.xres] - Horizontal resolution (number > 0).
 * @param {number} [tiffOptionsConfig.yres] - Vertical resolution (number > 0).
 * @param {string} [tiffOptionsConfig.compression] - Compression type (one of: none, jpeg, deflate, packbits, ccittfax4, lzw, webp, zstd, jp2k).
 * @param {string} [tiffOptionsConfig.predictor] - Predictor type (one of: none, horizontal, float).
 * @param {string} [tiffOptionsConfig.resolutionUnit] - Resolution unit (inch or cm).
 * @returns {any} The result of updating the output format to TIFF with the given options.
 * @throws {Error} If any option is invalid.
 */
function setTiffOptions(tiffOptionsConfig) {
  // Ensure the input is an object
  if (x1.object(tiffOptionsConfig)) {
    // Validate and set TIFF quality
    if (x1.defined(tiffOptionsConfig.quality)) {
      if (
        x1.integer(tiffOptionsConfig.quality) &&
        x1.inRange(tiffOptionsConfig.quality, 1, 100)
      ) {
        this.options.tiffQuality = tiffOptionsConfig.quality;
      } else {
        throw x1.invalidParameterError(
          "quality",
          "integer between 1 and 100",
          tiffOptionsConfig.quality
        );
      }
    }

    // Validate and set TIFF bit depth
    if (x1.defined(tiffOptionsConfig.bitdepth)) {
      if (
        x1.integer(tiffOptionsConfig.bitdepth) &&
        x1.inArray(tiffOptionsConfig.bitdepth, [1, 2, 4, 8])
      ) {
        this.options.tiffBitdepth = tiffOptionsConfig.bitdepth;
      } else {
        throw x1.invalidParameterError(
          "bitdepth",
          "1, 2, 4 or 8",
          tiffOptionsConfig.bitdepth
        );
      }
    }

    // Set TIFF tiling option (boolean)
    if (x1.defined(tiffOptionsConfig.tile)) {
      this._setBooleanOption("tiffTile", tiffOptionsConfig.tile);
    }

    // Validate and set TIFF tile width
    if (x1.defined(tiffOptionsConfig.tileWidth)) {
      if (
        x1.integer(tiffOptionsConfig.tileWidth) &&
        tiffOptionsConfig.tileWidth > 0
      ) {
        this.options.tiffTileWidth = tiffOptionsConfig.tileWidth;
      } else {
        throw x1.invalidParameterError(
          "tileWidth",
          "integer greater than zero",
          tiffOptionsConfig.tileWidth
        );
      }
    }

    // Validate and set TIFF tile height
    if (x1.defined(tiffOptionsConfig.tileHeight)) {
      if (
        x1.integer(tiffOptionsConfig.tileHeight) &&
        tiffOptionsConfig.tileHeight > 0
      ) {
        this.options.tiffTileHeight = tiffOptionsConfig.tileHeight;
      } else {
        throw x1.invalidParameterError(
          "tileHeight",
          "integer greater than zero",
          tiffOptionsConfig.tileHeight
        );
      }
    }

    // Set miniswhite photometric interpretation (boolean)
    if (x1.defined(tiffOptionsConfig.miniswhite)) {
      this._setBooleanOption("tiffMiniswhite", tiffOptionsConfig.miniswhite);
    }

    // Set pyramid TIFF option (boolean)
    if (x1.defined(tiffOptionsConfig.pyramid)) {
      this._setBooleanOption("tiffPyramid", tiffOptionsConfig.pyramid);
    }

    // Validate and set horizontal resolution
    if (x1.defined(tiffOptionsConfig.xres)) {
      if (
        x1.number(tiffOptionsConfig.xres) &&
        tiffOptionsConfig.xres > 0
      ) {
        this.options.tiffXres = tiffOptionsConfig.xres;
      } else {
        throw x1.invalidParameterError(
          "xres",
          "number greater than zero",
          tiffOptionsConfig.xres
        );
      }
    }

    // Validate and set vertical resolution
    if (x1.defined(tiffOptionsConfig.yres)) {
      if (
        x1.number(tiffOptionsConfig.yres) &&
        tiffOptionsConfig.yres > 0
      ) {
        this.options.tiffYres = tiffOptionsConfig.yres;
      } else {
        throw x1.invalidParameterError(
          "yres",
          "number greater than zero",
          tiffOptionsConfig.yres
        );
      }
    }

    // Validate and set TIFF compression type
    if (x1.defined(tiffOptionsConfig.compression)) {
      const validCompressions = [
        "none",
        "jpeg",
        "deflate",
        "packbits",
        "ccittfax4",
        "lzw",
        "webp",
        "zstd",
        "jp2k"
      ];
      if (
        x1.string(tiffOptionsConfig.compression) &&
        x1.inArray(tiffOptionsConfig.compression, validCompressions)
      ) {
        this.options.tiffCompression = tiffOptionsConfig.compression;
      } else {
        throw x1.invalidParameterError(
          "compression",
          "one of: none, jpeg, deflate, packbits, ccittfax4, lzw, webp, zstd, jp2k",
          tiffOptionsConfig.compression
        );
      }
    }

    // Validate and set TIFF predictor type
    if (x1.defined(tiffOptionsConfig.predictor)) {
      const validPredictors = ["none", "horizontal", "float"];
      if (
        x1.string(tiffOptionsConfig.predictor) &&
        x1.inArray(tiffOptionsConfig.predictor, validPredictors)
      ) {
        this.options.tiffPredictor = tiffOptionsConfig.predictor;
      } else {
        throw x1.invalidParameterError(
          "predictor",
          "one of: none, horizontal, float",
          tiffOptionsConfig.predictor
        );
      }
    }

    // Validate and set TIFF resolution unit
    if (x1.defined(tiffOptionsConfig.resolutionUnit)) {
      const validResolutionUnits = ["inch", "cm"];
      if (
        x1.string(tiffOptionsConfig.resolutionUnit) &&
        x1.inArray(tiffOptionsConfig.resolutionUnit, validResolutionUnits)
      ) {
        this.options.tiffResolutionUnit = tiffOptionsConfig.resolutionUnit;
      } else {
        throw x1.invalidParameterError(
          "resolutionUnit",
          "one of: inch, cm",
          tiffOptionsConfig.resolutionUnit
        );
      }
    }
  }
  // Update the output format to TIFF with the configured options
  return this._updateFormatOut("tiff", tiffOptionsConfig);
}

module.exports = setTiffOptions;
