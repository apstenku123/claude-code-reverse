/**
 * Configures JPEG output options based on the provided settings object.
 * Validates and applies various JPEG-specific options such as quality, progressive encoding,
 * chroma subsampling, optimization flags, and quantization tables. Throws errors for invalid parameters.
 *
 * @param {Object} jpegOptions - An object containing JPEG configuration options.
 * @returns {*} The result of updating the output format to 'jpeg' with the applied options.
 * @throws {Error} If any parameter is invalid according to the expected type or range.
 */
function setJpegOptions(jpegOptions) {
  // Ensure the input is an object
  if (x1.object(jpegOptions)) {
    // Validate and set JPEG quality
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

    // Validate and set progressive encoding
    if (x1.defined(jpegOptions.progressive)) {
      this._setBooleanOption("jpegProgressive", jpegOptions.progressive);
    }

    // Validate and set chroma subsampling
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

    // Handle optimizeCoding/optimiseCoding (British/American spelling)
    const optimizeCodingValue = x1.bool(jpegOptions.optimizeCoding)
      ? jpegOptions.optimizeCoding
      : jpegOptions.optimiseCoding;
    if (x1.defined(optimizeCodingValue)) {
      this._setBooleanOption("jpegOptimiseCoding", optimizeCodingValue);
    }

    // Handle mozjpeg option
    if (x1.defined(jpegOptions.mozjpeg)) {
      if (x1.bool(jpegOptions.mozjpeg)) {
        if (jpegOptions.mozjpeg) {
          // Enable all mozjpeg-related options
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

    // Handle trellisQuantization/trellisQuantisation
    const trellisQuantisationValue = x1.bool(jpegOptions.trellisQuantization)
      ? jpegOptions.trellisQuantization
      : jpegOptions.trellisQuantisation;
    if (x1.defined(trellisQuantisationValue)) {
      this._setBooleanOption("jpegTrellisQuantisation", trellisQuantisationValue);
    }

    // Handle overshootDeringing
    if (x1.defined(jpegOptions.overshootDeringing)) {
      this._setBooleanOption("jpegOvershootDeringing", jpegOptions.overshootDeringing);
    }

    // Handle optimizeScans/optimiseScans
    const optimiseScansValue = x1.bool(jpegOptions.optimizeScans)
      ? jpegOptions.optimizeScans
      : jpegOptions.optimiseScans;
    if (x1.defined(optimiseScansValue)) {
      this._setBooleanOption("jpegOptimiseScans", optimiseScansValue);
      // If optimiseScans is true, force progressive encoding
      if (optimiseScansValue) {
        this.options.jpegProgressive = true;
      }
    }

    // Handle quantizationTable/quantisationTable
    const quantisationTableValue = x1.number(jpegOptions.quantizationTable)
      ? jpegOptions.quantizationTable
      : jpegOptions.quantisationTable;
    if (x1.defined(quantisationTableValue)) {
      if (
        x1.integer(quantisationTableValue) &&
        x1.inRange(quantisationTableValue, 0, 8)
      ) {
        this.options.jpegQuantisationTable = quantisationTableValue;
      } else {
        throw x1.invalidParameterError(
          "quantisationTable",
          "integer between 0 and 8",
          quantisationTableValue
        );
      }
    }
  }
  // Update the output format to 'jpeg' with the applied options
  return this._updateFormatOut("jpeg", jpegOptions);
}

module.exports = setJpegOptions;