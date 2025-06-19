/**
 * Retrieves a mapped value from the Vg4 array based on the provided scale value.
 * Throws a MappingError if the scale is out of the allowed range.
 *
 * @param {number} scale - The scale value to map. Must be between XF0 and CF0 (inclusive).
 * @returns {any} The mapped value from the Vg4 array corresponding to the scale.
 * @throws {Cg4.MappingError} If the scale is out of the allowed range.
 */
function getScaleMapping(scale) {
  // Check if the scale is within the allowed range
  if (scale > CF0 || scale < XF0) {
    throw new Cg4.MappingError(`expected scale >= ${XF0} && <= ${CF0}, got: ${scale}`);
  }
  // Return the mapped value from Vg4, offset by 10
  return Vg4[scale + 10];
}

module.exports = getScaleMapping;