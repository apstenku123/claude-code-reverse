/**
 * Determines if the given interaction type code is supported.
 *
 * Supported interaction types are: 1, 2, 3, 4, 5, 6, 7, 8, 13, 14, 15, 16, 17, and 18.
 *
 * @param {number} interactionTypeCode - The numeric code representing the interaction type.
 * @returns {boolean} Returns true if the interaction type is supported, otherwise false.
 */
function isSupportedInteractionType(interactionTypeCode) {
  // List of supported interaction type codes
  const supportedInteractionTypes = new Set([
    1, 2, 3, 4, 5, 6, 7, 8, 13, 14, 15, 16, 17, 18
  ]);

  // Check if the provided code is in the set of supported types
  return supportedInteractionTypes.has(interactionTypeCode);
}

module.exports = isSupportedInteractionType;