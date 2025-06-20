/**
 * Converts a color value from one format to another using the XV color utility.
 * Supports conversion between 'rgb', 'hex', 'ansi', 'ansi256', and 'ansi16m' color spaces.
 *
 * @param {string} sourceFormat - The format of the input color (e.g., 'rgb', 'hex').
 * @param {string} targetFormat - The desired output format (e.g., 'ansi16m', 'ansi256', 'ansi').
 * @param {string} colorType - The color type or method to use from XV (e.g., 'foreground', 'background').
 * @param {...any} colorValues - The color values to convert (e.g., [255, 0, 0] for RGB, or ['#ff0000'] for HEX).
 * @returns {string} The color value converted to the target format.
 */
function convertColorFormat(sourceFormat, targetFormat, colorType, ...colorValues) {
  // If the source format is RGB
  if (sourceFormat === "rgb") {
    if (targetFormat === "ansi16m") {
      // Directly convert RGB to ansi16m using the specified colorType method
      return XV[colorType].ansi16m(...colorValues);
    }
    if (targetFormat === "ansi256") {
      // Convert RGB to ansi256 via XV.rgbToAnsi256, then use the colorType method
      return XV[colorType].ansi256(XV.rgbToAnsi256(...colorValues));
    }
    // Default: Convert RGB to ansi via XV.rgbToAnsi, then use the colorType method
    return XV[colorType].ansi(XV.rgbToAnsi(...colorValues));
  }

  // If the source format is HEX, first convert HEX to RGB, then recursively call this function with RGB
  if (sourceFormat === "hex") {
    // Convert HEX to RGB, then call convertColorFormat with 'rgb' as the new sourceFormat
    return convertColorFormat(
      "rgb",
      targetFormat,
      colorType,
      ...XV.hexToRgb(...colorValues)
    );
  }

  // For all other formats, directly call the corresponding method on XV[colorType][sourceFormat]
  return XV[colorType][sourceFormat](...colorValues);
}

module.exports = convertColorFormat;