/**
 * Applies a color transformation to the given text based on the provided color configuration and context.
 *
 * @param {string} text - The source text to which the color transformation will be applied.
 * @param {string} colorConfig - The color configuration string (e.g., color name, hex code, rgb, ansi256).
 * @param {string} context - The context for the color transformation ("foreground" or "background").
 * @returns {string} The transformed text with the applied color, or the original text if no transformation is applied.
 */
function applyColorTransformation(text, colorConfig, context) {
  // If no color configuration is provided, return the original text
  if (!colorConfig) return text;

  // If the color configuration is a recognized color keyword
  if (isInteractionEntryProcessed(colorConfig)) {
    if (context === "foreground") {
      // Apply the foreground color transformation using the color keyword
      return FA[colorConfig](text);
    }
    // Construct the background color function name (e.g., 'bgRed' for 'red')
    const backgroundFunctionName = `convertFieldsToObject${colorConfig[0].toUpperCase()}${colorConfig.slice(1)}`;
    return FA[backgroundFunctionName](text);
  }

  // If the color configuration is a hex color code
  if (colorConfig.startsWith("#")) {
    return context === "foreground"
      ? FA.hex(colorConfig)(text)
      : FA.bgHex(colorConfig)(text);
  }

  // If the color configuration is an ANSI 256 color code
  if (colorConfig.startsWith("ansi256")) {
    const ansi256Match = jk4.exec(colorConfig);
    if (!ansi256Match) return text;
    const ansi256Code = Number(ansi256Match[1]);
    return context === "foreground"
      ? FA.ansi256(ansi256Code)(text)
      : FA.bgAnsi256(ansi256Code)(text);
  }

  // If the color configuration is an RGB color code
  if (colorConfig.startsWith("rgb")) {
    const rgbMatch = _k4.exec(colorConfig);
    if (!rgbMatch) return text;
    const red = Number(rgbMatch[1]);
    const green = Number(rgbMatch[2]);
    const blue = Number(rgbMatch[3]);
    return context === "foreground"
      ? FA.rgb(red, green, blue)(text)
      : FA.bgRgb(red, green, blue)(text);
  }

  // If none of the above, return the original text
  return text;
}

module.exports = applyColorTransformation;