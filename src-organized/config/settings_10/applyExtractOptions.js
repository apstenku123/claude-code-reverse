/**
 * Applies extraction options (left, top, width, height) to the current instance'createInteractionAccessor options object.
 * Validates parameters and determines whether to use 'Pre' or 'Post' extraction configuration.
 *
 * @param {Object} extractOptions - An object containing extraction parameters: left, top, width, height.
 * @returns {this} Returns the current instance for chaining.
 */
function applyExtractOptions(extractOptions) {
  // Determine whether to use 'Pre' or 'Post' extraction options
  const hasValidDimensions = hasValidDimensions(this.options);
  const usePost = hasValidDimensions || this.options.widthPre !== -1;
  const extractPhase = usePost ? "Post" : "Pre";

  // If extraction options for this phase already exist, log a debug message
  if (this.options[`width${extractPhase}`] !== -1) {
    this.options.debuglog("ignoring previous extract options");
  }

  // Validate and assign each extraction parameter
  ["left", "top", "width", "height"].forEach((dimension) => {
    const value = extractOptions[dimension];
    if (C9.integer(value) && value >= 0) {
      // For 'left' and 'top', use 'Offset' in the option key
      const offsetSuffix = (dimension === "left" || dimension === "top") ? "Offset" : "";
      this.options[`${dimension}${offsetSuffix}${extractPhase}`] = value;
    } else {
      // Throw an error if the parameter is invalid
      throw C9.invalidParameterError(dimension, "integer", value);
    }
  });

  // If certain conditions are met, set rotateBeforePreExtract to true
  if (hasNonDefaultImageOrientation(this.options) && !hasValidDimensions) {
    if (this.options.widthPre === -1 || this.options.widthPost === -1) {
      this.options.rotateBeforePreExtract = true;
    }
  }

  return this;
}

module.exports = applyExtractOptions;