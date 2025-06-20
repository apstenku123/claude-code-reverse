/**
 * Deserializes a response based on the specified response type.
 *
 * @param {string} responseType - The type of the response ('stream', 'json', 'arraybuffer', or 'blob').
 * @param {any} responseData - The response data to be deserialized.
 * @returns {any} The deserialized response data, or the original data if the type is unrecognized.
 */
function deserializeResponseByType(responseType, responseData) {
  switch (responseType) {
    case "stream":
      // Return the stream as-is
      return responseData;
    case "json":
      // Deep clone the JSON object to avoid mutation
      return JSON.parse(JSON.stringify(responseData));
    case "arraybuffer":
      // Convert ArrayBuffer to UTF-8 string, then parse as JSON
      // Assumes responseData is an ArrayBuffer or Buffer
      return JSON.parse(Buffer.from(responseData).toString("utf8"));
    case "blob":
      // Parse the text content of the Blob as JSON
      // Assumes responseData.text() returns a JSON string synchronously
      return JSON.parse(responseData.text());
    default:
      // For unknown types, return the data as-is
      return responseData;
  }
}

module.exports = deserializeResponseByType;
