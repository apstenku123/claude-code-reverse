/**
 * Inserts a fake <head> element into the document structure, sets the current head element,
 * updates the insertion mode to 'IN_HEAD_MODE', and processes the provided token.
 *
 * @param {Object} documentParser - The parser or document context object responsible for managing the DOM structure.
 * @param {Object} token - The token to be processed after setting up the head context.
 * @returns {void}
 */
function processHeadInsertion(documentParser, token) {
  // Insert a fake <head> element into the DOM structure
  documentParser._insertFakeElement(i.HEAD);

  // Set the headElement property to the current open element (which should now be <head>)
  documentParser.headElement = documentParser.openElements.current;

  // Update the insertion mode to indicate handleMissingDoctypeError are in the <head> section
  documentParser.insertionMode = "IN_HEAD_MODE";

  // Process the provided token in the new context
  documentParser._processToken(token);
}

module.exports = processHeadInsertion;