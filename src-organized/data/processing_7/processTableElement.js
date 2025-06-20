/**
 * Processes table-related elements and manages parsing state transitions during HTML parsing.
 * Handles different parsing modes and element types according to the HTML parsing algorithm.
 *
 * @param {number} actionType - The type of action to perform (e.g., start tag, end tag, etc.).
 * @param {string} tagName - The name of the HTML tag being processed.
 * @param {Array|null} attributes - Array of attribute key-value pairs for the tag, or null.
 * @param {*} additionalParam - Additional parameter for context or callback, usage depends on context.
 * @returns {void}
 */
function processTableElement(actionType, tagName, attributes, additionalParam) {
  /**
   * Helper to extract the value of the 'type' attribute from an attribute array.
   * @param {Array} attributeArray - Array of attribute key-value pairs.
   * @returns {string|null} - Lowercase value of the 'type' attribute, or null if not found.
   */
  function getTypeAttributeValue(attributeArray) {
    for (let i = 0, len = attributeArray.length; i < len; i++) {
      if (attributeArray[i][0] === "type") {
        return attributeArray[i][1].toLowerCase();
      }
    }
    return null;
  }

  switch (actionType) {
    case 1: // Start tag
      if (isInForeignContent) {
        handleForeignContent(actionType, tagName, attributes, additionalParam);
        return;
      } else if (shouldSwitchParserMode(parserState.top, parserModeStack)) {
        // Save current handler, switch to new handler, process, then restore
        parserModeStack = [];
        previousParserHandler = currentParserHandler;
        currentParserHandler = tableParserHandler;
        currentParserHandler(actionType, tagName, attributes, additionalParam);
        return;
      }
      break;
    case 4: // Character data
      handleCharacterData(tagName);
      return;
    case 5: // Comment node (no operation)
      return;
    case 2: // Start tag in table context
      switch (tagName) {
        case "caption":
          parserState.clearToContext(tableContext);
          markerManager.insertMarker();
          insertElement(tagName, attributes);
          currentParserHandler = captionParserHandler;
          return;
        case "colgroup":
          parserState.clearToContext(tableContext);
          insertElement(tagName, attributes);
          currentParserHandler = colgroupParserHandler;
          return;
        case "col":
          processTableElement(colStartAction, "colgroup", null);
          currentParserHandler(actionType, tagName, attributes, additionalParam);
          return;
        case "tbody":
        case "tfoot":
        case "thead":
          parserState.clearToContext(tableContext);
          insertElement(tagName, attributes);
          currentParserHandler = tableSectionParserHandler;
          return;
        case "streamAssistantResponseWithObservable":
        case "th":
        case "tr":
          processTableElement(colStartAction, "tbody", null);
          currentParserHandler(actionType, tagName, attributes, additionalParam);
          return;
        case "table":
          if (!parserState.inTableScope(tagName)) return;
          processTableElement(tableEndAction, tagName);
          currentParserHandler(actionType, tagName, attributes, additionalParam);
          return;
        case "style":
        case "script":
        case "template":
          handleSpecialElement(actionType, tagName, attributes, additionalParam);
          return;
        case "input": {
          const inputType = getTypeAttributeValue(attributes);
          if (inputType !== "hidden") break;
          insertElement(tagName, attributes);
          parserState.pop();
          return;
        }
        case "form":
          if (formElement || parserState.contains("template")) return;
          formElement = insertElement(tagName, attributes);
          parserState.popElement(formElement);
          return;
      }
      break;
    case 3: // End tag in table context
      switch (tagName) {
        case "table":
          if (!parserState.inTableScope(tagName)) return;
          parserState.popTag(tagName);
          resetInsertionMode();
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
          handleSpecialElement(actionType, tagName, attributes, additionalParam);
          return;
      }
      break;
    case -1: // Custom/forced action
      handleForeignContent(actionType, tagName, attributes, additionalParam);
      return;
  }
  // Default: fallback to foreign content handler, with state flag
  isParserInFallbackMode = true;
  handleForeignContent(actionType, tagName, attributes, additionalParam);
  isParserInFallbackMode = false;
}

module.exports = processTableElement;