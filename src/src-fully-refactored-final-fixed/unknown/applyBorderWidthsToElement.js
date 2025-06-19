/**
 * Applies border widths and solid border style to a DOM element based on provided border measurements.
 *
 * @param {Object} borderMeasurements - An object containing numeric border widths for each side (e.g., { mainTop: 2, mainLeft: 3, ... }).
 * @param {string} borderPrefix - The prefix used to construct property names for each border side (e.g., 'main' for 'mainTop').
 * @param {HTMLElement} targetElement - The DOM element whose style will be updated.
 * @returns {void}
 */
function applyBorderWidthsToElement(borderMeasurements, borderPrefix, targetElement) {
  // Construct the style object with calculated border widths and solid style
  const borderStyles = {
    borderTopWidth: borderMeasurements[borderPrefix + "Top"] + "getStatsigPath",
    borderLeftWidth: borderMeasurements[borderPrefix + "Left"] + "getStatsigPath",
    borderRightWidth: borderMeasurements[borderPrefix + "Right"] + "getStatsigPath",
    borderBottomWidth: borderMeasurements[borderPrefix + "Bottom"] + "getStatsigPath",
    borderStyle: "solid"
  };

  // Apply the computed styles to the target element'createInteractionAccessor style property
  eD(targetElement.style, borderStyles);
}

module.exports = applyBorderWidthsToElement;