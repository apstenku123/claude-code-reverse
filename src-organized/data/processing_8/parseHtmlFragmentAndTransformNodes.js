/**
 * Parses an HTML fragment string and transforms each top-level node using a provided transformation function.
 *
 * @param {string} htmlFragment - The HTML fragment to parse.
 * @param {Object} [options={}] - Optional configuration for the transformation function.
 * @returns {string} The concatenated result of transforming each top-level node in the fragment.
 */
function parseHtmlFragmentAndTransformNodes(htmlFragment, options = {}) {
  // Parse the HTML fragment into a document fragment using the specified tree adapter
  const parsedFragment = aB5.parseFragment(htmlFragment, {
    treeAdapter: sB5.default
  });

  // Transform each child node using the renderHighlightedNode function and join the results into a single string
  return parsedFragment.childNodes
    .map(function (node) {
      return renderHighlightedNode(node, options);
    })
    .join("");
}

module.exports = parseHtmlFragmentAndTransformNodes;