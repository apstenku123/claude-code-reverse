/**
 * Handles processing of table-related elements during parsing or DOM manipulation.
 * This function manages different parsing modes and element types, dispatching to appropriate handlers
 * based on the current state and tag being processed. It is used as part of a table parsing or template system.
 *
 * @param {number} mode - The current parsing mode or action code.
 * @param {string} tagName - The name of the HTML tag being processed.
 * @param {Array|null} attributes - The attributes of the tag, as an array of [name, value] pairs, or null.
 * @param {any} context - Additional context or state needed for processing.
 * @returns {void}
 */
function handleTableElementProcessing(mode, tagName, attributes, context) {
  /**
   * Helper function to extract the value of the 'type' attribute from an attribute array.
   * @param {Array} attributeList - Array of [name, value] pairs.
   * @returns {string|null} The lowercased value of the 'type' attribute, or null if not found.
   */
  function getTypeAttributeValue(attributeList) {
    for (let i = 0, len = attributeList.length; i < len; i++) {
      if (attributeList[i][0] === "type") {
        return attributeList[i][1].toLowerCase();
      }
    }
    return null;
  }

  switch (mode) {
    case 1: // Initial or special processing mode
      if (isSpecialProcessingActive) {
        // Delegate to special handler
        processSpecialMode(mode, tagName, attributes, context);
        return;
      } else if (isInTopContext(window.top, processingContext)) {
        // Switch to alternate handler for top-level context
        pendingActions = [];
        previousHandler = currentHandler;
        currentHandler = alternateHandler;
        currentHandler(mode, tagName, attributes, context);
        return;
      }
      break;

    case 4: // Cleanup or end processing
      cleanupElement(tagName);
      return;

    case 5: // No operation for this mode
      return;

    case 2: // Start tag processing
      switch (tagName) {
        case "caption":
          domHandler.clearToContext(tableContext);
          markerManager.insertMarker();
          createElement(tagName, attributes);
          currentHandler = captionHandler;
          return;
        case "colgroup":
          domHandler.clearToContext(tableContext);
          createElement(tagName, attributes);
          currentHandler = colgroupHandler;
          return;
        case "col":
          handleTableElementProcessing(insertMode, "colgroup", null);
          currentHandler(mode, tagName, attributes, context);
          return;
        case "tbody":
        case "tfoot":
        case "thead":
          domHandler.clearToContext(tableContext);
          createElement(tagName, attributes);
          currentHandler = tableSectionHandler;
          return;
        case "streamAssistantResponseWithObservable":
        case "th":
        case "tr":
          handleTableElementProcessing(insertMode, "tbody", null);
          currentHandler(mode, tagName, attributes, context);
          return;
        case "table":
          if (!domHandler.inTableScope(tagName)) return;
          handleTableElementProcessing(endTagMode, tagName);
          currentHandler(mode, tagName, attributes, context);
          return;
        case "style":
        case "script":
        case "template":
          handleForeignContent(mode, tagName, attributes, context);
          return;
        case "input": {
          const inputType = getTypeAttributeValue(attributes);
          if (inputType !== "hidden") break;
          createElement(tagName, attributes);
          domHandler.pop();
          return;
        }
        case "form":
          if (formElement || domHandler.contains("template")) return;
          formElement = createElement(tagName, attributes);
          domHandler.popElement(formElement);
          return;
      }
      break;

    case 3: // End tag processing
      switch (tagName) {
        case "table":
          if (!domHandler.inTableScope(tagName)) return;
          domHandler.popTag(tagName);
          finalizeTable();
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
          // No action needed for these tags
          return;
        case "template":
          handleForeignContent(mode, tagName, attributes, context);
          return;
      }
      break;

    case -1: // Error or fallback mode
      processSpecialMode(mode, tagName, attributes, context);
      return;
  }

  // Default fallback: set error flag, process as special mode, then reset flag
  isErrorState = true;
  processSpecialMode(mode, tagName, attributes, context);
  isErrorState = false;
}

module.exports = handleTableElementProcessing;