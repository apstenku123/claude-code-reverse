/**
 * Creates a DOM element from an HTML string or clones an existing element, then processes isBlobOrFileLikeObject with normalizeWhitespaceInDomTree.
 *
 * If the input is a string, isBlobOrFileLikeObject parses isBlobOrFileLikeObject as HTML and extracts the root element. If the input is a DOM node, isBlobOrFileLikeObject clones isBlobOrFileLikeObject deeply.
 * The resulting element is then passed to normalizeWhitespaceInDomTree for further processing with block, void, and preformatted code handlers.
 *
 * @param {string | HTMLElement} sourceContent - The HTML string to parse or the DOM element to clone.
 * @param {Object} options - Configuration options for processing.
 * @param {boolean} options.preformattedCode - Whether to use the preformatted code handler.
 * @returns {HTMLElement} The processed DOM element.
 */
function createTurndownElement(sourceContent, options) {
  let rootElement;

  if (typeof sourceContent === "string") {
    // Parse the HTML string and extract the root element with id 'turndown-root'
    const documentInstance = ZV5().parseFromString(
      '<x-turndown id="turndown-root">' + sourceContent + '</x-turndown>',
      "text/html"
    );
    rootElement = documentInstance.getElementById("turndown-root");
  } else {
    // Deeply clone the provided DOM element
    rootElement = sourceContent.cloneNode(true);
  }

  // Process the element with normalizeWhitespaceInDomTree, passing block, void, and pre handlers
  normalizeWhitespaceInDomTree({
    element: rootElement,
    isBlock: H1A,
    isVoid: iL2,
    isPre: options.preformattedCode ? isPreOrCodeElement : null
  });

  return rootElement;
}

module.exports = createTurndownElement;