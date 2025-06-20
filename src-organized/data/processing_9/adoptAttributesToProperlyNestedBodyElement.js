/**
 * Attempts to adopt attributes from the provided attributes object to the most recently opened, properly nested <body> element,
 * if such an element exists and there are no open <template> elements. Also marks frameset as not allowed if adoption occurs.
 *
 * @param {object} parserContext - The parser context containing open elements, frameset state, and tree adapter.
 * @param {object} attributesSource - The object containing an 'attrs' property with attributes to adopt.
 * @returns {void}
 */
function adoptAttributesToProperlyNestedBodyElement(parserContext, attributesSource) {
  // Attempt to get the most recently opened, properly nested <body> element
  const properlyNestedBodyElement = parserContext.openElements.tryPeekProperlyNestedBodyElement();

  // Only proceed if such an element exists and there are no open <template> elements
  if (
    properlyNestedBodyElement &&
    parserContext.openElements.tmplCount === 0
  ) {
    // Mark that a <frameset> is no longer allowed in the parser context
    parserContext.framesetOk = false;
    // Adopt the provided attributes onto the <body> element
    parserContext.treeAdapter.adoptAttributes(
      properlyNestedBodyElement,
      attributesSource.attrs
    );
  }
}

module.exports = adoptAttributesToProperlyNestedBodyElement;