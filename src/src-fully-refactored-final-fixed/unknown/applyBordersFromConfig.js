/**
 * Applies border styles to a given target object based on the provided configuration.
 *
 * @param {Object} target - The object to which borders will be applied. Must implement setBorder method.
 * @param {Object} config - Configuration object specifying which borders to apply and the border style.
 * @param {boolean} [config.borderStyle] - Determines if the border should be applied (true) or not (false).
 * @param {boolean} [config.borderTop] - If not false, applies the top border.
 * @param {boolean} [config.borderBottom] - If not false, applies the bottom border.
 * @param {boolean} [config.borderLeft] - If not false, applies the left border.
 * @param {boolean} [config.borderRight] - If not false, applies the right border.
 * @returns {void}
 */
function applyBordersFromConfig(target, config) {
  // Check if the config object has a borderStyle property
  if ("borderStyle" in config) {
    // Determine the border value: 1 if borderStyle is truthy, 0 otherwise
    const borderValue = config.borderStyle ? 1 : 0;

    // Apply top border if borderTop is not explicitly false
    if (config.borderTop !== false) {
      target.setBorder(UL, borderValue);
    }

    // Apply bottom border if borderBottom is not explicitly false
    if (config.borderBottom !== false) {
      target.setBorder(NL, borderValue);
    }

    // Apply left border if borderLeft is not explicitly false
    if (config.borderLeft !== false) {
      target.setBorder(xz, borderValue);
    }

    // Apply right border if borderRight is not explicitly false
    if (config.borderRight !== false) {
      target.setBorder(fz, borderValue);
    }
  }
}

module.exports = applyBordersFromConfig;