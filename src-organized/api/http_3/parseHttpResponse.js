/**
 * Parses an HTTP response based on provided configuration and logs the process.
 * Handles streaming, JSON, binary, and text responses, and logs debug information.
 *
 * @param {object} loggerSource - The source object used to retrieve logger methods.
 * @param {object} config - Configuration object containing response, logging, and options.
 * @param {Response} config.response - The HTTP response object to parse.
 * @param {string|number} config.requestLogID - Unique identifier for the request log.
 * @param {string|number|null} config.retryOfRequestLogID - Identifier for the retried request log, if applicable.
 * @param {number} config.startTime - Timestamp when the request started (in ms).
 * @param {object} config.options - Additional options for parsing and streaming.
 * @param {boolean} [config.options.stream] - Whether the response should be handled as a stream.
 * @param {object} [config.options.__streamClass] - Optional custom stream class for SSE responses.
 * @param {object} [config.options.__binaryResponse] - If true, return the raw response object.
 * @param {object} [config.controller] - Optional controller for stream handling.
 * @returns {Promise<null|object|string|Response>} The parsed response body, or null for 204 No Content, or the raw response if binary is requested.
 */
async function parseHttpResponse(loggerSource, config) {
  const {
    response,
    requestLogID,
    retryOfRequestLogID,
    startTime,
    options,
    controller
  } = config;

  // Helper function to parse the response body based on content type and options
  const parseBody = async () => {
    // Handle streaming responses
    if (options.stream) {
      // Log response details for debugging
      getOrCreateLoggerMethods(loggerSource).debug(
        "response",
        response.status,
        response.url,
        response.headers,
        response.body
      );
      // Use custom stream class if provided
      if (options.__streamClass) {
        return options.__streamClass.fromSSEResponse(response, controller);
      }
      // Fallback to default stream class
      return _D.fromSSEResponse(response, controller);
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return null;
    }

    // Return raw response if binary response is requested
    if (options.__binaryResponse) {
      return response;
    }

    // Determine the content type (e.g., application/json)
    const contentTypeHeader = response.headers.get("content-type");
    const contentType = contentTypeHeader?.split(";")[0]?.trim();

    // Handle JSON responses (including custom +json types)
    if (contentType?.includes("application/json") || contentType?.endsWith("+json")) {
      const jsonData = await response.json();
      return attachRequestIdProperty(jsonData, response);
    }

    // Fallback: return response as plain text
    return await response.text();
  };

  // Parse the response body
  const parsedBody = await parseBody();

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

module.exports = parseHttpResponse;