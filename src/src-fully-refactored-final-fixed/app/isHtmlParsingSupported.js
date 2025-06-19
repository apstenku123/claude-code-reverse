/**
 * Checks if the current environment'createInteractionAccessor DOMParser supports parsing HTML documents.
 *
 * @returns {boolean} True if DOMParser can parse 'text/html', false otherwise.
 */
function isHtmlParsingSupported() {
  // Access the DOMParser constructor from the external rL2 object
  const DOMParserConstructor = rL2.DOMParser;
  let isSupported = false;

  try {
    // Attempt to parse an empty string as 'text/html'.
    // If no error is thrown and a document is returned, HTML parsing is supported.
    const parsedDocument = new DOMParserConstructor().parseFromString("", "text/html");
    if (parsedDocument) {
      isSupported = true;
    }
  } catch (error) {
    // If an error occurs, HTML parsing is not supported.
  }

  return isSupported;
}

module.exports = isHtmlParsingSupported;