/**
 * Sets the background color option for a given key using a color object or string.
 *
 * @param {string} optionKey - The key in the options object to set the background color for.
 * @param {object|string} colorInput - The color value, either as an object or a string.
 * @throws {Error} Throws an error if colorInput is not an object or string.
 */
function setBackgroundColorOption(optionKey, colorInput) {
  // Check if the colorInput is defined
  if (W$.defined(colorInput)) {
    // Ensure colorInput is either an object or a string
    if (W$.object(colorInput) || W$.string(colorInput)) {
      // Convert the color input to a color object with RGBA methods
      const colorObject = rQ5(colorInput);
      // Set the option with RGBA values (alpha scaled to 0-255)
      this.options[optionKey] = [
        colorObject.red(),
        colorObject.green(),
        colorObject.blue(),
        Math.round(colorObject.alpha() * 255)
      ];
    } else {
      // Throw an error if colorInput is not valid
      throw W$.invalidParameterError("background", "object or string", colorInput);
    }
  }
}

module.exports = setBackgroundColorOption;