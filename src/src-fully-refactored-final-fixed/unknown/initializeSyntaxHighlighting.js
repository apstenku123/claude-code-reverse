/**
 * Initializes syntax highlighting for all <pre><code> blocks on the page.
 * This function is deprecated and should be replaced with highlightAll().
 * Ensures isBlobOrFileLikeObject only runs once per page load.
 *
 * @returns {void} Does not return a value.
 */
function initializeSyntaxHighlighting() {
  // Prevent multiple initializations
  if (initializeSyntaxHighlighting.hasBeenCalled) {
    return;
  }
  initializeSyntaxHighlighting.hasBeenCalled = true;

  // Notify about deprecation
  logDeprecationOnce(
    "10.6.0",
    "initHighlighting() is deprecated.  Use highlightAll() instead."
  );

  // Apply syntax highlighting to all <pre><code> elements
  const codeBlocks = document.querySelectorAll("pre code");
  codeBlocks.forEach(applyHighlightingToBlock);
}

// Static property to track if the function has been called
initializeSyntaxHighlighting.hasBeenCalled = false;

module.exports = initializeSyntaxHighlighting;
