/**
 * Checks if the provided object represents an image type.
 *
 * @param {Object} entry - The object to check for image type.
 * @returns {boolean} Returns true if the object'createInteractionAccessor 'type' property is 'image', otherwise false.
 */
function isImageType(entry) {
  // Check if the 'type' property of the entry is exactly 'image'
  return entry.type === "image";
}

module.exports = isImageType;