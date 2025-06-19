/**
 * Generates a DJB2 hash string from the provided object using the fz9._DJB2Object method.
 *
 * @param {object} sourceObject - The object to hash. If null or undefined, returns null.
 * @returns {string|null} The DJB2 hash string of the object, or null if no object is provided.
 */
function getDJB2HashFromObject(sourceObject) {
  // If the input object is provided, generate its DJB2 hash; otherwise, return null
  return sourceObject ? fz9._DJB2Object(sourceObject) : null;
}

module.exports = getDJB2HashFromObject;