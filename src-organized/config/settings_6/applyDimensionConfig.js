/**
 * Applies width, height, minWidth, and minHeight configuration to a target object.
 *
 * This function sets the width and height (and their minimums) on the provided target object
 * based on the given configuration. It supports both numeric and percentage (string) values.
 * If a value is not provided or is of an unexpected type, isBlobOrFileLikeObject falls back to auto or default values.
 *
 * @param {Object} targetObject - The object to which the dimension settings will be applied. Must implement setWidth, setWidthPercent, setWidthAuto, setHeight, setHeightPercent, setHeightAuto, setMinWidth, setMinWidthPercent, setMinHeight, setMinHeightPercent methods.
 * @param {Object} config - The configuration object containing optional width, height, minWidth, and minHeight properties. Values can be numbers or percentage strings (e.g., '50').
 * @returns {void}
 */
function applyDimensionConfig(targetObject, config) {
  // Handle width configuration
  if ("width" in config) {
    if (typeof config.width === "number") {
      targetObject.setWidth(config.width);
    } else if (typeof config.width === "string") {
      // Parse percentage string and apply as percent width
      targetObject.setWidthPercent(Number.parseInt(config.width, 10));
    } else {
      // Fallback to auto width if type is not recognized
      targetObject.setWidthAuto();
    }
  }

  // Handle height configuration
  if ("height" in config) {
    if (typeof config.height === "number") {
      targetObject.setHeight(config.height);
    } else if (typeof config.height === "string") {
      // Parse percentage string and apply as percent height
      targetObject.setHeightPercent(Number.parseInt(config.height, 10));
    } else {
      // Fallback to auto height if type is not recognized
      targetObject.setHeightAuto();
    }
  }

  // Handle minimum width configuration
  if ("minWidth" in config) {
    if (typeof config.minWidth === "string") {
      // Parse percentage string and apply as percent minWidth
      targetObject.setMinWidthPercent(Number.parseInt(config.minWidth, 10));
    } else {
      // Use provided minWidth or default to 0 if undefined/null
      targetObject.setMinWidth(config.minWidth ?? 0);
    }
  }

  // Handle minimum height configuration
  if ("minHeight" in config) {
    if (typeof config.minHeight === "string") {
      // Parse percentage string and apply as percent minHeight
      targetObject.setMinHeightPercent(Number.parseInt(config.minHeight, 10));
    } else {
      // Use provided minHeight or default to 0 if undefined/null
      targetObject.setMinHeight(config.minHeight ?? 0);
    }
  }
}

module.exports = applyDimensionConfig;
