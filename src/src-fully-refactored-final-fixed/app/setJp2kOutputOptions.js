/**
 * Sets JP2K (JPEG 2000) output options on the current instance.
 *
 * This function validates and applies the provided JP2K output options to the instance'createInteractionAccessor configuration.
 * Throws errors if the options are invalid or if JP2K output is not supported.
 *
 * @param {Object} jp2kOptions - An object containing JP2K output options.
 * @param {number} [jp2kOptions.quality] - Compression quality (integer between 1 and 100).
 * @param {boolean} [jp2kOptions.lossless] - Whether to use lossless compression.
 * @param {number} [jp2kOptions.tileWidth] - Tile width (integer between 1 and 32768).
 * @param {number} [jp2kOptions.tileHeight] - Tile height (integer between 1 and 32768).
 * @param {string} [jp2kOptions.chromaSubsampling] - Chroma subsampling mode ("4:2:0" or "4:4:4").
 * @returns {any} The result of updating the output format with the provided options.
 * @throws {Error} If JP2K output is not supported or if any option is invalid.
 */
function setJp2kOutputOptions(jp2kOptions) {
  // Ensure JP2K output buffer is available
  if (!this.constructor.format.jp2k.output.buffer) {
    throw xH2();
  }

  // Only process if jp2kOptions is an object
  if (x1.object(jp2kOptions)) {
    // Validate and set quality
    if (x1.defined(jp2kOptions.quality)) {
      if (x1.integer(jp2kOptions.quality) && x1.inRange(jp2kOptions.quality, 1, 100)) {
        this.options.jp2Quality = jp2kOptions.quality;
      } else {
        throw x1.invalidParameterError(
          "quality",
          "integer between 1 and 100",
          jp2kOptions.quality
        );
      }
    }

    // Validate and set lossless
    if (x1.defined(jp2kOptions.lossless)) {
      if (x1.bool(jp2kOptions.lossless)) {
        this.options.jp2Lossless = jp2kOptions.lossless;
      } else {
        throw x1.invalidParameterError(
          "lossless",
          "boolean",
          jp2kOptions.lossless
        );
      }
    }

    // Validate and set tileWidth
    if (x1.defined(jp2kOptions.tileWidth)) {
      if (
        x1.integer(jp2kOptions.tileWidth) &&
        x1.inRange(jp2kOptions.tileWidth, 1, 32768)
      ) {
        this.options.jp2TileWidth = jp2kOptions.tileWidth;
      } else {
        throw x1.invalidParameterError(
          "tileWidth",
          "integer between 1 and 32768",
          jp2kOptions.tileWidth
        );
      }
    }

    // Validate and set tileHeight
    if (x1.defined(jp2kOptions.tileHeight)) {
      if (
        x1.integer(jp2kOptions.tileHeight) &&
        x1.inRange(jp2kOptions.tileHeight, 1, 32768)
      ) {
        this.options.jp2TileHeight = jp2kOptions.tileHeight;
      } else {
        throw x1.invalidParameterError(
          "tileHeight",
          "integer between 1 and 32768",
          jp2kOptions.tileHeight
        );
      }
    }

    // Validate and set chromaSubsampling
    if (x1.defined(jp2kOptions.chromaSubsampling)) {
      if (
        x1.string(jp2kOptions.chromaSubsampling) &&
        x1.inArray(jp2kOptions.chromaSubsampling, ["4:2:0", "4:4:4"])
      ) {
        this.options.jp2ChromaSubsampling = jp2kOptions.chromaSubsampling;
      } else {
        throw x1.invalidParameterError(
          "chromaSubsampling",
          "one of: 4:2:0, 4:4:4",
          jp2kOptions.chromaSubsampling
        );
      }
    }
  }

  // Apply the updated options to the output format
  return this._updateFormatOut("jp2", jp2kOptions);
}

module.exports = setJp2kOutputOptions;