/**
 * Applies WebP-specific encoding options to the current instance based on the provided configuration object.
 * Validates each option and throws an error if any parameter is invalid.
 *
 * @param {Object} webpOptions - An object containing WebP encoding options.
 * @param {number} [webpOptions.quality] - Compression quality (integer between 1 and 100).
 * @param {number} [webpOptions.alphaQuality] - Alpha channel quality (integer between 0 and 100).
 * @param {boolean} [webpOptions.lossless] - Whether to use lossless compression.
 * @param {boolean} [webpOptions.nearLossless] - Whether to use near-lossless compression.
 * @param {boolean} [webpOptions.smartSubsample] - Whether to use smart subsampling.
 * @param {string} [webpOptions.preset] - Preset for compression (one of: default, photo, picture, drawing, icon, text).
 * @param {number} [webpOptions.effort] - CPU effort level (integer between 0 and 6).
 * @param {boolean} [webpOptions.minSize] - Whether to minimize output size.
 * @param {boolean} [webpOptions.mixed] - Whether to allow mixed compression.
 * @returns {any} The result of updating the output format with the provided options.
 */
function applyWebpOptions(webpOptions) {
  // Ensure the input is an object
  if (x1.object(webpOptions)) {
    // Validate and set 'quality' option
    if (x1.defined(webpOptions.quality)) {
      if (x1.integer(webpOptions.quality) && x1.inRange(webpOptions.quality, 1, 100)) {
        this.options.webpQuality = webpOptions.quality;
      } else {
        throw x1.invalidParameterError("quality", "integer between 1 and 100", webpOptions.quality);
      }
    }

    // Validate and set 'alphaQuality' option
    if (x1.defined(webpOptions.alphaQuality)) {
      if (x1.integer(webpOptions.alphaQuality) && x1.inRange(webpOptions.alphaQuality, 0, 100)) {
        this.options.webpAlphaQuality = webpOptions.alphaQuality;
      } else {
        throw x1.invalidParameterError("alphaQuality", "integer between 0 and 100", webpOptions.alphaQuality);
      }
    }

    // Set boolean options using helper
    if (x1.defined(webpOptions.lossless)) {
      this._setBooleanOption("webpLossless", webpOptions.lossless);
    }
    if (x1.defined(webpOptions.nearLossless)) {
      this._setBooleanOption("webpNearLossless", webpOptions.nearLossless);
    }
    if (x1.defined(webpOptions.smartSubsample)) {
      this._setBooleanOption("webpSmartSubsample", webpOptions.smartSubsample);
    }

    // Validate and set 'preset' option
    if (x1.defined(webpOptions.preset)) {
      const allowedPresets = ["default", "photo", "picture", "drawing", "icon", "text"];
      if (x1.string(webpOptions.preset) && x1.inArray(webpOptions.preset, allowedPresets)) {
        this.options.webpPreset = webpOptions.preset;
      } else {
        throw x1.invalidParameterError(
          "preset",
          "one of: default, photo, picture, drawing, icon, text",
          webpOptions.preset
        );
      }
    }

    // Validate and set 'effort' option
    if (x1.defined(webpOptions.effort)) {
      if (x1.integer(webpOptions.effort) && x1.inRange(webpOptions.effort, 0, 6)) {
        this.options.webpEffort = webpOptions.effort;
      } else {
        throw x1.invalidParameterError("effort", "integer between 0 and 6", webpOptions.effort);
      }
    }

    // Set additional boolean options
    if (x1.defined(webpOptions.minSize)) {
      this._setBooleanOption("webpMinSize", webpOptions.minSize);
    }
    if (x1.defined(webpOptions.mixed)) {
      this._setBooleanOption("webpMixed", webpOptions.mixed);
    }
  }

  // Process further and update output format
  applyLoopAndDelayConfig(webpOptions, this.options);
  return this._updateFormatOut("webp", webpOptions);
}

module.exports = applyWebpOptions;
