/**
 * Iteratively processes active formatting elements within the parsing context.
 *
 * This function attempts up to 8 times to locate and process an active formatting element bookmark.
 * On each iteration, isBlobOrFileLikeObject:
 *  - Finds the next formatting element to process using `findFormattingElementBookmark`.
 *  - Retrieves the associated formatting element entry.
 *  - Updates the bookmark reference in the active formatting elements list.
 *  - Detaches the formatting element node from the DOM tree.
 *  - Re-inserts the node at the correct location in the DOM tree.
 *  - Performs any additional post-processing required.
 *
 * The loop breaks early if any step fails (e.g., no bookmark found, no formatting element entry, etc.).
 *
 * @param {object} parsingContext - The current parsing context, containing tree adapter, open elements, and formatting elements.
 * @param {object} config - Additional configuration or state required for processing.
 * @returns {void}
 */
function processActiveFormattingElements(parsingContext, config) {
  let formattingElementBookmark;
  for (let iteration = 0; iteration < 8; iteration++) {
    // Attempt to find the next formatting element bookmark to process
    formattingElementBookmark = findFormattingElementBookmark(parsingContext, config, formattingElementBookmark);
    if (!formattingElementBookmark) break;

    // Retrieve the formatting element entry associated with the bookmark
    const formattingElementEntry = getFormattingElementEntry(parsingContext, formattingElementBookmark);
    if (!formattingElementEntry) break;

    // Update the bookmark reference in the active formatting elements list
    parsingContext.activeFormattingElements.bookmark = formattingElementBookmark;

    // Detach the formatting element node from the DOM tree
    const formattingElementNode = getFormattingElementNode(parsingContext, formattingElementEntry, formattingElementBookmark.element);
    const commonAncestor = parsingContext.openElements.getCommonAncestor(formattingElementBookmark.element);
    parsingContext.treeAdapter.detachNode(formattingElementNode);

    // Re-insert the formatting element node at the correct location
    insertFormattingElementNode(parsingContext, commonAncestor, formattingElementNode);

    // Perform any additional post-processing required
    postProcessFormattingElement(parsingContext, formattingElementEntry, formattingElementBookmark);
  }
}

module.exports = processActiveFormattingElements;
