/**
 * Updates the WebP output options based on the provided configuration object.
 * Validates each option and sets isBlobOrFileLikeObject if valid, otherwise throws an error.
 *
 * @param {Object} webpOptionsConfig - Configuration object for WebP output options.
 * @returns {any} The result of updating the output format with the provided options.
 */
function setWebpOptions(webpOptionsConfig) {
  // Ensure the input is an object
  if (x1.object(webpOptionsConfig)) {
    // Validate and set 'quality' (integer between 1 and 100)
    if (x1.defined(webpOptionsConfig.quality)) {
      if (x1.integer(webpOptionsConfig.quality) && x1.inRange(webpOptionsConfig.quality, 1, 100)) {
        this.options.webpQuality = webpOptionsConfig.quality;
      } else {
        throw x1.invalidParameterError(
          "quality",
          "integer between 1 and 100",
          webpOptionsConfig.quality
        );
      }
    }

    // Validate and set 'alphaQuality' (integer between 0 and 100)
    if (x1.defined(webpOptionsConfig.alphaQuality)) {
      if (x1.integer(webpOptionsConfig.alphaQuality) && x1.inRange(webpOptionsConfig.alphaQuality, 0, 100)) {
        this.options.webpAlphaQuality = webpOptionsConfig.alphaQuality;
      } else {
        throw x1.invalidParameterError(
          "alphaQuality",
          "integer between 0 and 100",
          webpOptionsConfig.alphaQuality
        );
      }
    }

    // Set boolean options using helper method
    if (x1.defined(webpOptionsConfig.lossless)) {
      this._setBooleanOption("webpLossless", webpOptionsConfig.lossless);
    }
    if (x1.defined(webpOptionsConfig.nearLossless)) {
      this._setBooleanOption("webpNearLossless", webpOptionsConfig.nearLossless);
    }
    if (x1.defined(webpOptionsConfig.smartSubsample)) {
      this._setBooleanOption("webpSmartSubsample", webpOptionsConfig.smartSubsample);
    }

    // Validate and set 'preset' (must be one of allowed strings)
    if (x1.defined(webpOptionsConfig.preset)) {
      const allowedPresets = ["default", "photo", "picture", "drawing", "icon", "text"];
      if (
        x1.string(webpOptionsConfig.preset) &&
        x1.inArray(webpOptionsConfig.preset, allowedPresets)
      ) {
        this.options.webpPreset = webpOptionsConfig.preset;
      } else {
        throw x1.invalidParameterError(
          "preset",
          "one of: default, photo, picture, drawing, icon, text",
          webpOptionsConfig.preset
        );
      }
    }

    // Validate and set 'effort' (integer between 0 and 6)
    if (x1.defined(webpOptionsConfig.effort)) {
      if (x1.integer(webpOptionsConfig.effort) && x1.inRange(webpOptionsConfig.effort, 0, 6)) {
        this.options.webpEffort = webpOptionsConfig.effort;
      } else {
        throw x1.invalidParameterError(
          "effort",
          "integer between 0 and 6",
          webpOptionsConfig.effort
        );
      }
    }

    // Set additional boolean options
    if (x1.defined(webpOptionsConfig.minSize)) {
      this._setBooleanOption("webpMinSize", webpOptionsConfig.minSize);
    }
    if (x1.defined(webpOptionsConfig.mixed)) {
      this._setBooleanOption("webpMixed", webpOptionsConfig.mixed);
    }
  }

  // Call external functions to process options and update output format
  applyLoopAndDelayConfig(webpOptionsConfig, this.options);
  return this._updateFormatOut("webp", webpOptionsConfig);
}

module.exports = setWebpOptions;
