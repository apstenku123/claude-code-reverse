/**
 * Generates a set of color variants based on a color mapping and configuration.
 *
 * @param {Function} colorFunction - Function to generate color values.
 * @param {string} colorKey - The key representing the base color.
 * @param {any} colorInput - Input value passed to the color function.
 * @param {boolean} isBright - Flag indicating whether to use bright color variants.
 * @returns {Object} An object mapping color variant names to generated color values.
 */
function generateColorVariants(colorFunction, colorKey, colorInput, isBright) {
  // Ensure the color mapping object is initialized
  if (typeof colorVariantsMap === 'undefined') {
    colorVariantsMap = initializeColorVariantsMap();
  }

  // Set the brightness offset based on the isBright flag
  const brightnessOffset = isBright ? 10 : 0;
  const generatedVariants = {};

  // Iterate over each color variant in the mapping
  for (const [variantName, variantValue] of Object.entries(colorVariantsMap)) {
    // Normalize the variant name for 'ansi16'
    const normalizedVariantName = variantName === 'ansi16' ? 'ansi' : variantName;

    if (variantName === colorKey) {
      // If the variant matches the colorKey, generate the color directly
      generatedVariants[normalizedVariantName] = colorFunction(colorInput, brightnessOffset);
    } else if (typeof variantValue === 'object') {
      // If the variant value is an object, generate the color using the nested value
      generatedVariants[normalizedVariantName] = colorFunction(variantValue[colorKey], brightnessOffset);
    }
  }

  return generatedVariants;
}

module.exports = generateColorVariants;