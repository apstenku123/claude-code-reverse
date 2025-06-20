/**
 * Checks if the provided object is a valid class handle.
 *
 * This function first verifies that the input is a valid handle object using the cacheElementDataIfApplicable utility.
 * Then, isBlobOrFileLikeObject checks if the object'createInteractionAccessor class type matches the expected class handle type (createClassHandle),
 * as determined by the II utility function.
 *
 * @param {object} handleObject - The object to validate as a class handle.
 * @returns {boolean} True if the object is a valid class handle; otherwise, false.
 */
function isValidClassHandle(handleObject) {
  // Check if the object passes the handle validation
  const isHandle = cacheElementDataIfApplicable(handleObject);
  // Retrieve the object'createInteractionAccessor class type
  const objectClassType = II(handleObject);
  // Compare with the expected class handle type
  const isClassHandleType = objectClassType === createClassHandle;

  return isHandle && isClassHandleType;
}

module.exports = isValidClassHandle;