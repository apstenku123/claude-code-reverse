/**
 * Creates a DOM element from an HTML string or clones an existing element, then processes isBlobOrFileLikeObject with normalizeWhitespaceInDomTree.
 *
 * If the input is a string, isBlobOrFileLikeObject wraps isBlobOrFileLikeObject in a custom <x-turndown> root element and parses isBlobOrFileLikeObject into a DOM element.
 * If the input is a DOM element, isBlobOrFileLikeObject clones the element deeply.
 * After obtaining the element, isBlobOrFileLikeObject calls normalizeWhitespaceInDomTree to process isBlobOrFileLikeObject with block/void/preformatting options.
 *
 * @param {string|Element} source - The HTML string or DOM element to process.
 * @param {Object} options - Configuration options for processing.
 * @param {boolean} [options.preformattedCode] - Whether the content should be treated as preformatted code.
 * @returns {Element} The processed DOM element (the root <x-turndown> or the cloned element).
 */
function createTurndownRootElement(source, options) {
  let rootElement;

  if (typeof source === "string") {
    // Parse the HTML string, wrapping isBlobOrFileLikeObject in a custom root element for identification
    const documentParser = ZV5();
    const parsedDocument = documentParser.parseFromString(
      `<x-turndown id="turndown-root">${source}</x-turndown>`,
      "text/html"
    );
    rootElement = parsedDocument.getElementById("turndown-root");
  } else {
    // Deeply clone the provided DOM element
    rootElement = source.cloneNode(true);
  }

  // Process the element with normalizeWhitespaceInDomTree, passing in block/void/preformatting options
  normalizeWhitespaceInDomTree({
    element: rootElement,
    isBlock: H1A,
    isVoid: iL2,
    isPre: options.preformattedCode ? isPreOrCodeElement : null
  });

  return rootElement;
}

module.exports = createTurndownRootElement;