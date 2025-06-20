/**
 * Handles different DOM parsing events and updates the DOM tree or parsing state accordingly.
 *
 * @param {number} eventType - The type of parsing event (e.g., 1: text, 4: comment, 5: element).
 * @param {string} eventData - The data associated with the event (e.g., text content, comment, tag name).
 * @param {string} [elementName] - The name of the element (used for element events).
 * @param {string} [attributeValue] - The attribute value or additional data (used for element events).
 * @returns {any} Returns the result of the fallback handler or undefined for some cases.
 */
function handleDomParsingEvent(eventType, eventData, elementName, attributeValue) {
  switch (eventType) {
    case 1: // Text node event
      // Remove unwanted characters from the text node
      const cleanedText = eventData.replace(Gk, "");
      if (cleanedText.length === 0) return;
      eventData = cleanedText;
      break;
    case 4: // Comment node event
      // Create and append a comment node to the DOM tree
      MA._appendChild(MA.createComment(eventData));
      return;
    case 5: // Element node event
      // Create and append a new element node to the DOM tree
      const tagName = eventData;
      const elementAttributes = elementName;
      const elementNamespace = attributeValue;
      MA.appendChild(new XC5(MA, tagName, elementAttributes, elementNamespace));

      // Determine if the document should be in quirks or limited quirks mode
      if (
        YA ||
        tagName.toLowerCase() !== "html" ||
        KC5.test(elementAttributes) ||
        (elementNamespace && elementNamespace.toLowerCase() === HC5) ||
        (elementNamespace === undefined && IL2.test(elementAttributes))
      ) {
        MA._quirks = true;
      } else if (
        zC5.test(elementAttributes) ||
        (elementNamespace !== undefined && IL2.test(elementAttributes))
      ) {
        MA._limitedQuirks = true;
      }
      invokeHandlerWithArguments = processHtmlElement;
      return;
  }
  // Fallback: set quirks mode and delegate to the fallback handler
  MA._quirks = true;
  invokeHandlerWithArguments = processHtmlElement;
  invokeHandlerWithArguments(eventType, eventData, elementName, attributeValue);
}

module.exports = handleDomParsingEvent;