/**
 * Applies border styles to a given element based on the provided configuration.
 *
 * @param {Object} element - The target element or object that supports setBorder method.
 * @param {Object} borderConfig - Configuration object specifying border styles and sides.
 * @param {boolean} [borderConfig.borderStyle] - Indicates if borders should be applied (true) or not (false).
 * @param {boolean} [borderConfig.borderTop] - If not false, applies the border to the top side.
 * @param {boolean} [borderConfig.borderBottom] - If not false, applies the border to the bottom side.
 * @param {boolean} [borderConfig.borderLeft] - If not false, applies the border to the left side.
 * @param {boolean} [borderConfig.borderRight] - If not false, applies the border to the right side.
 * @returns {void}
 */
function applyBorderStyles(element, borderConfig) {
  // Only proceed if borderStyle property exists in the config
  if ("borderStyle" in borderConfig) {
    // Determine the border value: 1 if borderStyle is truthy, 0 otherwise
    const borderValue = borderConfig.borderStyle ? 1 : 0;

    // Apply border to the top side if borderTop is not explicitly false
    if (borderConfig.borderTop !== false) {
      element.setBorder(UL, borderValue);
    }
    // Apply border to the bottom side if borderBottom is not explicitly false
    if (borderConfig.borderBottom !== false) {
      element.setBorder(NL, borderValue);
    }
    // Apply border to the left side if borderLeft is not explicitly false
    if (borderConfig.borderLeft !== false) {
      element.setBorder(xz, borderValue);
    }
    // Apply border to the right side if borderRight is not explicitly false
    if (borderConfig.borderRight !== false) {
      element.setBorder(fz, borderValue);
    }
  }
}

module.exports = applyBorderStyles;