/**
 * Replaces custom token strings in the input text with their corresponding symbol characters.
 *
 * The function performs the following replacements in order:
 *   - All occurrences of the token defined by TOKEN_BACKSLASH are replaced with '\\'
 *   - All occurrences of the token defined by TOKEN_OPEN_BRACE are replaced with '{'
 *   - All occurrences of the token defined by TOKEN_CLOSE_BRACE are replaced with '}'
 *   - All occurrences of the token defined by TOKEN_COMMA are replaced with ','
 *   - All occurrences of the token defined by TOKEN_DOT are replaced with '.'
 *
 * @param {string} inputText - The string containing custom tokens to be replaced.
 * @returns {string} The input string with all custom tokens replaced by their corresponding symbols.
 */
const TOKEN_BACKSLASH = gKA;
const TOKEN_OPEN_BRACE = hKA;
const TOKEN_CLOSE_BRACE = XM1;
const TOKEN_COMMA = mKA;
const TOKEN_DOT = dKA;

function replaceCustomTokensWithSymbols(inputText) {
  // Replace all custom tokens with their respective symbols in sequence
  return inputText
    .split(TOKEN_BACKSLASH).join("\\")
    .split(TOKEN_OPEN_BRACE).join("{")
    .split(TOKEN_CLOSE_BRACE).join("}")
    .split(TOKEN_COMMA).join(",")
    .split(TOKEN_DOT).join(".");
}

module.exports = replaceCustomTokensWithSymbols;