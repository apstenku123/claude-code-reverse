/**
 * Parses a Buffer containing multipart/form-data and extracts its parts.
 *
 * @param {Buffer} multipartBuffer - The raw Buffer containing the multipart/form-data payload.
 * @param {Object} requestMetadata - Metadata object describing the request, must include 'essence' and 'parameters'.
 * @returns {Array|String} Array of parsed form parts, or 'failure' string if parsing fails.
 *
 * The function expects requestMetadata.essence to be 'multipart/form-data' and a boundary parameter to be present.
 * Each part is parsed and returned as an array of objects, each containing the field name, value, and optional filename.
 */
function parseMultipartFormDataBuffer(multipartBuffer, requestMetadata) {
  // Ensure the request is a multipart/form-data request
  aD1(requestMetadata !== "failure" && requestMetadata.essence === "multipart/form-data");

  // Extract the boundary parameter from the request metadata
  const boundary = requestMetadata.parameters.get("boundary");
  if (boundary === undefined) return "failure";

  // Prepare the boundary marker as a Buffer
  const boundaryBuffer = Buffer.from(`--${boundary}`, "utf8");
  const parsedParts = [];
  const positionTracker = { position: 0 };

  // Skip any leading CRLF (\r\n) characters
  while (
    multipartBuffer[positionTracker.position] === 13 &&
    multipartBuffer[positionTracker.position + 1] === 10
  ) {
    positionTracker.position += 2;
  }

  // Trim trailing CRLF from the buffer
  let effectiveLength = multipartBuffer.length;
  while (
    multipartBuffer[effectiveLength - 1] === 10 &&
    multipartBuffer[effectiveLength - 2] === 13
  ) {
    effectiveLength -= 2;
  }
  if (effectiveLength !== multipartBuffer.length) {
    multipartBuffer = multipartBuffer.subarray(0, effectiveLength);
  }

  // Main parsing loop
  while (true) {
    // Check for boundary at the current position
    if (
      multipartBuffer
        .subarray(positionTracker.position, positionTracker.position + boundaryBuffer.length)
        .equals(boundaryBuffer)
    ) {
      positionTracker.position += boundaryBuffer.length;
    } else {
      return "failure";
    }

    // Check for end boundary (with optional CRLF or '--')
    if (
      (positionTracker.position === multipartBuffer.length - 2 && doesArrayMatchAtPosition(multipartBuffer, qJ6, positionTracker)) ||
      (positionTracker.position === multipartBuffer.length - 4 && doesArrayMatchAtPosition(multipartBuffer, MJ6, positionTracker))
    ) {
      return parsedParts;
    }

    // Expect CRLF after boundary
    if (
      multipartBuffer[positionTracker.position] !== 13 ||
      multipartBuffer[positionTracker.position + 1] !== 10
    ) {
      return "failure";
    }
    positionTracker.position += 2;

    // Parse headers for this part
    const partHeaders = parseMultipartHeaderFields(multipartBuffer, positionTracker);
    if (partHeaders === "failure") return "failure";
    const {
      name: fieldName,
      filename: fileName,
      contentType,
      encoding
    } = partHeaders;

    // Skip the CRLF after headers
    positionTracker.position += 2;

    let partContent;
    {
      // Find the start of the next boundary (search for boundary marker, skipping the initial '--')
      const nextBoundaryIndex = multipartBuffer.indexOf(
        boundaryBuffer.subarray(2),
        positionTracker.position
      );
      if (nextBoundaryIndex === -1) return "failure";
      // Extract the part content (excluding the trailing CRLF before the boundary)
      partContent = multipartBuffer.subarray(
        positionTracker.position,
        nextBoundaryIndex - 4
      );
      positionTracker.position += partContent.length;
      // Decode if base64 encoding is specified
      if (encoding === "base64") {
        partContent = Buffer.from(partContent.toString(), "base64");
      }
    }

    // Expect CRLF after part content
    if (
      multipartBuffer[positionTracker.position] !== 13 ||
      multipartBuffer[positionTracker.position + 1] !== 10
    ) {
      return "failure";
    } else {
      positionTracker.position += 2;
    }

    let partValue;
    if (fileName !== null) {
      // If this part is a file, ensure content type is valid
      let effectiveContentType = contentType ?? "text/plain";
      if (!isAsciiString(effectiveContentType)) effectiveContentType = "";
      // Create a file-like object for this part
      partValue = new NJ6([partContent], fileName, {
        type: effectiveContentType
      });
    } else {
      // Otherwise, treat as a regular field
      partValue = HJ6(Buffer.from(partContent));
    }

    // Validate the field name and value
    aD1(Ch0(fieldName));
    aD1((typeof partValue === "string" && Ch0(partValue)) || wJ6(partValue));

    // Add the parsed part to the result array
    parsedParts.push(EJ6(fieldName, partValue, fileName));
  }
}

module.exports = parseMultipartFormDataBuffer;
