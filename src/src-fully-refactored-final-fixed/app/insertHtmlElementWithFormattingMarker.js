/**
 * Inserts an HTML element into the DOM tree and updates the active formatting elements stack.
 * This function is typically used during HTML parsing to handle elements that affect formatting (like <b>, <i>, etc).
 *
 * @param {object} parserContext - The parser context object that manages the DOM tree and formatting elements.
 *   Must provide methods: _reconstructActiveFormattingElements, _insertElement, and property activeFormattingElements.
 * @param {object} htmlElement - The HTML element to be inserted into the DOM tree.
 * @returns {void}
 */
function insertHtmlElementWithFormattingMarker(parserContext, htmlElement) {
  // Ensure the active formatting elements are reconstructed before inserting the new element
  parserContext._reconstructActiveFormattingElements();

  // Insert the new HTML element into the DOM tree, specifying the HTML namespace
  parserContext._insertElement(htmlElement, u2.HTML);

  // Insert a marker into the active formatting elements stack
  parserContext.activeFormattingElements.insertMarker();

  // Indicate that the parser is no longer in a state where a <frameset> is allowed
  parserContext.framesetOk = false;
}

module.exports = insertHtmlElementWithFormattingMarker;