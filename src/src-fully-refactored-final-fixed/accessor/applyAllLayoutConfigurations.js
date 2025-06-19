/**
 * Applies a comprehensive set of layout-related configurations to a target observable/layout object.
 * This function delegates to specialized configuration functions for position, margin, padding, flexbox,
 * dimensions, display, border, and gap settings, ensuring the target object is updated according to the provided config.
 *
 * @param {Object} targetLayoutObject - The object representing the layout or observable to which configurations will be applied.
 * @param {Object} [config={}] - The configuration object containing layout, style, and display properties.
 * @returns {void}
 */
const applyAllLayoutConfigurations = (targetLayoutObject, config = {}) => {
  // Apply position type configuration (e.g., absolute, relative)
  applyPositionTypeFromConfig(targetLayoutObject, config);

  // Apply margin settings (individual or shorthand)
  applyMarginConfig(targetLayoutObject, config);

  // Apply padding settings (individual or shorthand)
  applyPaddingConfig(targetLayoutObject, config);

  // Apply flexbox-related properties (flexDirection, justifyContent, etc.)
  applyFlexboxConfig(targetLayoutObject, config);

  // Apply dimension properties (width, height, minWidth, minHeight)
  applyDimensionConfig(targetLayoutObject, config);

  // Update display property (block, flex, none, etc.)
  updateDisplayFromConfig(targetLayoutObject, config);

  // Apply border styles to specified sides
  applyBorderStyles(targetLayoutObject, config);

  // Apply gap settings (gap, columnGap, rowGap)
  applyGapSettings(targetLayoutObject, config);
};

module.exports = applyAllLayoutConfigurations;