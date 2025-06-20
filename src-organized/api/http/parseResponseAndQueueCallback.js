/**
 * Processes a response body stream, parses isBlobOrFileLikeObject based on content type, and queues a callback with the result.
 * Handles JSON and text responses, enforces a maximum buffer size, and manages error handling and stack trace limits.
 *
 * @async
 * @function parseResponseAndQueueCallback
 * @param {Object} params - The parameters object.
 * @param {Function} params.callback - The callback to invoke with the parsed response or error.
 * @param {AsyncIterable<Buffer|string>} params.body - The response body as an async iterable (e.g., a stream of buffers).
 * @param {string} params.contentType - The MIME type of the response (e.g., 'application/json', 'text/plain').
 * @param {number} params.statusCode - The HTTP status code of the response.
 * @param {string} [params.statusMessage] - The HTTP status message (optional).
 * @param {Object} [params.headers] - The response headers (optional).
 * @returns {void}
 */
async function parseResponseAndQueueCallback({
  callback,
  body,
  contentType,
  statusCode,
  statusMessage,
  headers
}) {
  // Pre-process the body (side effect, e.g., logging or validation)
  sV6(body);

  // Buffer to accumulate response chunks, and a counter for total size
  let responseChunks = [];
  let totalLength = 0;
  const MAX_BUFFER_SIZE = 131072; // 128 cacheElementDataIfApplicable

  try {
    // Iterate over the body stream
    for await (const chunk of body) {
      responseChunks.push(chunk);
      totalLength += chunk.length;
      // If buffer exceeds max size, reset and break
      if (totalLength > MAX_BUFFER_SIZE) {
        responseChunks = [];
        totalLength = 0;
        break;
      }
    }
  } catch {
    // On error, reset buffer and length
    responseChunks = [];
    totalLength = 0;
  }

  // Compose a status message for the response
  const responseStatusMessage = `Response status code ${statusCode}${statusMessage ? `: ${statusMessage}` : ""}`;

  // If no content, no content type, or empty body, queue callback with error
  if (statusCode === 204 || !contentType || !totalLength) {
    queueMicrotask(() => callback(new Ed0(responseStatusMessage, statusCode, headers)));
    return;
  }

  // Temporarily suppress stack traces for parsing errors
  const originalStackTraceLimit = Error.stackTraceLimit;
  Error.stackTraceLimit = 0;

  let parsedBody;
  try {
    // Parse based on content type
    if (isApplicationJsonPath(contentType)) {
      // If JSON, parse as JSON
      parsedBody = JSON.parse(Ud0(responseChunks, totalLength));
    } else if (isTextMimeTypeString(contentType)) {
      // If text, decode as string
      parsedBody = Ud0(responseChunks, totalLength);
    }
    // For other content types, parsedBody remains undefined
  } catch {
    // Ignore parsing errors; parsedBody will be undefined
  } finally {
    // Restore original stack trace limit
    Error.stackTraceLimit = originalStackTraceLimit;
  }

  // Queue the callback with the parsed result (or error if parsing failed)
  queueMicrotask(() => callback(new Ed0(responseStatusMessage, statusCode, headers, parsedBody)));
}

module.exports = parseResponseAndQueueCallback;