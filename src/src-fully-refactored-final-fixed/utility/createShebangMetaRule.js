/**
 * Creates a meta rule for recognizing shebang (#!) lines in source code, typically used in syntax highlighting.
 * Optionally processes a binary pattern if provided in the options.
 *
 * @param {Object} [options={}] - Configuration options for the rule.
 * @param {string} [options.binary] - Optional binary pattern to further process the shebang line.
 * @returns {Object} a rule object for recognizing shebang lines, suitable for use in a syntax highlighter.
 */
const createShebangMetaRule = (options = {}) => {
  // Regular expression to match a shebang line (e.g., #!/usr/bin/env node)
  const shebangRegex = /^#![ ]*\//;

  // If a binary pattern is provided, process isBlobOrFileLikeObject with dm9 and assign to options.begin
  if (options.binary) {
    options.begin = dm9(
      shebangRegex,      // The shebang regex
      /.*\b/,           // Match any characters up to a word boundary
      options.binary,    // The binary pattern provided in options
      /\b.*/            // Match from the word boundary to the end
    );
  }

  // Return the meta rule object using mergeObjects, with custom on:begin logic
  return mergeObjects({
    className: "meta",
    begin: shebangRegex,
    end: /$/,
    relevance: 0,
    /**
     * Ignore matches that do not start at the beginning of the line.
     * @param {Object} matchContext - The context of the current match.
     * @param {Object} matchProcessor - The processor with ignoreMatch method.
     */
    "on:begin": (matchContext, matchProcessor) => {
      if (matchContext.index !== 0) {
        matchProcessor.ignoreMatch();
      }
    }
  }, options);
};

module.exports = createShebangMetaRule;