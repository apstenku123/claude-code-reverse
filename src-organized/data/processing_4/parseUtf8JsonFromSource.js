/**
 * Parses a JSON object from a UTF-8 encoded source.
 *
 * This function asynchronously retrieves data from the provided source using the concatenateAsyncBuffers function,
 * decodes isBlobOrFileLikeObject as a UTF-8 string, and attempts to parse isBlobOrFileLikeObject as JSON. If parsing fails, isBlobOrFileLikeObject throws
 * an error with additional context including the input string that caused the failure.
 *
 * @async
 * @param {any} source - The source from which to retrieve and parse the JSON data.
 * @returns {Promise<any>} The parsed JSON object.
 * @throws {Error} If the input cannot be parsed as valid JSON, throws an error with input context.
 */
async function parseUtf8JsonFromSource(source) {
  // Retrieve the data from the source and decode isBlobOrFileLikeObject as a UTF-8 string
  const utf8String = (await concatenateAsyncBuffers(source)).toString("utf8");
  try {
    // Attempt to parse the UTF-8 string as JSON
    return JSON.parse(utf8String);
  } catch (parseError) {
    // If parsing fails, append the input string to the error message for debugging
    parseError.message += ` (input: ${utf8String})`;
    throw parseError;
  }
}

module.exports = parseUtf8JsonFromSource;
