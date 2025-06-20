/**
 * Checks if there is a numbered header element (e.g., <h1>-<h6>) in the current open elements stack.
 * If such a header is in scope, generates implied end tags and pops elements from the stack
 * until the numbered header is removed. This is typically used in HTML parsing to ensure
 * proper closure of header elements according to the HTML parsing algorithm.
 *
 * @param {object} parserContext - The parser context containing the openElements stack and related methods.
 * @returns {void}
 */
function closeNumberedHeaderIfInScope(parserContext) {
  // Check if a numbered header is currently in scope in the open elements stack
  if (parserContext.openElements.hasNumberedHeaderInScope()) {
    // Generate implied end tags as per the HTML parsing rules
    parserContext.openElements.generateImpliedEndTags();
    // Pop elements from the stack until the numbered header is removed
    parserContext.openElements.popUntilNumberedHeaderPopped();
  }
}

module.exports = closeNumberedHeaderIfInScope;