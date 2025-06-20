/**
 * Parses a data URL and extracts its MIME type and body content.
 *
 * @param {Object} dataUrlObject - An object representing the parsed URL, expected to have a 'protocol' property and be compatible with getUrlWithoutHash.
 * @returns {{ mimeType: string, body: any } | 'failure'} An object containing the MIME type and body if parsing succeeds, or the string 'failure' if parsing fails.
 */
function parseDataUrl(dataUrlObject) {
  // Ensure the protocol is 'data:'
  uD1(dataUrlObject.protocol === "data:");

  // Get the full data URL string (e.g., 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==')
  let dataUrlString = getUrlWithoutHash(dataUrlObject, true);

  // Remove the 'data:' prefix
  dataUrlString = dataUrlString.slice(5);

  // Position tracker for parsing
  const positionTracker = { position: 0 };

  // Extract the MIME type and parameters up to the first comma
  let mimeTypeAndParams = extractSubstringFromPosition(",", dataUrlString, positionTracker);
  const commaIndex = mimeTypeAndParams.length;

  // Parse the MIME type and parameters
  mimeTypeAndParams = trimStringByCharCodePredicate(mimeTypeAndParams, true, true);

  // If handleMissingDoctypeError'removeTrailingCharacters reached the end of the string, parsing failed
  if (positionTracker.position >= dataUrlString.length) return "failure";

  // Move past the comma
  positionTracker.position++;

  // Extract the data payload (everything after the comma)
  const dataPayload = dataUrlString.slice(commaIndex + 1);
  let decodedData = bg0(dataPayload);

  // Check for ';base64' parameter (possibly with spaces)
  if (/;(\u0020){0,}base64$/i.test(mimeTypeAndParams)) {
    // Decode base64 data
    const base64Decoded = uint16ArrayToString(decodedData);
    decodedData = decodeBase64ToUint8Array(base64Decoded);
    if (decodedData === "failure") return "failure";

    // Remove ';base64' and any trailing spaces/semicolon from the MIME type string
    mimeTypeAndParams = mimeTypeAndParams.slice(0, -6); // Remove 'base64'
    mimeTypeAndParams = mimeTypeAndParams.replace(/(\u0020)+$/, ""); // Remove trailing spaces
    mimeTypeAndParams = mimeTypeAndParams.slice(0, -1); // Remove trailing semicolon
  }

  // If no MIME type is specified, default to 'text/plain'
  if (mimeTypeAndParams.startsWith(";")) {
    mimeTypeAndParams = "text/plain" + mimeTypeAndParams;
  }

  // Parse the MIME type
  let parsedMimeType = parseMediaTypeString(mimeTypeAndParams);
  if (parsedMimeType === "failure") {
    // Fallback to default MIME type
    parsedMimeType = parseMediaTypeString("text/plain;charset=US-ASCII");
  }

  return {
    mimeType: parsedMimeType,
    body: decodedData
  };
}

module.exports = parseDataUrl;