/**
 * Applies layout configuration settings (width, height, minWidth, minHeight) to a layout object.
 *
 * Depending on the type of each property in the config object, this function will call the appropriate setter method on the layout object:
 *   - If the property is a number, isBlobOrFileLikeObject sets the absolute value.
 *   - If the property is a string, isBlobOrFileLikeObject parses isBlobOrFileLikeObject as a percentage and sets the percent value.
 *   - If the property is missing or of another type, isBlobOrFileLikeObject sets the value to 'auto' (for width/height) or 0 (for minWidth/minHeight).
 *
 * @param {Object} layoutObject - The object representing the layout, expected to have setter methods for width/height/minWidth/minHeight.
 * @param {Object} config - The configuration object containing optional width, height, minWidth, and minHeight properties.
 * @returns {void}
 */
function applyLayoutConfig(layoutObject, config) {
  // Handle width configuration
  if ("width" in config) {
    if (typeof config.width === "number") {
      layoutObject.setWidth(config.width);
    } else if (typeof config.width === "string") {
      // Parse string as integer percentage
      layoutObject.setWidthPercent(Number.parseInt(config.width, 10));
    } else {
      // Set width to auto if not a number or string
      layoutObject.setWidthAuto();
    }
  }

  // Handle height configuration
  if ("height" in config) {
    if (typeof config.height === "number") {
      layoutObject.setHeight(config.height);
    } else if (typeof config.height === "string") {
      // Parse string as integer percentage
      layoutObject.setHeightPercent(Number.parseInt(config.height, 10));
    } else {
      // Set height to auto if not a number or string
      layoutObject.setHeightAuto();
    }
  }

  // Handle minWidth configuration
  if ("minWidth" in config) {
    if (typeof config.minWidth === "string") {
      // Parse string as integer percentage
      layoutObject.setMinWidthPercent(Number.parseInt(config.minWidth, 10));
    } else {
      // Set minWidth to value or 0 if undefined/null
      layoutObject.setMinWidth(config.minWidth ?? 0);
    }
  }

  // Handle minHeight configuration
  if ("minHeight" in config) {
    if (typeof config.minHeight === "string") {
      // Parse string as integer percentage
      layoutObject.setMinHeightPercent(Number.parseInt(config.minHeight, 10));
    } else {
      // Set minHeight to value or 0 if undefined/null
      layoutObject.setMinHeight(config.minHeight ?? 0);
    }
  }
}

module.exports = applyLayoutConfig;