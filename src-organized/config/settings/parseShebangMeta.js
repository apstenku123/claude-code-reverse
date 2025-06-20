/**
 * Parses and highlights shebang (#!) lines in source code, with optional binary matching.
 *
 * @param {Object} [options={}] - Configuration options for parsing.
 * @param {RegExp} [options.binary] - Optional regular expression to match binary names in the shebang line.
 * @returns {Object} Highlight.js-compatible mode definition for shebang meta lines.
 */
const parseShebangMeta = (options = {}) => {
  // Regular expression to match the start of a shebang line (e.g., #!/usr/bin/env)
  const shebangStartRegex = /^#![ ]*\//;

  // If a binary regex is provided, create a 'begin' property that matches the binary in the shebang
  if (options.binary) {
    // dm9 combines regexes to match the binary name in the shebang line
    options.begin = dm9(
      shebangStartRegex, // Start of shebang
      /.*\b/,           // Any characters up to a word boundary
      options.binary,    // The provided binary regex
      /\b.*/            // Word boundary to the end
    );
  }

  // Return a Highlight.js mode definition for meta shebang lines
  return mergeObjects({
    className: "meta",
    begin: shebangStartRegex,
    end: /$/,
    relevance: 0,
    /**
     * Only match if the shebang is at the very start of the file/line
     * @param {Object} matchContext - The match context (contains index, etc.)
     * @param {Object} matchProcessor - The processor with ignoreMatch method
     */
    "on:begin": (matchContext, matchProcessor) => {
      if (matchContext.index !== 0) {
        // Ignore matches that are not at the start of the file/line
        matchProcessor.ignoreMatch();
      }
    }
  }, options);
};

module.exports = parseShebangMeta;
