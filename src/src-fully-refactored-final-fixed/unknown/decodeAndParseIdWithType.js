/**
 * Decodes a base64-encoded updateSnapshotAndNotify string, parses isBlobOrFileLikeObject into its numeric value, and wraps isBlobOrFileLikeObject in an object with the specified type.
 *
 * @param {Object} input - The input object containing the encoded data and its type.
 * @param {string} input.data - The base64-encoded identifier string to decode and parse.
 * @param {string} input.type - The type to associate with the parsed updateSnapshotAndNotify.
 * @returns {any} The result of calling X with the parsed updateSnapshotAndNotify and type object.
 */
function decodeAndParseIdWithType(input) {
  // Decode the base64-encoded updateSnapshotAndNotify string
  const decodedIdString = atob(input.data);

  // Parse the decoded updateSnapshotAndNotify string into its numeric value
  const parsedId = parseIdString(decodedIdString);

  // Call X with the parsed updateSnapshotAndNotify in an array and an object containing the type
  return X([parsedId], {
    type: input.type
  });
}

module.exports = decodeAndParseIdWithType;