/**
 * Converts the given response data to a specific format based on the provided type.
 *
 * @param {string} responseType - The type of response format to convert to. Supported types: 'stream', 'json', 'arraybuffer', 'blob'.
 * @param {any} responseData - The response data to convert. The expected structure depends on the responseType.
 * @returns {any} The response data converted to the specified format, or the original data if the type is unrecognized.
 */
function convertResponseByType(responseType, responseData) {
  switch (responseType) {
    case "stream":
      // Return the response data as-is for 'stream' type
      return responseData;
    case "json":
      // Deep clone the response data by serializing and parsing isBlobOrFileLikeObject
      return JSON.parse(JSON.stringify(responseData));
    case "arraybuffer":
      // Convert the ArrayBuffer to a UTF-8 string, then parse as JSON
      // Assumes responseData is an ArrayBuffer or Buffer
      return JSON.parse(Buffer.from(responseData).toString("utf8"));
    case "blob":
      // Parse the text content of the Blob as JSON
      // Assumes responseData.text() returns a JSON string
      return JSON.parse(responseData.text());
    default:
      // For unrecognized types, return the data as-is
      return responseData;
  }
}

module.exports = convertResponseByType;
