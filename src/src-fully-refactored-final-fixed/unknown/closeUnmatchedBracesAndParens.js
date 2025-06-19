/**
 * Ensures that all opening braces ('{') and brackets ('[') in the token array have matching closing tokens.
 * If there are unmatched opening braces or brackets, appends the corresponding closing tokens to the array.
 *
 * @param {Array<{type: string, value: string}>} tokens - The array of token objects to check and fix.
 * @returns {Array<{type: string, value: string}>} The updated array of tokens with unmatched braces/brackets closed.
 */
function closeUnmatchedBracesAndParens(tokens) {
  // Stack to keep track of expected closing tokens
  const expectedClosings = [];

  tokens.forEach(token => {
    if (token.type === "brace") {
      if (token.value === "{") {
        // Opening brace: expect a closing '}'
        expectedClosings.push("}");
      } else {
        // Closing brace: remove the last expected '}'
        const lastIndex = expectedClosings.lastIndexOf("}");
        if (lastIndex !== -1) {
          expectedClosings.splice(lastIndex, 1);
        }
      }
    }
    if (token.type === "paren") {
      if (token.value === "[") {
        // Opening bracket: expect a closing ']'
        expectedClosings.push("]");
      } else {
        // Closing bracket: remove the last expected ']'
        const lastIndex = expectedClosings.lastIndexOf("]");
        if (lastIndex !== -1) {
          expectedClosings.splice(lastIndex, 1);
        }
      }
    }
  });

  // If there are any unmatched opening tokens, append the corresponding closing tokens
  if (expectedClosings.length > 0) {
    expectedClosings.reverse().forEach(closing => {
      if (closing === "}") {
        tokens.push({ type: "brace", value: "}" });
      } else if (closing === "]") {
        tokens.push({ type: "paren", value: "]" });
      }
    });
  }

  return tokens;
}

module.exports = closeUnmatchedBracesAndParens;
