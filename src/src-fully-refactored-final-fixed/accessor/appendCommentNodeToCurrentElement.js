/**
 * Appends a comment node to the current template content or open element.
 *
 * This function delegates to the source object'createInteractionAccessor _appendCommentNode method,
 * passing the comment node configuration and the current context (either the
 * current template content or the current open element).
 *
 * @param {Object} sourceObservable - The object responsible for DOM manipulation, expected to have an _appendCommentNode method and openElements property.
 * @param {Object} commentNodeConfig - The configuration or data for the comment node to be appended.
 * @returns {void}
 */
function appendCommentNodeToCurrentElement(sourceObservable, commentNodeConfig) {
  // Determine the current context: prefer currentTmplContent if available, otherwise use current
  const currentContext = sourceObservable.openElements.currentTmplContent || sourceObservable.openElements.current;

  // Append the comment node to the determined context
  sourceObservable._appendCommentNode(commentNodeConfig, currentContext);
}

module.exports = appendCommentNodeToCurrentElement;
