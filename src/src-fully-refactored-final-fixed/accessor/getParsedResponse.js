/**
 * Parses and processes an HTTP response based on configuration options.
 * Handles streaming, binary, JSON, and text responses, and logs the result.
 *
 * @async
 * @function getParsedResponse
 * @param {object} loggerSource - The logger source or context for logging/debugging.
 * @param {object} config - Configuration object containing response, logging, and option details.
 * @param {object} config.response - The HTTP response object to process.
 * @param {string|number} config.requestLogID - Unique identifier for the request log.
 * @param {string|number} [config.retryOfRequestLogID] - Identifier for the retried request log, if applicable.
 * @param {number} config.startTime - Timestamp when the request started (in ms since epoch).
 * @param {object} config.options - Additional options for response handling.
 * @param {boolean} [config.options.stream] - Whether to treat the response as a stream.
 * @param {object} [config.options.__streamClass] - Optional custom stream class for SSE responses.
 * @param {boolean} [config.options.__binaryResponse] - Whether to return the raw response for binary data.
 * @param {object} [config.controller] - Optional controller for stream handling.
 * @returns {Promise<null|object|string|Response>} The parsed response body, or null for 204 responses, or the raw response for binary data.
 */
async function getParsedResponse(loggerSource, config) {
  const {
    response,
    requestLogID,
    retryOfRequestLogID,
    startTime,
    options,
    controller
  } = config;

  /**
   * Internal helper to parse the response body based on options and content type.
   * @returns {Promise<null|object|string|Response>} The parsed response body.
   */
  const parseResponseBody = async () => {
    // Handle streaming responses
    if (options.stream) {
      getOrCreateLoggerMethods(loggerSource).debug(
        "response",
        response.status,
        response.url,
        response.headers,
        response.body
      );
      // Use custom stream class if provided, otherwise fallback to default
      if (options.__streamClass) {
        return options.__streamClass.fromSSEResponse(response, controller);
      }
      return _D.fromSSEResponse(response, controller);
    }

    // Handle HTTP 204 No Content
    if (response.status === 204) {
      return null;
    }

    // Handle binary response option
    if (options.__binaryResponse) {
      return response;
    }

    // Determine content type for further parsing
    const contentTypeHeader = response.headers.get("content-type");
    const mimeType = contentTypeHeader?.split(";")[0]?.trim();

    // Handle JSON responses (including custom +json types)
    if (mimeType?.includes("application/json") || mimeType?.endsWith("+json")) {
      const jsonData = await response.json();
      return attachRequestIdProperty(jsonData, response);
    }

    // Fallback: treat as plain text
    return await response.text();
  };

  // Parse the response body
  const parsedBody = await parseResponseBody();

  // Log the parsed response with timing and metadata
  getOrCreateLoggerMethods(loggerSource).debug(
    `[${requestLogID}] response parsed`,
    sanitizeRequestObject({
      retryOfRequestLogID,
      url: response.url,
      status: response.status,
      body: parsedBody,
      durationMs: Date.now() - startTime
    })
  );

  return parsedBody;
}

module.exports = getParsedResponse;