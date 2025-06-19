/**
 * Converts color values between various formats using the XV color utility.
 * Handles special cases for 'rgb' and 'hex' source formats, delegating to the appropriate XV methods.
 *
 * @param {string} sourceFormat - The format of the input color (e.g., 'rgb', 'hex').
 * @param {string} targetFormat - The desired output color format (e.g., 'ansi16m', 'ansi256', 'ansi').
 * @param {string} colorType - The color type or method to use from the XV utility (e.g., 'foreground', 'background').
 * @param {...any} colorValues - The color values to convert (e.g., RGB values, hex string).
 * @returns {string} The converted color value in the target format.
 */
const convertColorUtility = (sourceFormat, targetFormat, colorType, ...colorValues) => {
  // Handle RGB source format
  if (sourceFormat === "rgb") {
    // If target is 'ansi16m', directly use XV utility
    if (targetFormat === "ansi16m") {
      return XV[colorType].ansi16m(...colorValues);
    }
    // If target is 'ansi256', convert RGB to ANSI256
    if (targetFormat === "ansi256") {
      return XV[colorType].ansi256(XV.rgbToAnsi256(...colorValues));
    }
    // Default: convert RGB to ANSI
    return XV[colorType].ansi(XV.rgbToAnsi(...colorValues));
  }

  // Handle HEX source format by converting HEX to RGB, then recursively call this utility
  if (sourceFormat === "hex") {
    // Convert HEX to RGB and spread the result as arguments
    return convertColorUtility(
      "rgb",
      targetFormat,
      colorType,
      ...XV.hexToRgb(...colorValues)
    );
  }

  // For all other source formats, delegate to the corresponding XV utility method
  return XV[colorType][sourceFormat](...colorValues);
};

module.exports = convertColorUtility;
