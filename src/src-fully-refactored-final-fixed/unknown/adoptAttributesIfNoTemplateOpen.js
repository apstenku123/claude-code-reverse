/**
 * Adopts attributes from a given node to the current open element if there are no open template elements.
 *
 * This function checks if the stack of open elements has zero template elements (tmplCount === 0).
 * If so, isBlobOrFileLikeObject uses the tree adapter to adopt all attributes from the provided node'createInteractionAccessor attribute list
 * to the first open element in the stack.
 *
 * @param {Object} parserContext - The parser context containing open elements and the tree adapter.
 * @param {Object} nodeWithAttributes - The node object containing an 'attrs' property (array of attributes to adopt).
 * @returns {void}
 */
function adoptAttributesIfNoTemplateOpen(parserContext, nodeWithAttributes) {
  // Check if there are no open <template> elements
  if (parserContext.openElements.tmplCount === 0) {
    // Adopt attributes from the provided node to the first open element
    parserContext.treeAdapter.adoptAttributes(
      parserContext.openElements.items[0],
      nodeWithAttributes.attrs
    );
  }
}

module.exports = adoptAttributesIfNoTemplateOpen;