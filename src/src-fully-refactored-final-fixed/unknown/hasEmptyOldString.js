/**
 * Checks if any object in the array has an 'old_string' property equal to an empty string.
 *
 * @param {Array<Object>} objectsArray - Array of objects to check for empty 'old_string' property.
 * @returns {boolean} Returns true if at least one object has an empty 'old_string', otherwise false.
 */
function hasEmptyOldString(objectsArray) {
  // Use Array.prototype.some to check if any object has 'old_string' === ""
  return objectsArray.some((object) => object.old_string === "");
}

module.exports = hasEmptyOldString;