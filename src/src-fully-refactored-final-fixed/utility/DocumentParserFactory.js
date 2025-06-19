/**
 * Factory function that creates a DocumentParser class.
 * The DocumentParser class provides a method to parse a string into a document using the provided document creator.
 *
 * @returns {Class<DocumentParser>} a DocumentParser class with a parseFromString method.
 */
function DocumentParserFactory() {
  // Import or initialize the document creator dependency
  const documentCreator = uL2();

  /**
   * DocumentParser class
   * Provides a method to parse a string into a document.
   */
  class DocumentParser {
    /**
     * Parses the provided string into a document.
     * @param {string} xmlString - The string to be parsed into a document.
     * @returns {Document} The resulting document object.
     */
    parseFromString(xmlString) {
      // Delegate the parsing to the document creator
      return documentCreator.createDocument(xmlString);
    }
  }

  return DocumentParser;
}

module.exports = DocumentParserFactory;