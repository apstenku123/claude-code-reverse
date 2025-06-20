/**
 * Parses markup declarations (comments, CDATA, DOCTYPE) from an XML/HTML string.
 *
 * @param {string} sourceText - The full source string to parse.
 * @param {number} position - The current parsing position (index) in the source string.
 * @param {object} handler - An object with callback methods for handling parsed content (e.g., comment, characters, startCDATA, endCDATA, startDTD, endDTD).
 * @param {object} errorHandler - An object with an error method for reporting parsing errors.
 * @returns {number} The new position after parsing the declaration, or -1 if parsing failed.
 */
function parseMarkupDeclaration(sourceText, position, handler, errorHandler) {
  const declarationTypeChar = sourceText.charAt(position + 2);

  switch (declarationTypeChar) {
    case "-": {
      // Handle XML/HTML comment: <!-- ... -->
      if (sourceText.charAt(position + 3) === "-") {
        const commentEndIndex = sourceText.indexOf("-->", position + 4);
        if (commentEndIndex > position) {
          // Extract comment content and notify handler
          handler.comment(sourceText, position + 4, commentEndIndex - position - 4);
          return commentEndIndex + 3;
        } else {
          // Comment not closed properly
          errorHandler.error("Unclosed comment");
          return -1;
        }
      } else {
        // Not a valid comment declaration
        return -1;
      }
    }
    default: {
      // Handle CDATA section: <![CDATA[ ... ]]>
      if (sourceText.substr(position + 3, 6) === "CDATA[") {
        const cdataEndIndex = sourceText.indexOf("]]>", position + 9);
        handler.startCDATA();
        handler.characters(sourceText, position + 9, cdataEndIndex - position - 9);
        handler.endCDATA();
        return cdataEndIndex + 3;
      }

      // Handle DOCTYPE declaration: <!DOCTYPE ...>
      const doctypeTokens = extractHtmlTokensFromIndex(sourceText, position); // extractHtmlTokensFromIndex returns an array of token arrays
      const tokenCount = doctypeTokens.length;
      if (
        tokenCount > 1 &&
        /!doctype/i.test(doctypeTokens[0][0])
      ) {
        const name = doctypeTokens[1][0]; // DOCTYPE name
        let publicId = false;
        let systemId = false;
        if (tokenCount > 3) {
          if (/^public$/i.test(doctypeTokens[2][0])) {
            publicId = doctypeTokens[3][0];
            systemId = tokenCount > 4 && doctypeTokens[4][0];
          } else if (/^system$/i.test(doctypeTokens[2][0])) {
            systemId = doctypeTokens[3][0];
          }
        }
        const lastToken = doctypeTokens[tokenCount - 1];
        handler.startDTD(name, publicId, systemId);
        handler.endDTD();
        return lastToken.index + lastToken[0].length;
      }
    }
  }
  // If none of the above matched, return -1 to indicate failure
  return -1;
}

module.exports = parseMarkupDeclaration;