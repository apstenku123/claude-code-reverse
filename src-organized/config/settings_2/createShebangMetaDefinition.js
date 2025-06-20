/**
 * Creates a meta definition object for recognizing shebang lines (e.g., #!/usr/bin/env node) in source code.
 * Optionally processes a binary property to adjust the 'begin' pattern.
 *
 * @param {Object} [options={}] - Configuration options for the meta definition.
 * @param {string} [options.binary] - Optional binary string to further customize the begin pattern.
 * @returns {Object} Meta definition object for use in syntax highlighting or parsing.
 */
function createShebangMetaDefinition(options = {}) {
  // Regular expression to match a shebang line (e.g., #!/usr/bin/env node)
  const shebangPattern = /^#![ ]*\//;

  // If a binary property is provided, adjust the 'begin' pattern using dm9
  if (options.binary) {
    options.begin = dm9(
      shebangPattern,
      /.*\b/,
      options.binary,
      /\b.*/
    );
  }

  // Return the meta definition object
  return mergeObjects({
    className: "meta",
    begin: shebangPattern,
    end: /$/,
    relevance: 0,
    /**
     * Handler for the 'begin' event. Ignores matches that do not start at index 0.
     * @param {Object} match - The match object.
     * @param {Object} context - The context object, provides ignoreMatch().
     */
    "on:begin": (match, context) => {
      if (match.index !== 0) {
        context.ignoreMatch();
      }
    }
  }, options);
}

module.exports = createShebangMetaDefinition;