/**
 * Applies a comprehensive set of layout and style configurations to a target observable/layout object.
 *
 * This function sequentially applies position, margin, padding, flexbox, dimension, display, border, and gap settings
 * from the provided configuration object to the target observable/layout object using specialized helper functions.
 *
 * @param {Object} targetLayoutObject - The object representing the layout or observable to which the configuration will be applied.
 * @param {Object} [config={}] - The configuration object containing layout and style properties to apply.
 * @returns {void}
 */
function applyLayoutConfiguration(targetLayoutObject, config = {}) {
  // Apply position type (e.g., 'absolute', 'relative') from config
  applyPositionTypeFromConfig(targetLayoutObject, config);

  // Apply margin properties (e.g., margin, marginTop, marginLeft, etc.)
  applyMarginConfig(targetLayoutObject, config);

  // Apply padding properties (e.g., padding, paddingTop, paddingLeft, etc.)
  applyPaddingConfig(targetLayoutObject, config);

  // Apply flexbox-related configuration (e.g., flexDirection, justifyContent, alignItems, etc.)
  applyFlexboxConfig(targetLayoutObject, config);

  // Apply dimension settings (e.g., width, height, minWidth, minHeight)
  applyDimensionConfig(targetLayoutObject, config);

  // Update display property from config (e.g., 'block', 'flex', etc.)
  updateDisplayFromConfig(targetLayoutObject, config);

  // Apply border styles to the specified sides
  applyBorderStyles(targetLayoutObject, config);

  // Apply gap settings (e.g., gap, columnGap, rowGap)
  applyGapSettings(targetLayoutObject, config);
}

module.exports = applyLayoutConfiguration;