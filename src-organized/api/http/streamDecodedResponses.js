/**
 * Asynchronously iterates over a streamed HTTP response body, decoding and yielding parsed messages.
 * Handles React Native fetch limitations and ensures proper decoding of streamed data.
 *
 * @param {Response} response - The HTTP response object containing the body stream to process.
 * @param {AbortController} abortController - Controller to abort the operation if needed.
 * @yields {any} - Yields each successfully decoded message from the response stream.
 * @throws {M9} - Throws if the response has no body or if running in React Native without streaming support.
 */
async function* streamDecodedResponses(response, abortController) {
  // Check if the response has a body to stream
  if (!response.body) {
    // Abort the operation if no body is present
    abortController.abort();
    // Special handling for React Native environments
    if (
      typeof globalThis.navigator !== "undefined" &&
      globalThis.navigator.product === "ReactNative"
    ) {
      throw new M9(
        "The default react-native fetch implementation does not support streaming. Please use expo/fetch: https://docs.expo.dev/versions/latest/sdk/expo/#expofetch-api"
      );
    }
    throw new M9("Attempted to iterate over a response with no body");
  }

  // Initialize the message and text decoders
  const messageDecoder = new $a0();
  const textDecoder = new TR();
  // Prepare the response body for streaming
  const responseStream = toAsyncIterableFromReadableStream(response.body);

  // Iterate over each chunk in the response stream
  for await (const chunk of bufferAndYieldOnLineBreakSequence(responseStream)) {
    // Decode the chunk into text segments
    for (const textSegment of textDecoder.decode(chunk)) {
      // Attempt to decode a message from the text segment
      const decodedMessage = messageDecoder.decode(textSegment);
      if (decodedMessage) {
        yield decodedMessage;
      }
    }
  }

  // Flush any remaining buffered data in the text decoder
  for (const remainingSegment of textDecoder.flush()) {
    const decodedMessage = messageDecoder.decode(remainingSegment);
    if (decodedMessage) {
      yield decodedMessage;
    }
  }
}

module.exports = streamDecodedResponses;