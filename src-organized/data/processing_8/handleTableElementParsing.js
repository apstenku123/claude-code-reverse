/**
 * Handles parsing and processing of table-related elements during HTML parsing.
 * This function manages the insertion, removal, and context switching for table elements
 * according to the HTML parsing algorithm, handling special cases for certain tags.
 *
 * @param {number} operationType - The type of parsing operation (e.g., start tag, end tag, etc.)
 * @param {string} tagName - The name of the HTML tag being processed
 * @param {Array} attributes - The attributes of the tag, as an array of [name, value] pairs
 * @param {any} additionalParam - Additional parameter for context or callback usage
 * @returns {void}
 */
function handleTableElementParsing(operationType, tagName, attributes, additionalParam) {
  /**
   * Extracts the value of the 'type' attribute from a list of attributes, lowercased.
   * @param {Array} attributeList - Array of [name, value] pairs
   * @returns {string|null} The lowercased type value, or null if not found
   */
  function getTypeAttributeValue(attributeList) {
    for (let i = 0, len = attributeList.length; i < len; i++) {
      if (attributeList[i][0] === "type") {
        return attributeList[i][1].toLowerCase();
      }
    }
    return null;
  }

  switch (operationType) {
    case 1: // Start tag
      if (isParsingFragment) {
        processFragment(operationType, tagName, attributes, additionalParam);
        return;
      } else if (isInTopContext(window.top, templateContext)) {
        pendingElements = [];
        previousParserState = currentParserState;
        currentParserState = tableParserState;
        currentParserState(operationType, tagName, attributes, additionalParam);
        return;
      }
      break;
    case 4: // Special operation (e.g., character data)
      handleCharacterData(tagName);
      return;
    case 5: // No operation
      return;
    case 2: // Start tag in table context
      switch (tagName) {
        case "caption":
          parserContext.clearToContext(tableSectionContext);
          markerManager.insertMarker();
          insertElement(tagName, attributes);
          currentParserState = captionParserState;
          return;
        case "colgroup":
          parserContext.clearToContext(tableSectionContext);
          insertElement(tagName, attributes);
          currentParserState = colgroupParserState;
          return;
        case "col":
          handleTableElementParsing(startTagConstant, "colgroup", null);
          currentParserState(operationType, tagName, attributes, additionalParam);
          return;
        case "tbody":
        case "tfoot":
        case "thead":
          parserContext.clearToContext(tableSectionContext);
          insertElement(tagName, attributes);
          currentParserState = tableBodyParserState;
          return;
        case "streamAssistantResponseWithObservable":
        case "th":
        case "tr":
          handleTableElementParsing(startTagConstant, "tbody", null);
          currentParserState(operationType, tagName, attributes, additionalParam);
          return;
        case "table":
          if (!parserContext.inTableScope(tagName)) return;
          handleTableElementParsing(endTagConstant, tagName);
          currentParserState(operationType, tagName, attributes, additionalParam);
          return;
        case "style":
        case "script":
        case "template":
          handleSpecialTag(operationType, tagName, attributes, additionalParam);
          return;
        case "input":
          const inputType = getTypeAttributeValue(attributes);
          if (inputType !== "hidden") break;
          insertElement(tagName, attributes);
          parserContext.pop();
          return;
        case "form":
          if (formElement || parserContext.contains("template")) return;
          formElement = insertElement(tagName, attributes);
          parserContext.popElement(formElement);
          return;
      }
      break;
    case 3: // End tag in table context
      switch (tagName) {
        case "table":
          if (!parserContext.inTableScope(tagName)) return;
          parserContext.popTag(tagName);
          afterTableEnd();
          return;
        case "body":
        case "caption":
        case "col":
        case "colgroup":
        case "html":
        case "tbody":
        case "streamAssistantResponseWithObservable":
        case "tfoot":
        case "th":
        case "thead":
        case "tr":
          // Ignore these end tags in this context
          return;
        case "template":
          handleSpecialTag(operationType, tagName, attributes, additionalParam);
          return;
      }
      break;
    case -1: // Special error or fallback operation
      processFragment(operationType, tagName, attributes, additionalParam);
      return;
  }
  // Default fallback: set error flag, process as fragment, then reset flag
  isParseError = true;
  processFragment(operationType, tagName, attributes, additionalParam);
  isParseError = false;
}

module.exports = handleTableElementParsing;