/**
 * Applies JPEG-specific encoding options to the current instance based on the provided options object.
 * Validates and sets quality, progressive, chroma subsampling, optimization, MozJPEG, trellis quantization, overshoot deringing, optimize scans, and quantization table options.
 * Throws errors for invalid parameter values.
 *
 * @param {Object} jpegOptions - An object containing JPEG encoding options.
 * @param {number} [jpegOptions.quality] - JPEG quality (integer between 1 and 100).
 * @param {boolean} [jpegOptions.progressive] - Whether to use progressive JPEG encoding.
 * @param {string} [jpegOptions.chromaSubsampling] - Chroma subsampling mode ('4:2:0' or '4:4:4').
 * @param {boolean} [jpegOptions.optimizeCoding|optimiseCoding] - Whether to optimize Huffman coding tables.
 * @param {boolean} [jpegOptions.mozjpeg] - Whether to enable MozJPEG-specific optimizations.
 * @param {boolean} [jpegOptions.trellisQuantization|trellisQuantisation] - Whether to enable trellis quantization.
 * @param {boolean} [jpegOptions.overshootDeringing] - Whether to enable overshoot deringing.
 * @param {boolean} [jpegOptions.optimizeScans|optimiseScans] - Whether to optimize scan sequences.
 * @param {number} [jpegOptions.quantizationTable|quantisationTable] - Quantization table index (integer between 0 and 8).
 * @returns {string} The output format after applying JPEG options.
 * @throws {Error} If any parameter is invalid.
 */
function applyJpegOptions(jpegOptions) {
  // Ensure the input is an object
  if (x1.object(jpegOptions)) {
    // Handle 'quality' option
    if (x1.defined(jpegOptions.quality)) {
      if (x1.integer(jpegOptions.quality) && x1.inRange(jpegOptions.quality, 1, 100)) {
        this.options.jpegQuality = jpegOptions.quality;
      } else {
        throw x1.invalidParameterError(
          "quality",
          "integer between 1 and 100",
          jpegOptions.quality
        );
      }
    }

    // Handle 'progressive' option
    if (x1.defined(jpegOptions.progressive)) {
      this._setBooleanOption("jpegProgressive", jpegOptions.progressive);
    }

    // Handle 'chromaSubsampling' option
    if (x1.defined(jpegOptions.chromaSubsampling)) {
      if (
        x1.string(jpegOptions.chromaSubsampling) &&
        x1.inArray(jpegOptions.chromaSubsampling, ["4:2:0", "4:4:4"])
      ) {
        this.options.jpegChromaSubsampling = jpegOptions.chromaSubsampling;
      } else {
        throw x1.invalidParameterError(
          "chromaSubsampling",
          "one of: 4:2:0, 4:4:4",
          jpegOptions.chromaSubsampling
        );
      }
    }

    // Handle 'optimizeCoding' or 'optimiseCoding' option (British/American spelling)
    const optimizeCodingValue = x1.bool(jpegOptions.optimizeCoding)
      ? jpegOptions.optimizeCoding
      : jpegOptions.optimiseCoding;
    if (x1.defined(optimizeCodingValue)) {
      this._setBooleanOption("jpegOptimiseCoding", optimizeCodingValue);
    }

    // Handle 'mozjpeg' option
    if (x1.defined(jpegOptions.mozjpeg)) {
      if (x1.bool(jpegOptions.mozjpeg)) {
        if (jpegOptions.mozjpeg) {
          // Enable all MozJPEG-specific options
          this.options.jpegTrellisQuantisation = true;
          this.options.jpegOvershootDeringing = true;
          this.options.jpegOptimiseScans = true;
          this.options.jpegProgressive = true;
          this.options.jpegQuantisationTable = 3;
        }
      } else {
        throw x1.invalidParameterError(
          "mozjpeg",
          "boolean",
          jpegOptions.mozjpeg
        );
      }
    }

    // Handle 'trellisQuantization' or 'trellisQuantisation' option
    const trellisQuantizationValue = x1.bool(jpegOptions.trellisQuantization)
      ? jpegOptions.trellisQuantization
      : jpegOptions.trellisQuantisation;
    if (x1.defined(trellisQuantizationValue)) {
      this._setBooleanOption("jpegTrellisQuantisation", trellisQuantizationValue);
    }

    // Handle 'overshootDeringing' option
    if (x1.defined(jpegOptions.overshootDeringing)) {
      this._setBooleanOption("jpegOvershootDeringing", jpegOptions.overshootDeringing);
    }

    // Handle 'optimizeScans' or 'optimiseScans' option
    const optimizeScansValue = x1.bool(jpegOptions.optimizeScans)
      ? jpegOptions.optimizeScans
      : jpegOptions.optimiseScans;
    if (x1.defined(optimizeScansValue)) {
      this._setBooleanOption("jpegOptimiseScans", optimizeScansValue);
      // If optimize scans is enabled, progressive must also be enabled
      if (optimizeScansValue) {
        this.options.jpegProgressive = true;
      }
    }

    // Handle 'quantizationTable' or 'quantisationTable' option
    const quantizationTableValue = x1.number(jpegOptions.quantizationTable)
      ? jpegOptions.quantizationTable
      : jpegOptions.quantisationTable;
    if (x1.defined(quantizationTableValue)) {
      if (
        x1.integer(quantizationTableValue) &&
        x1.inRange(quantizationTableValue, 0, 8)
      ) {
        this.options.jpegQuantisationTable = quantizationTableValue;
      } else {
        throw x1.invalidParameterError(
          "quantisationTable",
          "integer between 0 and 8",
          quantizationTableValue
        );
      }
    }
  }
  // Update the output format to 'jpeg' and return the result
  return this._updateFormatOut("jpeg", jpegOptions);
}

module.exports = applyJpegOptions;