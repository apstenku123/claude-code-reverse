/**
 * Processes a token within the context of the HTML <head> element.
 *
 * This function inserts a fake <head> element into the DOM tree, sets the headElement reference,
 * switches the insertion mode to 'IN_HEAD_MODE', and then processes the given token accordingly.
 *
 * @param {Object} parserContext - The parser context object containing DOM manipulation methods and state.
 * @param {Object} token - The token to be processed within the <head> context.
 * @returns {void}
 */
function processTokenInHeadMode(parserContext, token) {
  // Insert a fake <head> element into the DOM tree
  parserContext._insertFakeElement(i.HEAD);
  
  // Update the headElement reference to the current open element
  parserContext.headElement = parserContext.openElements.current;
  
  // Set the insertion mode to 'IN_HEAD_MODE' for correct parsing behavior
  parserContext.insertionMode = "IN_HEAD_MODE";
  
  // Process the provided token in the current context
  parserContext._processToken(token);
}

module.exports = processTokenInHeadMode;