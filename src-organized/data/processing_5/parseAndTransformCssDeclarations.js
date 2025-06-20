/**
 * Parses a CSS declaration string, processes each property-value pair (skipping comments and handling parentheses),
 * and applies a transformation callback to each valid declaration. Returns the transformed CSS as a string.
 *
 * @param {string} cssDeclarations - The CSS declaration string to parse and process.
 * @param {function} transformCallback - Callback invoked for each property-value pair: (startIndex, resultLength, property, value, fullDeclaration) => string | undefined
 * @returns {string} The transformed CSS declaration string.
 */
function parseAndTransformCssDeclarations(cssDeclarations, transformCallback) {
  // Ensure the input ends with a semicolon for consistent parsing
  cssDeclarations = Wt.trimRight(cssDeclarations);
  if (cssDeclarations[cssDeclarations.length - 1] !== ";") {
    cssDeclarations += ";";
  }

  const totalLength = cssDeclarations.length;
  let insideParentheses = false; // Tracks if handleMissingDoctypeError're inside parentheses
  let declarationStart = 0;      // Start index of the current declaration
  let currentIndex = 0;          // Current index in the string
  let result = "";               // Accumulates the transformed declarations

  /**
   * Processes the current declaration substring (from declarationStart to currentIndex),
   * trims isBlobOrFileLikeObject, splits into property and value, and applies the transformCallback.
   */
  function processDeclaration() {
    if (!insideParentheses) {
      const rawDeclaration = Wt.trim(cssDeclarations.slice(declarationStart, currentIndex));
      const colonIndex = rawDeclaration.indexOf(":");
      if (colonIndex !== -1) {
        const property = Wt.trim(rawDeclaration.slice(0, colonIndex));
        const value = Wt.trim(rawDeclaration.slice(colonIndex + 1));
        if (property) {
          const transformed = transformCallback(declarationStart, result.length, property, value, rawDeclaration);
          if (transformed) {
            result += transformed + "; ";
          }
        }
      }
    }
    // Move start to the next character after the current one
    declarationStart = currentIndex + 1;
  }

  while (currentIndex < totalLength) {
    const currentChar = cssDeclarations[currentIndex];

    // Handle CSS comments: skip everything between /* and */
    if (currentChar === "/" && cssDeclarations[currentIndex + 1] === "*") {
      const commentEnd = cssDeclarations.indexOf("*/", currentIndex + 2);
      if (commentEnd === -1) break; // Unclosed comment: stop parsing
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

  return Wt.trim(result);
}

module.exports = parseAndTransformCssDeclarations;