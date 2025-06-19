/**
 * Applies and validates HEIF (High Efficiency Image File Format) encoding options to the current instance.
 * Throws an error if any option is invalid.
 *
 * @param {Object} heifOptions - An object containing HEIF encoding options.
 * @param {string} [heifOptions.compression] - Compression algorithm to use ('av1' or 'hevc').
 * @param {number} [heifOptions.quality] - Quality level (integer between 1 and 100).
 * @param {boolean} [heifOptions.lossless] - Whether to use lossless compression.
 * @param {number} [heifOptions.effort] - Compression effort (integer between 0 and 9).
 * @param {string} [heifOptions.chromaSubsampling] - Chroma subsampling ('4:2:0' or '4:4:4').
 * @param {number} [heifOptions.bitdepth] - Bit depth (8, 10, or 12).
 * @returns {any} The result of updating the output format to HEIF with the provided options.
 * @throws {Error} If any option is invalid or of the wrong type.
 */
function applyHeifOptions(heifOptions) {
  // Ensure the input is an object
  if (!x1.object(heifOptions)) {
    throw x1.invalidParameterError("options", "Object", heifOptions);
  }

  // Validate and set compression algorithm
  if (x1.string(heifOptions.compression)) {
    if (x1.inArray(heifOptions.compression, ["av1", "hevc"])) {
      this.options.heifCompression = heifOptions.compression;
    } else {
      throw x1.invalidParameterError(
        "compression",
        "one of: av1, hevc",
        heifOptions.compression
      );
    }
  }

  // Validate and set quality
  if (x1.defined(heifOptions.quality)) {
    if (
      x1.integer(heifOptions.quality) &&
      x1.inRange(heifOptions.quality, 1, 100)
    ) {
      this.options.heifQuality = heifOptions.quality;
    } else {
      throw x1.invalidParameterError(
        "quality",
        "integer between 1 and 100",
        heifOptions.quality
      );
    }
  }

  // Validate and set lossless flag
  if (x1.defined(heifOptions.lossless)) {
    if (x1.bool(heifOptions.lossless)) {
      this.options.heifLossless = heifOptions.lossless;
    } else {
      throw x1.invalidParameterError(
        "lossless",
        "boolean",
        heifOptions.lossless
      );
    }
  }

  // Validate and set effort
  if (x1.defined(heifOptions.effort)) {
    if (
      x1.integer(heifOptions.effort) &&
      x1.inRange(heifOptions.effort, 0, 9)
    ) {
      this.options.heifEffort = heifOptions.effort;
    } else {
      throw x1.invalidParameterError(
        "effort",
        "integer between 0 and 9",
        heifOptions.effort
      );
    }
  }

  // Validate and set chroma subsampling
  if (x1.defined(heifOptions.chromaSubsampling)) {
    if (
      x1.string(heifOptions.chromaSubsampling) &&
      x1.inArray(heifOptions.chromaSubsampling, ["4:2:0", "4:4:4"])
    ) {
      this.options.heifChromaSubsampling = heifOptions.chromaSubsampling;
    } else {
      throw x1.invalidParameterError(
        "chromaSubsampling",
        "one of: 4:2:0, 4:4:4",
        heifOptions.chromaSubsampling
      );
    }
  }

  // Validate and set bit depth
  if (x1.defined(heifOptions.bitdepth)) {
    if (
      x1.integer(heifOptions.bitdepth) &&
      x1.inArray(heifOptions.bitdepth, [8, 10, 12])
    ) {
      // If using prebuilt binaries, only bitdepth 8 is allowed
      if (
        heifOptions.bitdepth !== 8 &&
        this.constructor.versions &&
        this.constructor.versions.heif
      ) {
        throw x1.invalidParameterError(
          "bitdepth when using prebuilt binaries",
          8,
          heifOptions.bitdepth
        );
      }
      this.options.heifBitdepth = heifOptions.bitdepth;
    } else {
      throw x1.invalidParameterError(
        "bitdepth",
        "8, 10 or 12",
        heifOptions.bitdepth
      );
    }
  }

  // Update the output format to HEIF with the provided options
  return this._updateFormatOut("heif", heifOptions);
}

module.exports = applyHeifOptions;
