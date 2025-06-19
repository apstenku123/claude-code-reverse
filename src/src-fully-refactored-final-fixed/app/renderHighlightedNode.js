/**
 * Renders a syntax-highlighted node (text or tag) using the provided theme configuration.
 *
 * @param {Object} node - The node to render. Should have a 'type' property ('text' or 'tag').
 * @param {Object} [themeConfig={}] - Optional theme configuration object mapping highlight classes to render functions.
 * @param {string} [highlightClass] - Optional highlight class name to use for rendering.
 * @returns {string} The rendered HTML string for the node.
 * @throws {Error} If the node type is not supported.
 */
function renderHighlightedNode(node, themeConfig = {}, highlightClass) {
  switch (node.type) {
    case "text": {
      const textContent = node.data;
      // If no highlight class is provided, use the default theme or plain renderer
      if (highlightClass === undefined) {
        return (themeConfig.default || TV1.DEFAULT_THEME.default || TV1.plain)(textContent);
      }
      // If highlight class is provided, return the raw text (already highlighted)
      return textContent;
    }
    case "tag": {
      // Extract the highlight class from the node'createInteractionAccessor class attribute (e.g., 'hljs-keyword')
      const highlightMatch = /hljs-(\w+)/.exec(node.attribs.class);
      if (highlightMatch) {
        const matchedClass = highlightMatch[1];
        // Recursively render all child nodes with the matched highlight class
        const renderedChildren = node.childNodes
          .map(childNode => renderHighlightedNode(childNode, themeConfig, matchedClass))
          .join("");
        // Use the themeConfig, fallback to default theme, or plain renderer for the matched class
        return (themeConfig[matchedClass] || TV1.DEFAULT_THEME[matchedClass] || TV1.plain)(renderedChildren);
      }
      // If no highlight class, recursively render all child nodes without a highlight class
      return node.childNodes
        .map(childNode => renderHighlightedNode(childNode, themeConfig))
        .join("");
    }
    default:
      throw new Error("Invalid node type " + node.type);
  }
}

module.exports = renderHighlightedNode;
