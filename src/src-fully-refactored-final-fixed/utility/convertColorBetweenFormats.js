/**
 * Converts color values between different color models and ANSI color formats.
 * Delegates to the appropriate conversion functions based on the source and target formats.
 *
 * @param {string} sourceFormat - The source color format (e.g., 'rgb', 'hex').
 * @param {string} targetFormat - The target color format (e.g., 'ansi16m', 'ansi256', 'ansi').
 * @param {string} conversionType - The type of conversion or color operation to perform (e.g., 'foreground', 'background').
 * @param {...any} colorValues - The color values to be converted (e.g., RGB components or hex string).
 * @returns {string} The converted color value in the target format.
 */
const convertColorBetweenFormats = (
  sourceFormat,
  targetFormat,
  conversionType,
  ...colorValues
) => {
  // If the source format is 'rgb', handle conversion to various ANSI formats
  if (sourceFormat === "rgb") {
    if (targetFormat === "ansi16m") {
      // Directly convert RGB to ansi16m using the appropriate method
      return XV[conversionType].ansi16m(...colorValues);
    }
    if (targetFormat === "ansi256") {
      // Convert RGB to ansi256 via an intermediate conversion function
      return XV[conversionType].ansi256(XV.rgbToAnsi256(...colorValues));
    }
    // Default: Convert RGB to base ansi format
    return XV[conversionType].ansi(XV.rgbToAnsi(...colorValues));
  }

  // If the source format is 'hex', first convert hex to RGB, then recursively convert to the target format
  if (sourceFormat === "hex") {
    // convertColorFormat is convertColorFormat, which handles recursive conversion
    return convertColorFormat(
      "rgb",
      targetFormat,
      conversionType,
      ...XV.hexToRgb(...colorValues)
    );
  }

  // For other source formats, delegate to the corresponding method in XV
  return XV[conversionType][sourceFormat](...colorValues);
};

module.exports = convertColorBetweenFormats;