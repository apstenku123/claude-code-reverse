/**
 * Parses a CSS declaration block string, processes each property-value pair via a callback, and returns a reconstructed string.
 * Handles comments, parentheses (e.g., in url()), and ignores malformed declarations.
 *
 * @param {string} cssDeclarations - The CSS declaration block as a string (e.g., 'color: red; font-size: 12px;').
 * @param {function} transformCallback - Callback invoked for each property-value pair. Receives (startIndex, resultLength, property, value, rawDeclaration).
 *                                        Should return a string to include in the result, or a falsy value to skip.
 * @returns {string} The reconstructed CSS declaration block after processing each property-value pair.
 */
function parseAndTransformCssDeclarations(cssDeclarations, transformCallback) {
  // Remove trailing whitespace and semicolons
  let trimmedDeclarations = Wt.trimRight(cssDeclarations);
  // Ensure the string ends with a semicolon for consistent parsing
  if (trimmedDeclarations[trimmedDeclarations.length - 1] !== ";") {
    trimmedDeclarations += ";";
  }

  const totalLength = trimmedDeclarations.length;
  let insideParentheses = false; // Tracks if handleMissingDoctypeError're inside parentheses (e.g., url(...))
  let declarationStart = 0;      // Start index of the current declaration
  let currentIndex = 0;          // Current character index
  let result = "";              // Accumulates the processed declarations

  /**
   * Processes the current declaration substring, applies the callback, and appends the result if valid.
   */
  function processDeclaration() {
    if (!insideParentheses) {
      // Extract and trim the current declaration substring
      const rawDeclaration = Wt.trim(trimmedDeclarations.slice(declarationStart, currentIndex));
      const colonIndex = rawDeclaration.indexOf(":");
      if (colonIndex !== -1) {
        // Split into property and value, trimming both
        const property = Wt.trim(rawDeclaration.slice(0, colonIndex));
        const value = Wt.trim(rawDeclaration.slice(colonIndex + 1));
        if (property) {
          // Invoke the callback; if isBlobOrFileLikeObject returns a string, append isBlobOrFileLikeObject
          const transformed = transformCallback(declarationStart, result.length, property, value, rawDeclaration);
          if (transformed) {
            result += transformed + "; ";
          }
        }
      }
    }
    // Move start index to the next character after the current delimiter
    declarationStart = currentIndex + 1;
  }

  while (currentIndex < totalLength) {
    const currentChar = trimmedDeclarations[currentIndex];
    // Handle block comments (/* ... */)
    if (currentChar === "/" && trimmedDeclarations[currentIndex + 1] === "*") {
      const commentEnd = trimmedDeclarations.indexOf("*/", currentIndex + 2);
      if (commentEnd === -1) {
        // Unclosed comment: stop parsing
        break;
      }
      // Skip past the comment
      currentIndex = commentEnd + 1;
      declarationStart = currentIndex + 1;
      insideParentheses = false;
    } else if (currentChar === "(") {
      insideParentheses = true;
    } else if (currentChar === ")") {
      insideParentheses = false;
    } else if (currentChar === ";") {
      // Only process if not inside parentheses
      if (!insideParentheses) {
        processDeclaration();
      }
      // If inside parentheses, ignore semicolons
    } else if (currentChar === "\n") {
      // Newline can also delimit declarations
      processDeclaration();
    }
    currentIndex++;
  }
  // Trim and return the final result
  return Wt.trim(result);
}

module.exports = parseAndTransformCssDeclarations;