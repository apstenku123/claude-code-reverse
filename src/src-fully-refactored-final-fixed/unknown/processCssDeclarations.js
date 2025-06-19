/**
 * Processes a CSS declaration string, applies a callback to each property-value pair, and returns the transformed CSS string.
 * Handles comments, parentheses, and multiline declarations.
 *
 * @param {string} cssString - The CSS declaration string to process (e.g., 'color: red; font-size: 12px;').
 * @param {function} propertyCallback - Callback function invoked for each property-value pair. Receives (startIndex, currentOutputLength, property, value, fullDeclaration).
 * @returns {string} The processed and transformed CSS declaration string.
 */
function processCssDeclarations(cssString, propertyCallback) {
  // Remove trailing whitespace and ensure the string ends with a semicolon
  cssString = Wt.trimRight(cssString);
  if (cssString[cssString.length - 1] !== ";") {
    cssString += ";";
  }

  const cssLength = cssString.length;
  let insideParentheses = false;
  let declarationStart = 0;
  let currentIndex = 0;
  let output = "";

  /**
   * Processes the current declaration between declarationStart and currentIndex.
   * Trims, splits into property and value, and applies the callback.
   */
  function processDeclaration() {
    if (!insideParentheses) {
      const declaration = Wt.trim(cssString.slice(declarationStart, currentIndex));
      const colonIndex = declaration.indexOf(":");
      if (colonIndex !== -1) {
        const property = Wt.trim(declaration.slice(0, colonIndex));
        const value = Wt.trim(declaration.slice(colonIndex + 1));
        if (property) {
          const transformed = propertyCallback(declarationStart, output.length, property, value, declaration);
          if (transformed) {
            output += transformed + "; ";
          }
        }
      }
    }
    declarationStart = currentIndex + 1;
  }

  while (currentIndex < cssLength) {
    const currentChar = cssString[currentIndex];
    // Handle CSS comments
    if (currentChar === "/" && cssString[currentIndex + 1] === "*") {
      const commentEnd = cssString.indexOf("*/", currentIndex + 2);
      if (commentEnd === -1) {
        break; // Unclosed comment: stop processing
      }
      currentIndex = commentEnd + 1;
      declarationStart = currentIndex + 1;
      insideParentheses = false;
    } else if (currentChar === "(") {
      insideParentheses = true;
    } else if (currentChar === ")") {
      insideParentheses = false;
    } else if (currentChar === ";") {
      if (!insideParentheses) {
        processDeclaration();
      }
      // If inside parentheses, ignore semicolons
    } else if (currentChar === "\n") {
      processDeclaration();
    }
    currentIndex++;
  }

  return Wt.trim(output);
}

module.exports = processCssDeclarations;