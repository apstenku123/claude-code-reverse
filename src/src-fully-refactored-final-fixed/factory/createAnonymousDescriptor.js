/**
 * Creates a descriptor object for an anonymous entity based on the provided input.
 *
 * @param {Object} anonymousInput - The input object representing the anonymous entity.
 * @returns {Object} An object containing displayName, id, key, and type properties.
 */
function createAnonymousDescriptor(anonymousInput) {
  return {
    // Use d1 to get displayName; fallback to 'Anonymous' if not provided
    displayName: d1(anonymousInput) || "Anonymous",
    // Generate a unique id using evaluateOrFallback
    id: evaluateOrFallback(anonymousInput),
    // Use the key property directly from the input
    key: anonymousInput.key,
    // Determine the type using getProcessingHandlerByTagOrType
    type: getProcessingHandlerByTagOrType(anonymousInput)
  };
}

module.exports = createAnonymousDescriptor;