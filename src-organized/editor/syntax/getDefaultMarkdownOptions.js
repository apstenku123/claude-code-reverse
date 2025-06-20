/**
 * Returns the default configuration options for a Markdown parser.
 *
 * These options control parser behavior such as GFM support, pedantic mode,
 * custom renderers, tokenizers, and hooks. All options are set to their default values.
 *
 * @returns {Object} Default Markdown parser options.
 * @property {boolean} async - Whether parsing is asynchronous (default: false).
 * @property {boolean} breaks - Whether to support GFM line breaks (default: false).
 * @property {Object|null} extensions - Custom parser extensions (default: null).
 * @property {boolean} gfm - Enable GitHub Flavored Markdown (default: true).
 * @property {Object|null} hooks - Custom hooks for parser events (default: null).
 * @property {boolean} pedantic - Enable pedantic mode for parsing (default: false).
 * @property {Object|null} renderer - Custom renderer for output (default: null).
 * @property {boolean} silent - Suppress parser errors (default: false).
 * @property {Object|null} tokenizer - Custom tokenizer for parsing (default: null).
 * @property {Function|null} walkTokens - Function to walk tokens after parsing (default: null).
 */
function getDefaultMarkdownOptions() {
  // Return an object containing all default parser options
  return {
    async: false, // Parsing is synchronous by default
    breaks: false, // GFM line breaks are disabled by default
    extensions: null, // No custom extensions by default
    gfm: true, // GitHub Flavored Markdown is enabled by default
    hooks: null, // No custom hooks by default
    pedantic: false, // Pedantic mode is disabled by default
    renderer: null, // No custom renderer by default
    silent: false, // Parser errors are not suppressed by default
    tokenizer: null, // No custom tokenizer by default
    walkTokens: null // No token walking function by default
  };
}

module.exports = getDefaultMarkdownOptions;