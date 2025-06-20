/**
 * Normalizes various MIME types to standard equivalents for JavaScript, JSON, XML, and SVG.
 *
 * @param {Object} mimeTypeObject - An object representing a MIME type, with at least 'essence' and 'subtype' properties.
 * @param {string} mimeTypeObject.essence - The main MIME type string (e.g., 'text/javascript').
 * @param {string} mimeTypeObject.subtype - The subtype portion of the MIME type (e.g., 'json', 'xml', or 'vnd.api+json').
 * @returns {string} The normalized MIME type string, or an empty string if not recognized.
 */
function normalizeMimeType(mimeTypeObject) {
  switch (mimeTypeObject.essence) {
    // Normalize all JavaScript-related MIME types to 'text/javascript'
    case "application/ecmascript":
    case "application/javascript":
    case "application/x-ecmascript":
    case "application/x-javascript":
    case "text/ecmascript":
    case "text/javascript":
    case "text/javascript1.0":
    case "text/javascript1.1":
    case "text/javascript1.2":
    case "text/javascript1.3":
    case "text/javascript1.4":
    case "text/javascript1.5":
    case "text/jscript":
    case "text/livescript":
    case "text/x-ecmascript":
    case "text/x-javascript":
      return "text/javascript";
    // Normalize JSON-related MIME types to 'application/json'
    case "application/json":
    case "text/json":
      return "application/json";
    // SVG MIME type remains unchanged
    case "image/svg+xml":
      return "image/svg+xml";
    // Normalize XML-related MIME types to 'application/xml'
    case "text/xml":
    case "application/xml":
      return "application/xml";
  }

  // Handle structured syntax suffixes for JSON and XML (e.g., 'application/vnd.api+json')
  if (mimeTypeObject.subtype.endsWith("+json")) {
    return "application/json";
  }
  if (mimeTypeObject.subtype.endsWith("+xml")) {
    return "application/xml";
  }

  // Return empty string if MIME type is not recognized
  return "";
}

module.exports = normalizeMimeType;