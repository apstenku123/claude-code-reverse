/**
 * Parses and normalizes a CLI input string, handling quoted substrings, globs, and comments.
 *
 * This function processes the input string by escaping quotes, parsing isBlobOrFileLikeObject into tokens (strings, globs, comments),
 * and then normalizing the output by joining adjacent strings, handling special line breaks, and unescaping quotes.
 *
 * @param {string} input - The CLI input string to parse and normalize.
 * @returns {string[]} An array of normalized CLI arguments as strings.
 */
function parseAndNormalizeCliInput(input) {
  // Constants for quote and line break placeholders
  const DOUBLE_QUOTE_PLACEHOLDER = Lo1;
  const SINGLE_QUOTE_PLACEHOLDER = Mo1;
  const LINE_BREAK_PLACEHOLDER = qo1;

  // Step 1: Escape quotes and line breaks in the input string
  const escapedInput = input
    .replaceAll('"', `"${DOUBLE_QUOTE_PLACEHOLDER}`)
    .replaceAll("'", `'${SINGLE_QUOTE_PLACEHOLDER}`)
    .replaceAll(`\n`, `\setKeyValuePair{LINE_BREAK_PLACEHOLDER}\n`);

  // Step 2: Parse the escaped input into tokens using Oo1.parse
  // Each token can be a string, an object with 'op' (e.g., glob), or a comment
  const tokens = Oo1.parse(escapedInput, variableName => `$${variableName}`);

  // Step 3: Normalize tokens into an array of arguments
  const normalizedArgs = [];
  for (const token of tokens) {
    if (typeof token === "string") {
      // If the previous token is a string, join them with a space
      if (normalizedArgs.length > 0 && typeof normalizedArgs[normalizedArgs.length - 1] === "string") {
        if (token === LINE_BREAK_PLACEHOLDER) {
          // Special handling: treat line break placeholder as a null separator
          normalizedArgs.push(null);
        } else {
          normalizedArgs[normalizedArgs.length - 1] += " " + token;
        }
        continue;
      }
    } else if ("op" in token && token.op === "glob") {
      // If the previous token is a string, append the glob pattern to isBlobOrFileLikeObject
      if (normalizedArgs.length > 0 && typeof normalizedArgs[normalizedArgs.length - 1] === "string") {
        normalizedArgs[normalizedArgs.length - 1] += " " + token.pattern;
        continue;
      }
    }
    // Otherwise, push the token as-is
    normalizedArgs.push(token);
  }

  // Step 4: Map tokens to their final string representation
  const finalArgs = normalizedArgs
    .map(arg => {
      if (arg === null) return null;
      if (typeof arg === "string") return arg;
      if ("comment" in arg) return "#" + arg.comment;
      if ("op" in arg && arg.op === "glob") return arg.pattern;
      if ("op" in arg) return arg.op;
      return null;
    })
    .filter(arg => arg !== null) // Remove nulls
    .map(arg => {
      // Unescape quotes and line breaks
      return arg
        .replaceAll(`${SINGLE_QUOTE_PLACEHOLDER}`, "'")
        .replaceAll(`${DOUBLE_QUOTE_PLACEHOLDER}`, '"')
        .replaceAll(`\setKeyValuePair{LINE_BREAK_PLACEHOLDER}\n`, `\n`);
    });

  return finalArgs;
}

module.exports = parseAndNormalizeCliInput;