/**
 * @class MarkdownSerializer
 * @description
 * Constructs a MarkdownSerializer instance with customizable options for serializing HTML or other content into Markdown format. 
 * Provides default serialization rules and allows overriding via options.
 *
 * @param {Object} [customOptions={}] - Optional configuration object to override default serialization options.
 * @returns {MarkdownSerializer} a new MarkdownSerializer instance.
 */
function MarkdownSerializer(customOptions = {}) {
  // Ensure function is called as a constructor
  if (!(this instanceof MarkdownSerializer)) {
    return new MarkdownSerializer(customOptions);
  }

  // Default serialization options
  const defaultOptions = {
    rules: uZ, // Default rules for serialization (external dependency)
    headingStyle: "setext", // Markdown heading style
    hr: "* * *", // Horizontal rule style
    bulletListMarker: "*", // Bullet list marker
    codeBlockStyle: "indented", // Code block style
    fence: "```", // Fenced code block delimiter
    emDelimiter: "_", // Emphasis delimiter
    strongDelimiter: "**", // Strong emphasis delimiter
    linkStyle: "inlined", // Link style
    linkReferenceStyle: "full", // Link reference style
    br: "  ", // Line break representation
    preformattedCode: false, // Whether to keep code blocks preformatted
    /**
     * Handles replacement for blank elements.
     * @param {string} content - The content to replace.
     * @param {Object} node - The node being processed, with isBlock property.
     * @returns {string} The replacement string.
     */
    blankReplacement: function (content, node) {
      return node.isBlock ? `\n\n` : "";
    },
    /**
     * Handles replacement for elements to be kept as-is.
     * @param {string} content - The content to keep.
     * @param {Object} node - The node being processed, with isBlock and outerHTML properties.
     * @returns {string} The replacement string.
     */
    keepReplacement: function (content, node) {
      return node.isBlock ? `\n\n` + node.outerHTML + `\n\n` : node.outerHTML;
    },
    /**
     * Handles default replacement for elements.
     * @param {string} content - The content to replace.
     * @param {Object} node - The node being processed, with isBlock property.
     * @returns {string} The replacement string.
     */
    defaultReplacement: function (content, node) {
      return node.isBlock ? `\n\n` + content + `\n\n` : content;
    }
  };

  // Merge default options with custom options (mergeObjects is assumed to be a deep merge utility)
  this.options = mergeObjects({}, defaultOptions, customOptions);

  // Initialize serialization rules (RuleAccessor is assumed to be a rules engine/class)
  this.rules = new RuleAccessor(this.options);
}

module.exports = MarkdownSerializer;