/**
 * Tokenizes a JSON-like string into an array of token objects.
 *
 * This function scans the input string character by character and produces an array of tokens
 * representing braces, brackets, separators, delimiters, strings, numbers, boolean/null literals,
 * and skips whitespace and escape characters. It does not perform full JSON parsing, but rather
 * breaks the input into meaningful syntactic units for further processing.
 *
 * @param {string} input - The JSON-like string to tokenize.
 * @returns {Array<Object>} Array of token objects with 'type' and 'value' properties.
 */
function tokenizeJsonLikeString(input) {
  let position = 0;
  const tokens = [];

  while (position < input.length) {
    let currentChar = input[position];

    // Skip escape character (backslash)
    if (currentChar === "\\") {
      position++;
      continue;
    }

    // Handle braces
    if (currentChar === "{") {
      tokens.push({ type: "brace", value: "{" });
      position++;
      continue;
    }
    if (currentChar === "}") {
      tokens.push({ type: "brace", value: "}" });
      position++;
      continue;
    }

    // Handle brackets (called 'paren' in tokens)
    if (currentChar === "[") {
      tokens.push({ type: "paren", value: "[" });
      position++;
      continue;
    }
    if (currentChar === "]") {
      tokens.push({ type: "paren", value: "]" });
      position++;
      continue;
    }

    // Handle colon separator
    if (currentChar === ":") {
      tokens.push({ type: "separator", value: ":" });
      position++;
      continue;
    }

    // Handle comma delimiter
    if (currentChar === ",") {
      tokens.push({ type: "delimiter", value: "," });
      position++;
      continue;
    }

    // Handle string literals
    if (currentChar === '"') {
      let stringValue = "";
      let isUnterminated = false;
      position++; // Skip opening quote
      currentChar = input[position];
      while (currentChar !== '"') {
        if (position === input.length) {
          // Unterminated string
          isUnterminated = true;
          break;
        }
        if (currentChar === "\\") {
          // Handle escaped character
          position++;
          if (position === input.length) {
            isUnterminated = true;
            break;
          }
          stringValue += "\\" + input[position];
          position++;
          currentChar = input[position];
        } else {
          stringValue += currentChar;
          position++;
          currentChar = input[position];
        }
      }
      position++; // Skip closing quote
      if (!isUnterminated) {
        tokens.push({ type: "string", value: stringValue });
      }
      continue;
    }

    // Skip whitespace
    if (currentChar && /\s/.test(currentChar)) {
      position++;
      continue;
    }

    // Handle numbers (including negative and decimal numbers)
    const digitRegex = /[0-9]/;
    if (
      (currentChar && digitRegex.test(currentChar)) ||
      currentChar === "-" ||
      currentChar === "."
    ) {
      let numberValue = "";
      if (currentChar === "-") {
        numberValue += currentChar;
        position++;
        currentChar = input[position];
      }
      while (
        (currentChar && digitRegex.test(currentChar)) ||
        currentChar === "."
      ) {
        numberValue += currentChar;
        position++;
        currentChar = input[position];
      }
      tokens.push({ type: "number", value: numberValue });
      continue;
    }

    // Handle boolean and null literals (true, false, null)
    const letterRegex = /[a-z]/i;
    if (currentChar && letterRegex.test(currentChar)) {
      let literalValue = "";
      while (currentChar && letterRegex.test(currentChar)) {
        if (position === input.length) break;
        literalValue += currentChar;
        position++;
        currentChar = input[position];
      }
      if (
        literalValue === "true" ||
        literalValue === "false" ||
        literalValue === "null"
      ) {
        tokens.push({ type: "name", value: literalValue });
      } else {
        // Skip unknown identifiers
        position++;
        continue;
      }
      continue;
    }

    // Skip any other character
    position++;
  }

  return tokens;
}

module.exports = tokenizeJsonLikeString;
