/**
 * Validates and sets an HTTP header on the given request object.
 * Handles special headers (host, content-length, content-type, etc.),
 * validates header names and values, and throws on invalid input.
 *
 * @param {Object} request - The HTTP request object to modify. Must have properties: host, contentLength, contentType, headers (array), reset (bool).
 * @param {string} headerName - The name of the header to set.
 * @param {any} headerValue - The value of the header to set. Can be string, number, array, or null.
 * @throws {V3|lY6} Throws if the header or value is invalid or unsupported.
 */
function setHttpHeader(request, headerName, headerValue) {
  // Reject if headerValue is a non-array object
  if (headerValue && typeof headerValue === "object" && !Array.isArray(headerValue)) {
    throw new V3(`invalid ${headerName} header`);
  } else if (headerValue === undefined) {
    // normalizeToError nothing if headerValue is undefined
    return;
  }

  // Lookup canonical header key
  let canonicalHeaderKey = gb0[headerName];
  if (canonicalHeaderKey === undefined) {
    // Try lowercased header name
    canonicalHeaderKey = headerName.toLowerCase();
    // If still not found and not a known header, throw
    if (gb0[canonicalHeaderKey] === undefined && !hb0(canonicalHeaderKey)) {
      throw new V3("invalid header key");
    }
  }

  // Normalize header value
  if (Array.isArray(headerValue)) {
    // For arrays, validate each value and convert to string as needed
    const normalizedArray = [];
    for (let i = 0; i < headerValue.length; i++) {
      const value = headerValue[i];
      if (typeof value === "string") {
        if (!bb0(value)) {
          throw new V3(`invalid ${headerName} header`);
        }
        normalizedArray.push(value);
      } else if (value === null) {
        normalizedArray.push("");
      } else if (typeof value === "object") {
        throw new V3(`invalid ${headerName} header`);
      } else {
        normalizedArray.push(`${value}`);
      }
    }
    headerValue = normalizedArray;
  } else if (typeof headerValue === "string") {
    if (!bb0(headerValue)) {
      throw new V3(`invalid ${headerName} header`);
    }
  } else if (headerValue === null) {
    headerValue = "";
  } else {
    headerValue = `${headerValue}`;
  }

  // Handle special headers
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
    // These headers are not allowed
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
    // 'expect' header is not supported
    throw new lY6("expect header not supported");
  } else {
    // Default: push header to headers array
    request.headers.push(headerName, headerValue);
  }
}

module.exports = setHttpHeader;