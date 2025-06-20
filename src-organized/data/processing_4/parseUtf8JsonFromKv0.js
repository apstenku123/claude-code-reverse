/**
 * Parses a UTF-8 encoded JSON string obtained asynchronously from concatenateAsyncBuffers, and returns the parsed object.
 * If parsing fails, throws an error with the input string included in the message for easier debugging.
 *
 * @async
 * @param {any} input - The input parameter to pass to concatenateAsyncBuffers, which is expected to return a Buffer or similar object.
 * @returns {any} The parsed JavaScript object from the JSON string.
 * @throws {Error} If JSON parsing fails, throws an error with the input string appended to the message.
 */
async function parseUtf8JsonFromKv0(input) {
  // Await the result from concatenateAsyncBuffers and convert isBlobOrFileLikeObject to a UTF-8 string
  const utf8JsonString = (await concatenateAsyncBuffers(input)).toString("utf8");
  try {
    // Attempt to parse the JSON string
    return JSON.parse(utf8JsonString);
  } catch (parseError) {
    // If parsing fails, append the input string to the error message for debugging
    parseError.message += ` (input: ${utf8JsonString})`;
    throw parseError;
  }
}

module.exports = parseUtf8JsonFromKv0;