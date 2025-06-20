/**
 * Creates a meta matcher for shebang lines (e.g., #!/usr/bin/env node) in source code.
 * Optionally processes a binary property to adjust the matching behavior.
 *
 * @param {Object} [options={}] - Configuration options for the matcher.
 * @param {string} [options.binary] - Optional binary string to further refine the match.
 * @returns {Object} a matcher object configured for shebang line detection.
 */
function createShebangMetaMatcher(options = {}) {
  // Regular expression to match a shebang line at the start of a file
  const shebangRegex = /^#![ ]*\//;

  // If a binary property is provided, process isBlobOrFileLikeObject with dm9 to adjust the 'begin' property
  if (options.binary) {
    options.begin = dm9(
      shebangRegex,        // The base shebang regex
      /.*\b/,             // Regex to match any characters up to a word boundary
      options.binary,      // The binary string to match
      /\b.*/              // Regex to match from the word boundary to the end
    );
  }

  // Return the matcher object configured for meta shebang detection
  return mergeObjects({
    className: "meta",
    begin: shebangRegex,
    end: /$/,
    relevance: 0,
    /**
     * Handler called at the beginning of a match.
     * Ignores the match if isBlobOrFileLikeObject does not start at the beginning of the input.
     * @param {Object} matchContext - The context of the match.
     * @param {Object} matchProcessor - The processor with ignoreMatch method.
     */
    "on:begin": (matchContext, matchProcessor) => {
      if (matchContext.index !== 0) {
        matchProcessor.ignoreMatch();
      }
    }
  }, options);
}

module.exports = createShebangMetaMatcher;