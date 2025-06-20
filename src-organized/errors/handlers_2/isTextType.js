/**
 * Checks if the provided object has a type property equal to 'text'.
 *
 * @param {Object} entry - The object to check for type property.
 * @returns {boolean} True if the object'createInteractionAccessor type is 'text', otherwise false.
 */
function isTextType(entry) {
  // Return true if the entry'createInteractionAccessor type property is exactly 'text'
  return entry.type === "text";
}

module.exports = isTextType;