/**
 * Parses multipart header fields from a byte array, extracting name, filename, content type, and encoding.
 *
 * @param {Uint8Array} inputBytes - The byte array representing the multipart message.
 * @param {Object} state - The state object containing the current parsing position (expects a 'position' property).
 * @returns {Object|string} An object with extracted header fields (name, filename, contentType, encoding) or the string 'failure' if parsing fails.
 */
function parseMultipartHeaderFields(inputBytes, state) {
  let fieldName = null;
  let fileName = null;
  let contentType = null;
  let contentEncoding = null;

  while (true) {
    // Check for CRLF (end of header section)
    if (inputBytes[state.position] === 13 && inputBytes[state.position + 1] === 10) {
      if (fieldName === null) return "failure";
      return {
        name: fieldName,
        filename: fileName,
        contentType: contentType,
        encoding: contentEncoding
      };
    }

    // Extract header key up to ':'
    let rawHeaderKey = extractMatchingSubarray(
      byte => byte !== 10 && byte !== 13 && byte !== 58, // Not LF, CR, or colon
      inputBytes,
      state
    );

    // Trim and validate header key
    rawHeaderKey = trimHeaderValue(
      rawHeaderKey,
      true, // trimLeft
      true, // trimRight
      byte => byte === 9 || byte === 32 // tab or space
    );
    if (!headerKeyRegex.test(rawHeaderKey.toString())) return "failure";
    if (inputBytes[state.position] !== 58) return "failure"; // Expect ':'

    // Move past ':' and any whitespace
    state.position++;
    extractMatchingSubarray(byte => byte === 32 || byte === 9, inputBytes, state); // skip spaces/tabs

    // Normalize header key
    switch (normalizeHeaderKey(rawHeaderKey)) {
      case "content-disposition": {
        // Reset fieldName and fileName
        fieldName = fileName = null;
        if (!matchBytes(inputBytes, contentDispositionPrefix, state)) return "failure";
        state.position += 17; // Skip 'form-data; name="'
        fieldName = extractHeaderValue(inputBytes, state);
        if (fieldName === null) return "failure";
        // Check for filename parameter
        if (matchBytes(inputBytes, filenamePrefix, state)) {
          let filenameStart = state.position + filenamePrefix.length;
          if (inputBytes[filenameStart] === 42) {
            state.position += 1;
            filenameStart += 1;
          }
          if (inputBytes[filenameStart] !== 61 || inputBytes[filenameStart + 1] !== 34) return "failure";
          state.position += 12; // Skip to filename value
          fileName = extractHeaderValue(inputBytes, state);
          if (fileName === null) return "failure";
        }
        break;
      }
      case "content-type": {
        let rawValue = extractMatchingSubarray(
          byte => byte !== 10 && byte !== 13,
          inputBytes,
          state
        );
        rawValue = trimHeaderValue(rawValue, false, true, byte => byte === 9 || byte === 32);
        contentType = parseHeaderValue(rawValue);
        break;
      }
      case "content-transfer-encoding": {
        let rawValue = extractMatchingSubarray(
          byte => byte !== 10 && byte !== 13,
          inputBytes,
          state
        );
        rawValue = trimHeaderValue(rawValue, false, true, byte => byte === 9 || byte === 32);
        contentEncoding = parseHeaderValue(rawValue);
        break;
      }
      default:
        // Skip unknown header value
        extractMatchingSubarray(byte => byte !== 10 && byte !== 13, inputBytes, state);
    }

    // After header line, expect CRLF
    if (inputBytes[state.position] !== 13 && inputBytes[state.position + 1] !== 10) {
      return "failure";
    } else {
      state.position += 2;
    }
  }
}

module.exports = parseMultipartHeaderFields;