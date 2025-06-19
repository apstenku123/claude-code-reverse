/**
 * Factory function that creates a DOM string parser class.
 * The returned class has a method to parse a string into a document using an external document creator.
 *
 * @category Utility
 * @module DomStringParserFactory
 * @returns {Class} DomStringParser - a class with a parseFromString method.
 */
function DomStringParserFactory() {
  // Import or initialize the document creation utility
  const documentCreator = uL2();

  /**
   * Class representing a DOM string parser.
   */
  class DomStringParser {
    /**
     * Parses a string into a document using the external document creator.
     * @param {string} domString - The string to be parsed into a document.
     * @returns {Document} The created document object.
     */
    parseFromString(domString) {
      // Delegate the parsing to the external document creator
      return documentCreator.createDocument(domString);
    }
  }

  return DomStringParser;
}

module.exports = DomStringParserFactory;