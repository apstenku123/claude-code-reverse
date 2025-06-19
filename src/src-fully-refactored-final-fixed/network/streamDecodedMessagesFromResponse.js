/**
 * Asynchronously iterates over a streaming HTTP response, decoding and yielding messages as they arrive.
 * Handles environments that do not support streaming and ensures proper decoding of message boundaries.
 *
 * @async
 * @generator
 * @param {Response} response - The HTTP response object containing the body to stream and decode.
 * @param {AbortController} abortController - Controller to abort the operation if streaming is unsupported or fails.
 * @yields {any} Decoded message objects from the response stream.
 * @throws {M9} Throws if the response has no body or if streaming is not supported in the current environment.
 */
async function* streamDecodedMessagesFromResponse(response, abortController) {
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
  // Wrap the response body for streaming
  const responseStream = toAsyncIterableFromReadableStream(response.body);

  // Asynchronously iterate over the response stream
  for await (const chunk of bufferAndYieldOnLineBreakSequence(responseStream)) {
    // Decode the chunk into text
    for (const text of textDecoder.decode(chunk)) {
      // Further decode the text into messages
      const decodedMessage = messageDecoder.decode(text);
      if (decodedMessage) {
        yield decodedMessage;
      }
    }
  }

  // Flush any remaining buffered data from the text decoder
  for (const remainingText of textDecoder.flush()) {
    const decodedMessage = messageDecoder.decode(remainingText);
    if (decodedMessage) {
      yield decodedMessage;
    }
  }
}

module.exports = streamDecodedMessagesFromResponse;