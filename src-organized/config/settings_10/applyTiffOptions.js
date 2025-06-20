/**
 * Applies TIFF-specific options to the current instance based on the provided configuration object.
 * Validates each option and throws an error if any value is invalid.
 *
 * @param {Object} tiffOptions - An object containing TIFF output options.
 * @param {number} [tiffOptions.quality] - TIFF quality (integer between 1 and 100).
 * @param {number} [tiffOptions.bitdepth] - TIFF bit depth (1, 2, 4, or 8).
 * @param {boolean} [tiffOptions.tile] - Whether to use tiling.
 * @param {number} [tiffOptions.tileWidth] - Width of tiles (integer > 0).
 * @param {number} [tiffOptions.tileHeight] - Height of tiles (integer > 0).
 * @param {boolean} [tiffOptions.miniswhite] - Whether to use miniswhite photometric interpretation.
 * @param {boolean} [tiffOptions.pyramid] - Whether to use pyramid TIFF.
 * @param {number} [tiffOptions.xres] - Horizontal resolution (number > 0).
 * @param {number} [tiffOptions.yres] - Vertical resolution (number > 0).
 * @param {string} [tiffOptions.compression] - Compression type (one of: none, jpeg, deflate, packbits, ccittfax4, lzw, webp, zstd, jp2k).
 * @param {string} [tiffOptions.predictor] - Predictor type (one of: none, horizontal, float).
 * @param {string} [tiffOptions.resolutionUnit] - Resolution unit (inch or cm).
 * @returns {any} The result of updating the output format with TIFF options.
 * @throws {Error} If any option is invalid.
 */
function applyTiffOptions(tiffOptions) {
  // Ensure the input is an object
  if (x1.object(tiffOptions)) {
    // Validate and apply TIFF quality
    if (x1.defined(tiffOptions.quality)) {
      if (x1.integer(tiffOptions.quality) && x1.inRange(tiffOptions.quality, 1, 100)) {
        this.options.tiffQuality = tiffOptions.quality;
      } else {
        throw x1.invalidParameterError("quality", "integer between 1 and 100", tiffOptions.quality);
      }
    }

    // Validate and apply TIFF bit depth
    if (x1.defined(tiffOptions.bitdepth)) {
      if (x1.integer(tiffOptions.bitdepth) && x1.inArray(tiffOptions.bitdepth, [1, 2, 4, 8])) {
        this.options.tiffBitdepth = tiffOptions.bitdepth;
      } else {
        throw x1.invalidParameterError("bitdepth", "1, 2, 4 or 8", tiffOptions.bitdepth);
      }
    }

    // Validate and apply TIFF tiling
    if (x1.defined(tiffOptions.tile)) {
      this._setBooleanOption("tiffTile", tiffOptions.tile);
    }

    // Validate and apply TIFF tile width
    if (x1.defined(tiffOptions.tileWidth)) {
      if (x1.integer(tiffOptions.tileWidth) && tiffOptions.tileWidth > 0) {
        this.options.tiffTileWidth = tiffOptions.tileWidth;
      } else {
        throw x1.invalidParameterError("tileWidth", "integer greater than zero", tiffOptions.tileWidth);
      }
    }

    // Validate and apply TIFF tile height
    if (x1.defined(tiffOptions.tileHeight)) {
      if (x1.integer(tiffOptions.tileHeight) && tiffOptions.tileHeight > 0) {
        this.options.tiffTileHeight = tiffOptions.tileHeight;
      } else {
        throw x1.invalidParameterError("tileHeight", "integer greater than zero", tiffOptions.tileHeight);
      }
    }

    // Validate and apply miniswhite option
    if (x1.defined(tiffOptions.miniswhite)) {
      this._setBooleanOption("tiffMiniswhite", tiffOptions.miniswhite);
    }

    // Validate and apply pyramid option
    if (x1.defined(tiffOptions.pyramid)) {
      this._setBooleanOption("tiffPyramid", tiffOptions.pyramid);
    }

    // Validate and apply horizontal resolution
    if (x1.defined(tiffOptions.xres)) {
      if (x1.number(tiffOptions.xres) && tiffOptions.xres > 0) {
        this.options.tiffXres = tiffOptions.xres;
      } else {
        throw x1.invalidParameterError("xres", "number greater than zero", tiffOptions.xres);
      }
    }

    // Validate and apply vertical resolution
    if (x1.defined(tiffOptions.yres)) {
      if (x1.number(tiffOptions.yres) && tiffOptions.yres > 0) {
        this.options.tiffYres = tiffOptions.yres;
      } else {
        throw x1.invalidParameterError("yres", "number greater than zero", tiffOptions.yres);
      }
    }

    // Validate and apply compression type
    if (x1.defined(tiffOptions.compression)) {
      const validCompressions = [
        "none", "jpeg", "deflate", "packbits", "ccittfax4", "lzw", "webp", "zstd", "jp2k"
      ];
      if (x1.string(tiffOptions.compression) && x1.inArray(tiffOptions.compression, validCompressions)) {
        this.options.tiffCompression = tiffOptions.compression;
      } else {
        throw x1.invalidParameterError(
          "compression",
          "one of: none, jpeg, deflate, packbits, ccittfax4, lzw, webp, zstd, jp2k",
          tiffOptions.compression
        );
      }
    }

    // Validate and apply predictor type
    if (x1.defined(tiffOptions.predictor)) {
      const validPredictors = ["none", "horizontal", "float"];
      if (x1.string(tiffOptions.predictor) && x1.inArray(tiffOptions.predictor, validPredictors)) {
        this.options.tiffPredictor = tiffOptions.predictor;
      } else {
        throw x1.invalidParameterError(
          "predictor",
          "one of: none, horizontal, float",
          tiffOptions.predictor
        );
      }
    }

    // Validate and apply resolution unit
    if (x1.defined(tiffOptions.resolutionUnit)) {
      const validUnits = ["inch", "cm"];
      if (x1.string(tiffOptions.resolutionUnit) && x1.inArray(tiffOptions.resolutionUnit, validUnits)) {
        this.options.tiffResolutionUnit = tiffOptions.resolutionUnit;
      } else {
        throw x1.invalidParameterError(
          "resolutionUnit",
          "one of: inch, cm",
          tiffOptions.resolutionUnit
        );
      }
    }
  }

  // Update the output format to TIFF with the applied options
  return this._updateFormatOut("tiff", tiffOptions);
}

module.exports = applyTiffOptions;
