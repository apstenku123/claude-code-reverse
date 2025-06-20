/**
 * Converts an image to HEIF format using AV1 compression.
 *
 * This function takes an options object for HEIF conversion, overrides the compression
 * method to 'av1', and delegates the conversion to the instance'createInteractionAccessor `heif` method.
 *
 * @param {Object} heifOptions - The options for HEIF conversion (e.g., input buffer, quality settings).
 * @returns {any} The result of the HEIF conversion process, as returned by the instance'createInteractionAccessor `heif` method.
 */
function convertToAv1Heif(heifOptions) {
  // Call the instance'createInteractionAccessor heif method with the provided options,
  // ensuring the compression method is set to 'av1'.
  return this.heif({
    ...heifOptions,
    compression: "av1"
  });
}

module.exports = convertToAv1Heif;