/**
 * Extracts unique mention-like references from a tokenized Markdown AST, ignoring code and codespan tokens.
 * Mentions are identified by the pattern @mention, supporting escaped spaces, and filtered by specific rules.
 *
 * @param {string} markdownSource - The Markdown source text to process.
 * @param {object} config - Configuration object passed to resolveObservablePath for mention resolution.
 * @returns {string[]} Array of unique, resolved mention references found in the Markdown.
 */
function extractMentionsFromTokens(markdownSource, config) {
  const uniqueMentions = new Set();
  // Tokenize the markdown source using the external lexer
  const tokens = new YW().lex(markdownSource);

  /**
   * Recursively traverses tokens to find and collect valid mentions.
   * @param {Array} tokenList - List of tokens to process.
   */
  function traverseTokens(tokenList) {
    for (const token of tokenList) {
      // Skip code blocks and inline code
      if (token.type === "code" || token.type === "codespan") continue;

      if (token.type === "text") {
        const textContent = token.text || "";
        // Regex to match @mentions, allowing escaped spaces
        const mentionRegex = /(?:^|\s)@((?:[^\s\\]|\\ )+)/g;
        let match;
        while ((match = mentionRegex.exec(textContent)) !== null) {
          let mention = match[1];
          if (!mention) continue;
          // Replace escaped spaces with real spaces
          mention = mention.replace(/\ /g, " ");
          if (mention) {
            // Filtering rules for valid mentions
            if (
              mention.startsWith("./") ||
              mention.startsWith("~/") ||
              (mention.startsWith("/") && mention !== "/") ||
              (!mention.startsWith("@") &&
                !mention.match(/^[#%^&*()]+/) &&
                mention.match(/^[a-zA-Z0-9._-]/))
            ) {
              // Resolve the mention using resolveObservablePath and add to the set
              const resolvedMention = resolveObservablePath(mention, config);
              uniqueMentions.add(resolvedMention);
            }
          }
        }
      }
      // Recursively process nested tokens and list items
      if (token.tokens) traverseTokens(token.tokens);
      if (token.items) traverseTokens(token.items);
    }
  }

  traverseTokens(tokens);
  return [...uniqueMentions];
}

module.exports = extractMentionsFromTokens;