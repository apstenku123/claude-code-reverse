/**
 * Parses a string input into an array of pattern tokens, handling globs, quoted strings, escaped characters, and comments.
 *
 * @param {string} input - The string to parse into tokens.
 * @param {Object} [variables] - Optional object containing variable substitutions.
 * @param {Object} [options] - Optional parsing options (e.g., escape character).
 * @returns {Array} Array of parsed tokens, each being a string, an object representing a glob, an operator, or a comment.
 */
function parsePatternTokens(input, variables = {}, options = {}) {
  // Set escape character, default to '\'
  const escapeChar = options.escape || "\\";

  // Build regex pattern for tokenizing
  // h4A, u4A, wg2, Eg2, g4A, Ug2, getAllRegexMatches, formatValueWithPrefix, d4A, m4A, HE1 are assumed to be defined in the module scope
  const quotedChars = "['\"" + h4A + "]";
  const tokenPattern = "(\\" + escapeChar + quotedChars + "|[^\\s'\"" + h4A + "])+";
  const tokenizerRegex = new RegExp([
    "(" + u4A + ")",
    "(" + tokenPattern + "|" + wg2 + "|" + Eg2 + ")+"
  ].join("|"), "g");

  // Tokenize the input string
  const tokenMatches = getAllRegexMatches(input, tokenizerRegex);
  if (tokenMatches.length === 0) return [];

  let foundComment = false;

  return tokenMatches
    .map(function (tokenMatch) {
      const token = tokenMatch[0];
      if (!token || foundComment) return;

      // Operator token
      if (g4A.test(token)) {
        return { op: token };
      }

      let inQuote = false;
      let escapeNext = false;
      let parsedToken = "";
      let isGlob = false;
      let charIndex;

      /**
       * Handles variable substitution or special expansion in the token.
       * Advances charIndex as needed.
       * @returns {string}
       */
      function parseExpansion() {
        charIndex += 1;
        let endIndex, expansion, nextChar = token.charAt(charIndex);
        if (nextChar === "{") {
          charIndex += 1;
          if (token.charAt(charIndex) === "}") {
            throw new Error("Bad substitution: " + token.slice(charIndex - 2, charIndex + 1));
          }
          endIndex = token.indexOf("}", charIndex);
          if (endIndex < 0) {
            throw new Error("Bad substitution: " + token.slice(charIndex));
          }
          expansion = token.slice(charIndex, endIndex);
          charIndex = endIndex;
        } else if (/[*@#?$!_-]/.test(nextChar)) {
          expansion = nextChar;
          charIndex += 1;
        } else {
          // Parse until a non-word character
          const remainder = token.slice(charIndex);
          const match = remainder.match(/[^\w\d_]/);
          if (!match) {
            expansion = remainder;
            charIndex = token.length;
          } else {
            expansion = remainder.slice(0, match.index);
            charIndex += match.index - 1;
          }
        }
        return formatValueWithPrefix(variables, "", expansion);
      }

      for (charIndex = 0; charIndex < token.length; charIndex++) {
        let currentChar = token.charAt(charIndex);

        // Detect glob pattern
        if (!inQuote && (currentChar === "*" || currentChar === "?")) {
          isGlob = true;
        }

        if (escapeNext) {
          parsedToken += currentChar;
          escapeNext = false;
        } else if (inQuote) {
          if (currentChar === inQuote) {
            inQuote = false;
          } else if (inQuote === m4A) {
            // Inside a specific quote type, just append
            parsedToken += currentChar;
          } else if (currentChar === escapeChar) {
            // Handle escaped character inside quotes
            charIndex += 1;
            let next = token.charAt(charIndex);
            if (next === d4A || next === escapeChar || next === HE1) {
              parsedToken += next;
            } else {
              parsedToken += escapeChar + next;
            }
          } else if (currentChar === HE1) {
            // Handle expansion inside quotes
            parsedToken += parseExpansion();
          } else {
            parsedToken += currentChar;
          }
        } else if (currentChar === d4A || currentChar === m4A) {
          // Entering a quote
          inQuote = currentChar;
        } else if (g4A.test(currentChar)) {
          // Operator in the middle of a token
          return { op: token };
        } else if (Ug2.test(currentChar)) {
          // Start of a comment
          foundComment = true;
          const commentObj = { comment: input.slice(tokenMatch.index + charIndex + 1) };
          if (parsedToken.length) return [parsedToken, commentObj];
          return [commentObj];
        } else if (currentChar === escapeChar) {
          escapeNext = true;
        } else if (currentChar === HE1) {
          parsedToken += parseExpansion();
        } else {
          parsedToken += currentChar;
        }
      }

      if (isGlob) {
        return {
          op: "glob",
          pattern: parsedToken
        };
      }
      return parsedToken;
    })
    .reduce(function (result, token) {
      // Flatten arrays and skip undefined
      if (typeof token === "undefined") return result;
      return result.concat(token);
    }, []);
}

module.exports = parsePatternTokens;
