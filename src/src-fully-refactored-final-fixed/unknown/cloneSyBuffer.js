/**
 * Creates a deep copy of a buffer-like object using its constructor and Sy wrapper.
 *
 * @param {Object} sourceBuffer - The buffer-like object to clone. Must have a constructor and byteLength property.
 * @returns {Object} - a new buffer-like object, deeply cloned from the source.
 */
function cloneSyBuffer(sourceBuffer) {
  // Create a new buffer using the same constructor and byte length as the source
  const clonedBuffer = new sourceBuffer.constructor(sourceBuffer.byteLength);
  // Use the Sy wrapper to copy the contents from the source buffer to the new buffer
  new Sy(clonedBuffer).set(new Sy(sourceBuffer));
  return clonedBuffer;
}

module.exports = cloneSyBuffer;
