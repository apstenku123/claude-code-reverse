/**
 * Factory function that creates a parser class for XML strings.
 * The returned class provides a method to parse XML strings into documents using an external document creator.
 *
 * @returns {class} XmlStringParser - a class with a parseFromString method.
 */
function XmlStringParserFactory() {
  // Import or initialize the document creator dependency
  const documentCreator = uL2();

  /**
   * Class representing an XML string parser.
   */
  class XmlStringParser {
    /**
     * Parses an XML string and returns a document object.
     * @param {string} xmlString - The XML string to parse.
     * @returns {Document} The parsed XML document.
     */
    parseFromString(xmlString) {
      // Delegate the actual document creation to the external document creator
      return documentCreator.createDocument(xmlString);
    }
  }

  return XmlStringParser;
}

module.exports = XmlStringParserFactory;