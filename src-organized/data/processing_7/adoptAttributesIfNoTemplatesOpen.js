/**
 * Adopts attributes from a given node to the first open element if there are no open template elements.
 *
 * This function checks if the current open elements stack has zero template elements (tmplCount === 0).
 * If so, isBlobOrFileLikeObject uses the tree adapter to adopt all attributes from the provided node'createInteractionAccessor attributes (sourceNode.attrs)
 * to the first open element in the open elements stack.
 *
 * @param {Object} parserContext - The parser context containing open elements and the tree adapter.
 * @param {Object} sourceNode - The node whose attributes should be adopted. Must have an 'attrs' property.
 * @returns {void}
 */
function adoptAttributesIfNoTemplatesOpen(parserContext, sourceNode) {
  // Check if there are no open <template> elements
  if (parserContext.openElements.tmplCount === 0) {
    // Adopt attributes from sourceNode to the first open element
    parserContext.treeAdapter.adoptAttributes(
      parserContext.openElements.items[0],
      sourceNode.attrs
    );
  }
}

module.exports = adoptAttributesIfNoTemplatesOpen;