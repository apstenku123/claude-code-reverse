/**
 * Applies color formatting to a given string based on the provided color configuration and context.
 *
 * @param {string} inputString - The string to be color formatted.
 * @param {string} colorConfig - The color configuration (e.g., color name, hex code, rgb, ansi256).
 * @param {string} context - The context for formatting ('foreground' or 'background').
 * @returns {string} The formatted string with the applied color, or the original string if no formatting is applied.
 */
function applyColorFormatting(inputString, colorConfig, context) {
  // If no color configuration is provided, return the original string
  if (!colorConfig) return inputString;

  // If the colorConfig is a recognized color keyword (e.g., 'red', 'blue')
  if (isInteractionEntryProcessed(colorConfig)) {
    if (context === "foreground") {
      // Apply foreground color using the color keyword
      return FA[colorConfig](inputString);
    }
    // Construct the background color method name (e.g., 'bgRed')
    const backgroundMethod = `convertFieldsToObject${colorConfig[0].toUpperCase()}${colorConfig.slice(1)}`;
    return FA[backgroundMethod](inputString);
  }

  // If the colorConfig is a hex color (e.g., '#ff0000')
  if (colorConfig.startsWith("#")) {
    return context === "foreground"
      ? FA.hex(colorConfig)(inputString)
      : FA.bgHex(colorConfig)(inputString);
  }

  // If the colorConfig is an ANSI 256 color (e.g., 'ansi256_123')
  if (colorConfig.startsWith("ansi256")) {
    const ansiMatch = ansi256Regex.exec(colorConfig);
    if (!ansiMatch) return inputString;
    const ansiCode = Number(ansiMatch[1]);
    return context === "foreground"
      ? FA.ansi256(ansiCode)(inputString)
      : FA.bgAnsi256(ansiCode)(inputString);
  }

  // If the colorConfig is an RGB color (e.g., 'rgb_255_0_0')
  if (colorConfig.startsWith("rgb")) {
    const rgbMatch = rgbRegex.exec(colorConfig);
    if (!rgbMatch) return inputString;
    const red = Number(rgbMatch[1]);
    const green = Number(rgbMatch[2]);
    const blue = Number(rgbMatch[3]);
    return context === "foreground"
      ? FA.rgb(red, green, blue)(inputString)
      : FA.bgRgb(red, green, blue)(inputString);
  }

  // If none of the above, return the original string
  return inputString;
}

module.exports = applyColorFormatting;