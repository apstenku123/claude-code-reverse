/**
 * Validates and assigns an HTTP header to the request object, handling special cases for certain headers.
 * Throws errors for invalid header names or values.
 *
 * @param {Object} request - The request object to which the header will be assigned. Must have 'host', 'contentLength', 'contentType', and 'headers' properties.
 * @param {string} headerName - The name of the HTTP header to validate and assign.
 * @param {any} headerValue - The value of the HTTP header to validate and assign.
 * @throws {V3|lY6} Throws if the header name or value is invalid, or if unsupported headers are encountered.
 */
function validateAndAssignHttpHeader(request, headerName, headerValue) {
  // Disallow objects (except arrays) as header values
  if (headerValue && typeof headerValue === "object" && !Array.isArray(headerValue)) {
    throw new V3(`invalid ${headerName} header`);
  } else if (headerValue === undefined) {
    // If header value is undefined, do nothing
    return;
  }

  // Lookup canonical header key
  let canonicalHeaderKey = gb0[headerName];
  if (canonicalHeaderKey === undefined) {
    // Try lowercased version if not found
    canonicalHeaderKey = headerName.toLowerCase();
    if (gb0[canonicalHeaderKey] === undefined && !hb0(canonicalHeaderKey)) {
      throw new V3("invalid header key");
    }
  }

  // Normalize header value
  if (Array.isArray(headerValue)) {
    const normalizedValues = [];
    for (let i = 0; i < headerValue.length; i++) {
      const value = headerValue[i];
      if (typeof value === "string") {
        if (!bb0(value)) {
          throw new V3(`invalid ${headerName} header`);
        }
        normalizedValues.push(value);
      } else if (value === null) {
        normalizedValues.push("");
      } else if (typeof value === "object") {
        throw new V3(`invalid ${headerName} header`);
      } else {
        normalizedValues.push(`${value}`);
      }
    }
    headerValue = normalizedValues;
  } else if (typeof headerValue === "string") {
    if (!bb0(headerValue)) {
      throw new V3(`invalid ${headerName} header`);
    }
  } else if (headerValue === null) {
    headerValue = "";
  } else {
    headerValue = `${headerValue}`;
  }

  // Special handling for certain headers
  if (request.host === null && canonicalHeaderKey === "host") {
    if (typeof headerValue !== "string") {
      throw new V3("invalid host header");
    }
    request.host = headerValue;
  } else if (request.contentLength === null && canonicalHeaderKey === "content-length") {
    request.contentLength = parseInt(headerValue, 10);
    if (!Number.isFinite(request.contentLength)) {
      throw new V3("invalid content-length header");
    }
  } else if (request.contentType === null && canonicalHeaderKey === "content-type") {
    request.contentType = headerValue;
    request.headers.push(headerName, headerValue);
  } else if (
    canonicalHeaderKey === "transfer-encoding" ||
    canonicalHeaderKey === "keep-alive" ||
    canonicalHeaderKey === "upgrade"
  ) {
    throw new V3(`invalid ${canonicalHeaderKey} header`);
  } else if (canonicalHeaderKey === "connection") {
    // Only allow 'close' or 'keep-alive' for connection header
    const connectionValue = typeof headerValue === "string" ? headerValue.toLowerCase() : null;
    if (connectionValue !== "close" && connectionValue !== "keep-alive") {
      throw new V3("invalid connection header");
    }
    if (connectionValue === "close") {
      request.reset = true;
    }
  } else if (canonicalHeaderKey === "expect") {
    throw new lY6("expect header not supported");
  } else {
    // Default: push header to headers array
    request.headers.push(headerName, headerValue);
  }
}

module.exports = validateAndAssignHttpHeader;