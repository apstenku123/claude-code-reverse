/**
 * Determines if the provided value is a Buffer object.
 *
 * This function checks if the input is not null, is not a circular construct (as determined by `cc`),
 * has a constructor that is not null and not circular, and that the constructor has an `isBuffer` method
 * (as determined by `eW`). If all these conditions are met, isBlobOrFileLikeObject calls the `isBuffer` method to determine
 * if the input is a Buffer.
 *
 * @param {*} value - The value to check for Buffer-ness.
 * @returns {boolean} True if the value is a Buffer object, false otherwise.
 */
function isBufferObject(value) {
  // Check that value is not null and not a circular construct
  if (value === null || cc(value)) {
    return false;
  }

  // Check that value has a constructor that is not null and not a circular construct
  const constructor = value.constructor;
  if (constructor === null || cc(constructor)) {
    return false;
  }

  // Check that the constructor has an isBuffer method
  if (!eW(constructor.isBuffer)) {
    return false;
  }

  // Use the isBuffer method to determine if value is a Buffer
  return constructor.isBuffer(value);
}

module.exports = isBufferObject;