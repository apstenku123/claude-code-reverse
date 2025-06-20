/**
 * Checks if both provided arguments are plain JavaScript objects.
 *
 * @param {object} firstObject - The first value to check.
 * @param {object} secondObject - The second value to check.
 * @returns {boolean} Returns true if both arguments are plain objects, otherwise false.
 */
function areBothPlainObjects(firstObject, secondObject) {
  // Use mE0.a to check if both arguments are plain objects
  if (!mE0.a(firstObject) || !mE0.a(secondObject)) {
    return false;
  }
  return true;
}

module.exports = areBothPlainObjects;