/**
 * Extracts observable paths from a tokenized source string, resolving them to their fully qualified forms.
 *
 * This function parses a tokenized representation of a source string (such as Markdown),
 * recursively traverses its tokens, and extracts all observable path references (e.g., @foo/bar, ./baz),
 * resolving them using the provided configuration/context. It ignores code and codespan tokens.
 *
 * @param {string} sourceObservable - The source string to tokenize and process for observable paths.
 * @param {object} config - The configuration/context used to resolve observable paths.
 * @returns {string[]} An array of unique, fully qualified observable paths found in the source.
 */
function extractObservablePathsFromTokens(sourceObservable, config) {
  const observablePaths = new Set();
  const lexer = new YW().lex(sourceObservable);

  /**
   * Recursively traverses tokens to extract observable paths from text tokens.
   * @param {Array} tokens - The array of tokens to process.
   */
  function traverseTokens(tokens) {
    for (const token of tokens) {
      // Skip code and codespan tokens
      if (token.type === "code" || token.type === "codespan") continue;

      // Process text tokens for observable path references
      if (token.type === "text") {
        const textContent = token.text || "";
        // Regex to match observable path references (e.g., @foo/bar, ./baz)
        const observablePathRegex = /(?:^|\s)@((?:[^\s\\]|\\ )+)/g;
        let match;
        while ((match = observablePathRegex.exec(textContent)) !== null) {
          let matchedPath = match[1];
          if (!matchedPath) continue;
          // Replace escaped spaces with actual spaces
          matchedPath = matchedPath.replace(/\ /g, " ");
          if (matchedPath) {
            // Check if the matched path is a valid observable reference
            const isRelativePath = matchedPath.startsWith("./") || matchedPath.startsWith("~/");
            const isAbsolutePath = matchedPath.startsWith("/") && matchedPath !== "/";
            const isNamedObservable = !matchedPath.startsWith("@") &&
              !matchedPath.match(/^[#%^&*()]+/) &&
              matchedPath.match(/^[a-zA-Z0-9._-]/);
            if (isRelativePath || isAbsolutePath || isNamedObservable) {
              // Resolve the observable path using the provided config
              const resolvedPath = resolveObservablePath(matchedPath, config);
              observablePaths.add(resolvedPath);
            }
          }
        }
      }
      // Recursively process nested tokens and items
      if (token.tokens) traverseTokens(token.tokens);
      if (token.items) traverseTokens(token.items);
    }
  }

  traverseTokens(lexer);
  return [...observablePaths];
}

module.exports = extractObservablePathsFromTokens;