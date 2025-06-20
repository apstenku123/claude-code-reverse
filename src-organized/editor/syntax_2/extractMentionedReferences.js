/**
 * Extracts and resolves all unique mention-like references (e.g., @user, @path) from a parsed Markdown AST.
 *
 * This function traverses the tokenized Markdown structure, finds all text nodes containing @-mentions,
 * resolves them using the provided resolver, and returns a deduplicated array of resolved references.
 *
 * @param {string} markdownSource - The raw Markdown source to parse and extract references from.
 * @param {object} resolverConfig - Configuration or context passed to the reference resolver function (resolveObservablePath).
 * @returns {string[]} Array of unique, resolved references found in the Markdown text.
 */
function extractMentionedReferences(markdownSource, resolverConfig) {
  // Set to store unique resolved references
  const uniqueReferences = new Set();

  // Tokenize the Markdown source using the external lexer
  const tokens = new YW().lex(markdownSource);

  /**
   * Recursively traverse tokens to extract @-mention references from text nodes.
   * @param {Array} tokenList - Array of tokens (from the Markdown lexer)
   */
  function traverseTokens(tokenList) {
    for (const token of tokenList) {
      // Skip code blocks and inline code
      if (token.type === "code" || token.type === "codespan") continue;

      // Process text nodes for @-mentions
      if (token.type === "text") {
        const textContent = token.text || "";
        // Regex to match @-mentions, allowing escaped spaces (e.g., @foo\ bar)
        const mentionRegex = /(?:^|\s)@((?:[^\s\\]|\\ )+)/g;
        let match;
        while ((match = mentionRegex.exec(textContent)) !== null) {
          let mention = match[1];
          if (!mention) continue;

          // Replace escaped spaces with real spaces
          mention = mention.replace(/\ /g, " ");

          // Apply filtering rules to determine valid references
          if (
            // Relative or home paths (./, ~/)
            mention.startsWith("./") ||
            mention.startsWith("~/") ||
            // Absolute path (but not just "/")
            (mention.startsWith("/") && mention !== "/") ||
            // Not starting with @, not just symbols, and starts with a valid character
            (!mention.startsWith("@") &&
              !mention.match(/^[#%^&*()]+/) &&
              mention.match(/^[a-zA-Z0-9._-]/))
          ) {
            // Resolve the mention using the external resolver (resolveObservablePath)
            const resolvedReference = resolveObservablePath(mention, resolverConfig);
            uniqueReferences.add(resolvedReference);
          }
        }
      }

      // Recursively process nested tokens (e.g., inside lists or blockquotes)
      if (token.tokens) traverseTokens(token.tokens);
      if (token.items) traverseTokens(token.items);
    }
  }

  // Start recursive traversal from the root tokens
  traverseTokens(tokens);

  // Return the unique references as an array
  return [...uniqueReferences];
}

module.exports = extractMentionedReferences;