/**
 * Retrieves a scale mapping value by its index, ensuring the index is within valid bounds.
 *
 * @param {number} scaleIndex - The index of the scale to retrieve. Must be between minScaleIndex and maxScaleIndex (inclusive).
 * @returns {any} The value from the scale mapping array corresponding to the provided index.
 * @throws {MappingError} If the scaleIndex is outside the allowed range.
 */
function getScaleMappingByIndex(scaleIndex) {
  // Ensure the scaleIndex is within the allowed range
  if (scaleIndex > maxScaleIndex || scaleIndex < minScaleIndex) {
    throw new MappingError(`expected scale >= ${minScaleIndex} && <= ${maxScaleIndex}, got: ${scaleIndex}`);
  }
  // Retrieve the mapping value, offset by 10
  return scaleMappingArray[scaleIndex + 10];
}

// External dependencies (assumed to be imported or defined elsewhere)
// const maxScaleIndex = CF0;
// const minScaleIndex = XF0;
// const MappingError = Cg4.MappingError;
// const scaleMappingArray = Vg4;

module.exports = getScaleMappingByIndex;