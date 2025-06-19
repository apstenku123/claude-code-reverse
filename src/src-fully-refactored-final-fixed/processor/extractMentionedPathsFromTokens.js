/**
 * Extracts unique mentioned file or directory paths from a tokenized Markdown AST.
 *
 * This function traverses a tokenized Markdown Abstract Syntax Tree (AST),
 * searching for text nodes that contain mentions in the form of @path (e.g., @./foo/bar),
 * and collects the resolved paths using the provided path resolver function.
 * It ignores mentions inside code blocks and code spans.
 *
 * @param {string} markdownSource - The Markdown source text to be tokenized and processed.
 * @param {object} config - Configuration object passed to the path resolver.
 * @returns {string[]} An array of unique, resolved mentioned paths found in the Markdown source.
 */
function extractMentionedPathsFromTokens(markdownSource, config) {
  const mentionedPathsSet = new Set();
  // Tokenize the markdown source using the external lexer (YW)
  const tokens = new YW().lex(markdownSource);

  /**
   * Recursively traverses tokens to find and collect mentioned paths.
   * @param {Array} tokenList - List of tokens to process.
   */
  function traverseTokens(tokenList) {
    for (const token of tokenList) {
      // Skip code blocks and inline code
      if (token.type === "code" || token.type === "codespan") continue;

      // Process text tokens for @mentions
      if (token.type === "text") {
        const textContent = token.text || "";
        // Regex to match @mentions, allowing for escaped spaces
        const mentionRegex = /(?:^|\s)@((?:[^\s\\]|\\ )+)/g;
        let match;
        while ((match = mentionRegex.exec(textContent)) !== null) {
          let mentionPath = match[1];
          if (!mentionPath) continue;
          // Replace escaped spaces with real spaces
          mentionPath = mentionPath.replace(/\ /g, " ");
          if (mentionPath) {
            // Only process if the mention looks like a path (not an email, not a handle)
            // Accepts: ./, ~/, / (but not just "/"), or non-@, non-symbol, alphanumeric start
            if (
              mentionPath.startsWith("./") ||
              mentionPath.startsWith("~/") ||
              (mentionPath.startsWith("/") && mentionPath !== "/") ||
              (!mentionPath.startsWith("@") &&
                !mentionPath.match(/^[#%^&*()]+/) &&
                mentionPath.match(/^[a-zA-Z0-9._-]/))
            ) {
              // Resolve the path using the external resolveObservablePath function
              const resolvedPath = resolveObservablePath(mentionPath, config);
              mentionedPathsSet.add(resolvedPath);
            }
          }
        }
      }
      // Recursively process nested tokens (e.g., inside lists or blockquotes)
      if (token.tokens) traverseTokens(token.tokens);
      if (token.items) traverseTokens(token.items);
    }
  }

  traverseTokens(tokens);
  return [...mentionedPathsSet];
}

module.exports = extractMentionedPathsFromTokens;