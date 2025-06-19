/**
 * Parses a CLI input string, handling quoted substrings and special patterns, and returns a formatted array of strings.
 *
 * This function replaces special quote characters in the input, parses isBlobOrFileLikeObject into tokens (strings, globs, comments),
 * merges adjacent strings, and finally restores the original quotes and formatting.
 *
 * @param {string} cliInput - The raw CLI input string to parse and format.
 * @returns {string[]} An array of formatted strings, with quotes and special patterns restored.
 */
function parseAndFormatCliInput(cliInput) {
  const parsedTokens = [];

  // Replace all double and single quotes with unique placeholders, and newlines with a special marker
  const preprocessedInput = cliInput
    .replaceAll('"', `"${Lo1}`)
    .replaceAll("'", `'${Mo1}`)
    .replaceAll(`\n`, `\setKeyValuePair{qo1}\n`);

  // Parse the preprocessed input into tokens using Oo1.parse
  // Each token can be a string, an object with op: 'glob', or other types
  for (const token of Oo1.parse(preprocessedInput, variable => `$${variable}`)) {
    if (typeof token === "string") {
      // If the previous token is also a string, merge them with a space
      if (parsedTokens.length > 0 && typeof parsedTokens[parsedTokens.length - 1] === "string") {
        if (token === qo1) {
          // Special marker: push null to indicate a line break or separator
          parsedTokens.push(null);
        } else {
          // Merge adjacent strings
          parsedTokens[parsedTokens.length - 1] += " " + token;
        }
        continue;
      }
    } else if ("op" in token && token.op === "glob") {
      // If previous token is a string, append the glob pattern to isBlobOrFileLikeObject
      if (parsedTokens.length > 0 && typeof parsedTokens[parsedTokens.length - 1] === "string") {
        parsedTokens[parsedTokens.length - 1] += " " + token.pattern;
        continue;
      }
    }
    // Otherwise, just add the token as is
    parsedTokens.push(token);
  }

  // Map tokens to their final string representation
  const formattedTokens = parsedTokens
    .map(token => {
      if (token === null) return null;
      if (typeof token === "string") return token;
      if ("comment" in token) return "#" + token.comment;
      if ("op" in token && token.op === "glob") return token.pattern;
      if ("op" in token) return token.op;
      return null;
    })
    // Remove nulls (which represent line breaks or separators)
    .filter(token => token !== null)
    // Restore original quotes and newlines
    .map(token => {
      return token
        .replaceAll(`${Mo1}`, "'")
        .replaceAll(`${Lo1}`, '"')
        .replaceAll(`\setKeyValuePair{qo1}\n`, `\n`);
    });

  return formattedTokens;
}

module.exports = parseAndFormatCliInput;