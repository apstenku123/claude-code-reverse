/**
 * Creates a deep copy of a given TypedArray instance.
 *
 * @param {TypedArray} sourceArray - The TypedArray instance to clone (e.g., Uint8Array, Float32Array, etc.).
 * @returns {TypedArray} a new TypedArray instance of the same type and length, containing the same data as the source.
 */
function cloneTypedArray(sourceArray) {
  // Create a new TypedArray of the same type and length as the source
  const clonedArray = new sourceArray.constructor(sourceArray.byteLength);
  // Copy the contents from the source array to the new array
  new Sy(clonedArray).set(new Sy(sourceArray));
  return clonedArray;
}

module.exports = cloneTypedArray;