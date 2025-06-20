/**
 * Processes HTML element names and content, dispatching to appropriate handlers or performing context-specific logic.
 *
 * @param {number} elementType - The type of HTML element or operation to process (e.g., 1: text, 2: element, 3: special elements, 4: comment, 5: skip).
 * @param {string} elementNameOrContent - The name of the HTML element or the content, depending on context.
 * @param {any} elementAttributes - Attributes or data associated with the element (may be null or undefined).
 * @param {any} processingContext - Additional context or parameters for processing (may be null or undefined).
 * @returns {any} Returns the result of processing, or undefined if nothing is processed.
 */
function processHtmlElement(elementType, elementNameOrContent, elementAttributes, processingContext) {
  let createdElement;
  switch (elementType) {
    case 1: // Text node or content
      // Remove unwanted characters using Gk regex and skip if empty
      elementNameOrContent = elementNameOrContent.replace(Gk, "");
      if (elementNameOrContent.length === 0) return;
      break;
    case 5: // Skip processing
      return;
    case 4: // Comment node
      // Create and append a comment node
      MA._appendChild(MA.createComment(elementNameOrContent));
      return;
    case 2: // HTML element node
      if (elementNameOrContent === "html") {
        // Create an <html> element, push to stack, append to MA, and set handler
        createdElement = B3(MA, elementNameOrContent, elementAttributes);
        x.push(createdElement);
        MA.appendChild(createdElement);
        invokeHandlerWithArguments = handleElementProcessing;
        return;
      }
      break;
    case 3: // Special elements (html, head, body, br)
      switch (elementNameOrContent) {
        case "html":
        case "head":
        case "body":
        case "br":
          // normalizeToError nothing for these special elements
          break;
        default:
          // For all other elements, return early
          return;
      }
  }
  // Default processing: create an <html> element and process recursively
  createdElement = B3(MA, "html", null);
  x.push(createdElement);
  MA.appendChild(createdElement);
  invokeHandlerWithArguments = handleElementProcessing;
  invokeHandlerWithArguments(elementType, elementNameOrContent, elementAttributes, processingContext);
}

module.exports = processHtmlElement;
