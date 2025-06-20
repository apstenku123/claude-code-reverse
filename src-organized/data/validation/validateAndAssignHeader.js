/**
 * Validates and assigns an HTTP header to the request object, handling special cases for certain headers.
 *
 * @param {Object} request - The request object to which the header will be assigned. Must have 'host', 'contentLength', 'contentType', and 'headers' properties.
 * @param {string} headerKey - The name of the header to validate and assign.
 * @param {any} headerValue - The value of the header to validate and assign. Can be string, array, null, or other types.
 * @throws {V3|lY6} Throws if the header is invalid or unsupported.
 * @returns {void}
 */
function validateAndAssignHeader(request, headerKey, headerValue) {
  // Reject objects (except arrays) as header values
  if (headerValue && typeof headerValue === "object" && !Array.isArray(headerValue)) {
    throw new V3(`invalid ${headerKey} header`);
  } else if (headerValue === undefined) {
    // If headerValue is undefined, do nothing
    return;
  }

  // Normalize header key using gb0 mapping if available
  let normalizedHeaderKey = gb0[headerKey];
  if (normalizedHeaderKey === undefined) {
    // Lowercase the header key if not found in gb0
    normalizedHeaderKey = headerKey.toLowerCase();
    // If still not found and not a valid custom header, throw
    if (gb0[normalizedHeaderKey] === undefined && !hb0(normalizedHeaderKey)) {
      throw new V3("invalid header key");
    }
  }

  // Handle array header values
  if (Array.isArray(headerValue)) {
    const validatedValues = [];
    for (let i = 0; i < headerValue.length; i++) {
      const value = headerValue[i];
      if (typeof value === "string") {
        if (!bb0(value)) {
          throw new V3(`invalid ${headerKey} header`);
        }
        validatedValues.push(value);
      } else if (value === null) {
        validatedValues.push("");
      } else if (typeof value === "object") {
        throw new V3(`invalid ${headerKey} header`);
      } else {
        validatedValues.push(`${value}`);
      }
    }
    headerValue = validatedValues;
  } else if (typeof headerValue === "string") {
    // Validate string header values
    if (!bb0(headerValue)) {
      throw new V3(`invalid ${headerKey} header`);
    }
  } else if (headerValue === null) {
    headerValue = "";
  } else {
    // Coerce other types to string
    headerValue = `${headerValue}`;
  }

  // Special handling for certain headers
  if (request.host === null && normalizedHeaderKey === "host") {
    if (typeof headerValue !== "string") {
      throw new V3("invalid host header");
    }
    request.host = headerValue;
  } else if (request.contentLength === null && normalizedHeaderKey === "content-length") {
    request.contentLength = parseInt(headerValue, 10);
    if (!Number.isFinite(request.contentLength)) {
      throw new V3("invalid content-length header");
    }
  } else if (request.contentType === null && normalizedHeaderKey === "content-type") {
    request.contentType = headerValue;
    request.headers.push(headerKey, headerValue);
  } else if (
    normalizedHeaderKey === "transfer-encoding" ||
    normalizedHeaderKey === "keep-alive" ||
    normalizedHeaderKey === "upgrade"
  ) {
    // These headers are not allowed
    throw new V3(`invalid ${normalizedHeaderKey} header`);
  } else if (normalizedHeaderKey === "connection") {
    // Only allow 'close' or 'keep-alive' for connection header
    const connectionValue = typeof headerValue === "string" ? headerValue.toLowerCase() : null;
    if (connectionValue !== "close" && connectionValue !== "keep-alive") {
      throw new V3("invalid connection header");
    }
    if (connectionValue === "close") {
      request.reset = true;
    }
  } else if (normalizedHeaderKey === "expect") {
    // 'expect' header is not supported
    throw new lY6("expect header not supported");
  } else {
    // Default: push header to headers array
    request.headers.push(headerKey, headerValue);
  }
}

module.exports = validateAndAssignHeader;