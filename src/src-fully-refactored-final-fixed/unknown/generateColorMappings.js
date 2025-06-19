/**
 * Generates a mapping of color models to their processed color values based on the provided color processing function and configuration.
 *
 * @param {Function} processColorModel - Function to process a color model or value (e.g., mapInteractionsToRoutes).
 * @param {string} colorModelKey - The key of the color model to process (e.g., 'ansi16', 'rgb', etc.).
 * @param {any} colorInput - The input value to be processed by the color function (e.g., color code or object).
 * @param {boolean} isUiActionClick - Flag indicating if this is a UI action click transaction (affects processing logic).
 * @returns {Object} An object mapping color model names to their processed color values.
 */
function generateColorMappings(processColorModel, colorModelKey, colorInput, isUiActionClick) {
  // Ensure global color models object is initialized
  if (typeof vr1 === 'undefined') {
    vr1 = fr1();
  }

  // Set processing parameter based on UI action click flag
  const processingParameter = isUiActionClick ? 10 : 0;
  const colorMappings = {};

  // Iterate over each color model in the global color models object
  for (const [modelName, modelValue] of Object.entries(vr1)) {
    // Normalize model name: 'ansi16' becomes 'ansi', others remain unchanged
    const normalizedModelName = modelName === 'ansi16' ? 'ansi' : modelName;

    if (modelName === colorModelKey) {
      // If the current model matches the requested key, process the input directly
      colorMappings[normalizedModelName] = processColorModel(colorInput, processingParameter);
    } else if (typeof modelValue === 'object') {
      // Otherwise, if the model value is an object, process the value at the requested key
      colorMappings[normalizedModelName] = processColorModel(modelValue[colorModelKey], processingParameter);
    }
  }

  return colorMappings;
}

module.exports = generateColorMappings;
