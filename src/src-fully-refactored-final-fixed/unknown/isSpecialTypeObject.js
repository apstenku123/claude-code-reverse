/**
 * Determines if the provided object is valid and matches one of the special type constants.
 *
 * @param {any} objectToCheck - The object to validate and check its type.
 * @returns {boolean} True if the object is valid and its type matches one of the special types; otherwise, false.
 */
function isSpecialTypeObject(objectToCheck) {
  // Validate the object using the external VB function
  if (!VB(objectToCheck)) return false;

  // Retrieve the object'createInteractionAccessor type using the external getProcessedValue function
  const objectType = getProcessedValue(objectToCheck);

  // Check if the object'createInteractionAccessor type matches any of the special type constants
  return (
    objectType === A1 ||
    objectType === D1 ||
    objectType === O1 ||
    objectType === h1
  );
}

module.exports = isSpecialTypeObject;