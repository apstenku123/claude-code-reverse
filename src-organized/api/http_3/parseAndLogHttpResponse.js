/**
 * Parses an HTTP response according to configuration options and logs the result.
 * Handles streaming, binary, JSON, and text responses, and logs detailed debug information.
 *
 * @param {object} loggerSource - The source or context for logging (used to get logger methods).
 * @param {object} config - Configuration object containing the HTTP response and options.
 * @param {object} config.response - The HTTP response object (Fetch API Response).
 * @param {string|number} config.requestLogID - Unique identifier for the request log.
 * @param {string|number} [config.retryOfRequestLogID] - Optional updateSnapshotAndNotify if this is a retry of a previous request.
 * @param {number} config.startTime - Timestamp (ms) when the request started.
 * @param {object} config.options - Additional options for parsing and streaming.
 * @param {object} [config.controller] - Optional controller for streaming responses.
 * @returns {Promise<null|object|string|Response>} Parsed response body, or the Response object for binary responses, or null for 204 status.
 */
async function parseAndLogHttpResponse(loggerSource, config) {
  const {
    response,
    requestLogID,
    retryOfRequestLogID,
    startTime,
    options,
    controller
  } = config;

  // Get logger methods for the provided logger source
  const logger = getOrCreateLoggerMethods(loggerSource);

  // Helper function to parse the response based on options and content-type
  const parseResponse = async () => {
    // Handle streaming responses
    if (options.stream) {
      logger.debug("response", response.status, response.url, response.headers, response.body);
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

    // Return raw response for binary responses
    if (options.__binaryResponse) {
      return response;
    }

    // Determine content type for further parsing
    const contentTypeHeader = response.headers.get("content-type");
    const contentType = contentTypeHeader?.split(";")[0]?.trim();

    // Parse JSON or JSON-like responses
    if (contentType?.includes("application/json") || contentType?.endsWith("+json")) {
      const jsonData = await response.json();
      return attachRequestIdProperty(jsonData, response);
    }

    // Fallback: parse as text
    return await response.text();
  };

  // Parse the response body
  const parsedBody = await parseResponse();

  // Log the parsed response with timing and metadata
  logger.debug(
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

module.exports = parseAndLogHttpResponse;