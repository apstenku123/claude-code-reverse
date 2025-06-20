/**
 * Normalizes an array of HTTP header key-value pairs.
 * Ensures all header names and values are strings, and handles special cases for 'content-length' and 'content-disposition' headers.
 *
 * - If a 'content-length' header is present, sets a flag.
 * - If a 'content-disposition' header is present, records its value'createInteractionAccessor index.
 * - If both are present, converts the 'content-disposition' value to latin1 encoding.
 *
 * @param {Array} headerPairs - An array of alternating header names and values (e.g., [name1, value1, name2, value2, ...]).
 * @returns {Array} a new array with normalized header names and values.
 */
function normalizeHeaderPairs(headerPairs) {
  const headerCount = headerPairs.length;
  const normalizedHeaders = new Array(headerCount);
  let hasContentLength = false;
  let contentDispositionValueIndex = -1;

  // Iterate over header pairs (step by 2: name, value)
  for (let i = 0; i < headerCount; i += 2) {
    let headerName = headerPairs[i];
    let headerValue = headerPairs[i + 1];

    // Ensure header name is a string
    if (typeof headerName !== "string") {
      headerName = headerName.toString();
    }

    // Ensure header value is a string (prefer utf8 if possible)
    if (typeof headerValue !== "string") {
      headerValue = headerValue.toString("utf8");
    }

    // Check for 'content-length' header (case-insensitive, 14 chars, dash at index 7)
    if (
      headerName.length === 14 &&
      headerName[7] === "-" &&
      (headerName === "content-length" || headerName.toLowerCase() === "content-length")
    ) {
      hasContentLength = true;
    }
    // Check for 'content-disposition' header (case-insensitive, 19 chars, dash at index 7)
    else if (
      headerName.length === 19 &&
      headerName[7] === "-" &&
      (headerName === "content-disposition" || headerName.toLowerCase() === "content-disposition")
    ) {
      contentDispositionValueIndex = i + 1;
    }

    normalizedHeaders[i] = headerName;
    normalizedHeaders[i + 1] = headerValue;
  }

  // If both 'content-length' and 'content-disposition' are present, convert the value to latin1
  if (hasContentLength && contentDispositionValueIndex !== -1) {
    normalizedHeaders[contentDispositionValueIndex] = Buffer.from(
      normalizedHeaders[contentDispositionValueIndex]
    ).toString("latin1");
  }

  return normalizedHeaders;
}

module.exports = normalizeHeaderPairs;