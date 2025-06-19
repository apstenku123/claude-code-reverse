/**
 * Sets JP2 (JPEG 2000) output options for the current instance.
 * Validates and applies provided options such as quality, lossless mode, tile size, and chroma subsampling.
 * Throws an error if JP2 output is not supported or if any option is invalid.
 *
 * @param {Object} jp2Options - An object containing JP2 output configuration options.
 * @param {number} [jp2Options.quality] - Compression quality (integer between 1 and 100).
 * @param {boolean} [jp2Options.lossless] - Whether to use lossless compression.
 * @param {number} [jp2Options.tileWidth] - Tile width (integer between 1 and 32768).
 * @param {number} [jp2Options.tileHeight] - Tile height (integer between 1 and 32768).
 * @param {string} [jp2Options.chromaSubsampling] - Chroma subsampling mode ("4:2:0" or "4:4:4").
 * @returns {any} The result of updating the output format with the specified JP2 options.
 * @throws {Error} If JP2 output is not supported or any option is invalid.
 */
function setJp2OutputOptions(jp2Options) {
  // Check if JP2 output buffer is supported
  if (!this.constructor.format.jp2k.output.buffer) {
    throw createMissingOpenJpegSupportError();
  }

  // Only process if jp2Options is an object
  if (x1.object(jp2Options)) {
    // Validate and set quality
    if (x1.defined(jp2Options.quality)) {
      if (x1.integer(jp2Options.quality) && x1.inRange(jp2Options.quality, 1, 100)) {
        this.options.jp2Quality = jp2Options.quality;
      } else {
        throw x1.invalidParameterError(
          "quality",
          "integer between 1 and 100",
          jp2Options.quality
        );
      }
    }

    // Validate and set lossless
    if (x1.defined(jp2Options.lossless)) {
      if (x1.bool(jp2Options.lossless)) {
        this.options.jp2Lossless = jp2Options.lossless;
      } else {
        throw x1.invalidParameterError(
          "lossless",
          "boolean",
          jp2Options.lossless
        );
      }
    }

    // Validate and set tileWidth
    if (x1.defined(jp2Options.tileWidth)) {
      if (x1.integer(jp2Options.tileWidth) && x1.inRange(jp2Options.tileWidth, 1, 32768)) {
        this.options.jp2TileWidth = jp2Options.tileWidth;
      } else {
        throw x1.invalidParameterError(
          "tileWidth",
          "integer between 1 and 32768",
          jp2Options.tileWidth
        );
      }
    }

    // Validate and set tileHeight
    if (x1.defined(jp2Options.tileHeight)) {
      if (x1.integer(jp2Options.tileHeight) && x1.inRange(jp2Options.tileHeight, 1, 32768)) {
        this.options.jp2TileHeight = jp2Options.tileHeight;
      } else {
        throw x1.invalidParameterError(
          "tileHeight",
          "integer between 1 and 32768",
          jp2Options.tileHeight
        );
      }
    }

    // Validate and set chromaSubsampling
    if (x1.defined(jp2Options.chromaSubsampling)) {
      if (
        x1.string(jp2Options.chromaSubsampling) &&
        x1.inArray(jp2Options.chromaSubsampling, ["4:2:0", "4:4:4"])
      ) {
        this.options.jp2ChromaSubsampling = jp2Options.chromaSubsampling;
      } else {
        throw x1.invalidParameterError(
          "chromaSubsampling",
          "one of: 4:2:0, 4:4:4",
          jp2Options.chromaSubsampling
        );
      }
    }
  }

  // Update the output format with the new JP2 options
  return this._updateFormatOut("jp2", jp2Options);
}

module.exports = setJp2OutputOptions;