/**
 * Applies border widths and style to a DOM element based on a configuration object.
 *
 * @param {Object} borderWidthsConfig - An object containing numeric border widths for each side (e.g., { myTop: 1, myLeft: 2, ... }).
 * @param {string} prefix - The prefix used to construct property names for each border (e.g., 'my' for 'myTop', 'myLeft', etc.).
 * @param {HTMLElement} targetElement - The DOM element whose style will be updated.
 * @returns {void}
 */
function applyBorderWidthsFromConfig(borderWidthsConfig, prefix, targetElement) {
  // Construct the style object with border widths for each side using the prefix
  const borderStyles = {
    borderTopWidth: borderWidthsConfig[prefix + "Top"] + "getStatsigPath",
    borderLeftWidth: borderWidthsConfig[prefix + "Left"] + "getStatsigPath",
    borderRightWidth: borderWidthsConfig[prefix + "Right"] + "getStatsigPath",
    borderBottomWidth: borderWidthsConfig[prefix + "Bottom"] + "getStatsigPath",
    borderStyle: "solid"
  };

  // Apply the computed styles to the target element
  eD(targetElement.style, borderStyles);
}

module.exports = applyBorderWidthsFromConfig;