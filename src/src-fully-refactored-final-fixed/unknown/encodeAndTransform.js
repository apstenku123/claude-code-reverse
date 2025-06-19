/**
 * Encodes the provided source data using nW6.encode, then transforms the encoded result with decodePercentEncodedByteArray.
 *
 * @param {any} sourceData - The data to be encoded and transformed.
 * @returns {any} The result after encoding and transforming the input data.
 */
function encodeAndTransform(sourceData) {
  // Encode the input data using the external nW6.encode function
  const encodedData = nW6.encode(sourceData);
  // Transform the encoded data using the external decodePercentEncodedByteArray function
  return decodePercentEncodedByteArray(encodedData);
}

module.exports = encodeAndTransform;