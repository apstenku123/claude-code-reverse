/**
 * Converts the provided input to a Buffer or a Ll0 instance depending on the specified data type.
 *
 * @param {any} input - The input data to be converted. Can be a string, ArrayBuffer, Blob, or TypedArray.
 * @param {string} dataType - The type of the input data. Should be one of nh.string, nh.arrayBuffer, nh.blob, nh.typedArray.
 * @returns {Buffer|Ll0|undefined} - Returns a Buffer or Ll0 instance based on the data type, or undefined if the type is not handled.
 */
function convertInputToBufferLike(input, dataType) {
  switch (dataType) {
    case nh.string:
      // Convert string input to Buffer
      return Buffer.from(input);
    case nh.arrayBuffer:
    case nh.blob:
      // Wrap ArrayBuffer or Blob in Ll0 instance
      return new Ll0(input);
    case nh.typedArray:
      // For TypedArray, pass buffer, byteOffset, and byteLength to Ll0
      return new Ll0(input.buffer, input.byteOffset, input.byteLength);
    default:
      // If dataType is not recognized, return undefined
      return undefined;
  }
}

module.exports = convertInputToBufferLike;