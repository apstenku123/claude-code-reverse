/**
 * Configures JPEG output options based on the provided configuration object.
 * Validates and sets various JPEG-specific options such as quality, progressive encoding,
 * chroma subsampling, optimization flags, and quantization tables.
 * Throws errors for invalid parameter values.
 *
 * @param {Object} jpegOptions - The configuration object containing JPEG options.
 * @returns {string} The output format after updating the options (always 'jpeg').
 * @throws {Error} If any parameter is invalid according to the validation rules.
 */
function configureJpegOptions(jpegOptions) {
  // Ensure the input is an object
  if (x1.object(jpegOptions)) {
    // Handle 'quality' option: must be integer between 1 and 100
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

    // Handle 'progressive' option: boolean
    if (x1.defined(jpegOptions.progressive)) {
      this._setBooleanOption("jpegProgressive", jpegOptions.progressive);
    }

    // Handle 'chromaSubsampling' option: string, must be '4:2:0' or '4:4:4'
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

    // Handle 'optimizeCoding' (US) or 'optimiseCoding' (UK): boolean
    const optimizeCodingValue = x1.bool(jpegOptions.optimizeCoding)
      ? jpegOptions.optimizeCoding
      : jpegOptions.optimiseCoding;
    if (x1.defined(optimizeCodingValue)) {
      this._setBooleanOption("jpegOptimiseCoding", optimizeCodingValue);
    }

    // Handle 'mozjpeg' option: boolean, if true set multiple advanced options
    if (x1.defined(jpegOptions.mozjpeg)) {
      if (x1.bool(jpegOptions.mozjpeg)) {
        if (jpegOptions.mozjpeg) {
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

    // Handle 'trellisQuantization' (US) or 'trellisQuantisation' (UK): boolean
    const trellisQuantisationValue = x1.bool(jpegOptions.trellisQuantization)
      ? jpegOptions.trellisQuantization
      : jpegOptions.trellisQuantisation;
    if (x1.defined(trellisQuantisationValue)) {
      this._setBooleanOption("jpegTrellisQuantisation", trellisQuantisationValue);
    }

    // Handle 'overshootDeringing' option: boolean
    if (x1.defined(jpegOptions.overshootDeringing)) {
      this._setBooleanOption("jpegOvershootDeringing", jpegOptions.overshootDeringing);
    }

    // Handle 'optimizeScans' (US) or 'optimiseScans' (UK): boolean
    const optimiseScansValue = x1.bool(jpegOptions.optimizeScans)
      ? jpegOptions.optimizeScans
      : jpegOptions.optimiseScans;
    if (x1.defined(optimiseScansValue)) {
      this._setBooleanOption("jpegOptimiseScans", optimiseScansValue);
      // If progressive scans are enabled, force progressive encoding
      if (optimiseScansValue) {
        this.options.jpegProgressive = true;
      }
    }

    // Handle 'quantizationTable' (US) or 'quantisationTable' (UK): integer between 0 and 8
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
  // Update the output format to 'jpeg' and return the result
  return this._updateFormatOut("jpeg", jpegOptions);
}

module.exports = configureJpegOptions;