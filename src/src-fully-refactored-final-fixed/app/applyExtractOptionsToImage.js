/**
 * Applies extraction options (left, top, width, height) to the current image processing options.
 * Determines whether to use 'Pre' or 'Post' extraction based on current options, validates parameters,
 * and sets appropriate flags for rotation if needed.
 *
 * @param {Object} extractOptions - An object containing extraction parameters: left, top, width, height.
 * @returns {this} Returns the current instance for chaining.
 */
function applyExtractOptionsToImage(extractOptions) {
  // Determine if handleMissingDoctypeError should use 'Pre' or 'Post' extraction
  const hasValidDims = hasValidDimensions(this.options);
  const usePostExtraction = hasValidDims || this.options.widthPre !== -1;
  const extractionPhase = usePostExtraction ? 'Post' : 'Pre';

  // If extraction options for this phase already exist, log a debug message
  if (this.options[`width${extractionPhase}`] !== -1) {
    this.options.debuglog('ignoring previous extract options');
  }

  // Validate and assign extraction parameters
  ['left', 'top', 'width', 'height'].forEach((dimension) => {
    const value = extractOptions[dimension];
    if (C9.integer(value) && value >= 0) {
      // For 'left' and 'top', use 'Offset' in the option key
      const offsetSuffix = (dimension === 'left' || dimension === 'top') ? 'Offset' : '';
      this.options[`${dimension}${offsetSuffix}${extractionPhase}`] = value;
    } else {
      throw C9.invalidParameterError(dimension, 'integer', value);
    }
  });

  // If further processing is required and dimensions are not valid, set rotation flag
  if (hasNonDefaultImageOrientation(this.options) && !hasValidDims) {
    if (this.options.widthPre === -1 || this.options.widthPost === -1) {
      this.options.rotateBeforePreExtract = true;
    }
  }

  return this;
}

module.exports = applyExtractOptionsToImage;