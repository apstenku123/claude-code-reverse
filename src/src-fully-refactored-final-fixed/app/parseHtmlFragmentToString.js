/**
 * Parses an HTML fragment string and processes its child nodes using a provided handler.
 *
 * @param {string} htmlFragment - The HTML fragment to parse.
 * @param {Object} [options={}] - Optional configuration for node processing.
 * @returns {string} The concatenated result of processing each child node.
 */
function parseHtmlFragmentToString(htmlFragment, options = {}) {
  // Parse the HTML fragment into a document fragment using the specified tree adapter
  const fragment = aB5.parseFragment(htmlFragment, {
    treeAdapter: sB5.default
  });

  // Process each child node with renderHighlightedNode and join the results into a single string
  return fragment.childNodes
    .map(function(childNode) {
      return renderHighlightedNode(childNode, options);
    })
    .join("");
}

module.exports = parseHtmlFragmentToString;