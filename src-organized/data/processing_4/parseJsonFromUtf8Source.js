/**
 * Parses a JSON object from a UTF-8 encoded source using the concatenateAsyncBuffers function.
 *
 * @async
 * @function parseJsonFromUtf8Source
 * @param {any} source - The input to be passed to concatenateAsyncBuffers, which should return a Buffer or similar object.
 * @returns {Promise<any>} The parsed JSON object from the UTF-8 string.
 * @throws {Error} If JSON parsing fails, throws an error with the input included in the message.
 */
async function parseJsonFromUtf8Source(source) {
  // Await the result from concatenateAsyncBuffers and convert isBlobOrFileLikeObject to a UTF-8 string
  const utf8String = (await concatenateAsyncBuffers(source)).toString("utf8");
  try {
    // Attempt to parse the UTF-8 string as JSON
    return JSON.parse(utf8String);
  } catch (parseError) {
    // If parsing fails, append the input to the error message for easier debugging
    parseError.message += ` (input: ${utf8String})`;
    throw parseError;
  }
}

module.exports = parseJsonFromUtf8Source;