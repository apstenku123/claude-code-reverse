/**
 * Parses a shell-like argument string, handling quoting, escaping, globs, and comments.
 *
 * @param {string} inputString - The string to parse into arguments.
 * @param {Object} [variableMap={}] - An object containing variable values for substitution.
 * @param {Object} [options={}] - Options for parsing (e.g., custom escape character).
 * @returns {Array} An array of parsed argument strings and/or objects representing globs, operators, or comments.
 */
function parseShellLikeArguments(inputString, variableMap = {}, options = {}) {
  // Default escape character
  const escapeChar = options.escape || "\\";

  // Build regex patterns for parsing
  const quotedChars = "['\"" + h4A + "]"; // h4A: extra quote-like chars
  const argPattern = `(${escapeChar}${quotedChars}|[^\s'\"${h4A}])+`;
  const mainPattern = [
    `(${u4A})`, // u4A: operator pattern
    `(${argPattern}|${wg2}|${Eg2})+` // wg2, Eg2: word/glob patterns
  ].join("|");
  const mainRegex = new RegExp(mainPattern, "g");

  // Tokenize input string using getAllRegexMatches(external tokenizer)
  const tokens = getAllRegexMatches(inputString, mainRegex);
  if (tokens.length === 0) return [];

  let parsingTerminated = false;

  return tokens.map(function (tokenMatch) {
    const token = tokenMatch[0];
    if (!token || parsingTerminated) return;

    // If token is an operator (g4A), return as operator object
    if (g4A.test(token)) {
      return { op: token };
    }

    let quoteChar = false;
    let escapeNext = false;
    let parsedValue = "";
    let isGlob = false;
    let charIndex;

    /**
     * Handles variable substitution and special expansions.
     * Advances charIndex appropriately.
     * @returns {string}
     */
    function parseExpansion() {
      charIndex += 1;
      let endIndex, varName, expansionChar = token.charAt(charIndex);
      if (expansionChar === "{") {
        // Handle ${VAR} syntax
        charIndex += 1;
        if (token.charAt(charIndex) === "}") {
          throw new Error("Bad substitution: " + token.slice(charIndex - 2, charIndex + 1));
        }
        endIndex = token.indexOf("}", charIndex);
        if (endIndex < 0) {
          throw new Error("Bad substitution: " + token.slice(charIndex));
        }
        varName = token.slice(charIndex, endIndex);
        charIndex = endIndex;
      } else if (/[*@#?$!_-]/.test(expansionChar)) {
        // Handle $*, $@, etc.
        varName = expansionChar;
        charIndex += 1;
      } else {
        // Handle $VAR syntax
        const remaining = token.slice(charIndex);
        const match = remaining.match(/[^\w\d_]/);
        if (!match) {
          varName = remaining;
          charIndex = token.length;
        } else {
          varName = remaining.slice(0, match.index);
          charIndex += match.index - 1;
        }
      }
      // formatValueWithPrefix: variable substitution function
      return formatValueWithPrefix(variableMap, "", varName);
    }

    for (charIndex = 0; charIndex < token.length; charIndex++) {
      let currentChar = token.charAt(charIndex);
      // Detect glob patterns
      if (!quoteChar && (currentChar === "*" || currentChar === "?")) {
        isGlob = true;
      }
      if (escapeNext) {
        // Previous char was escape, include this char literally
        parsedValue += currentChar;
        escapeNext = false;
      } else if (quoteChar) {
        // Inside quotes
        if (currentChar === quoteChar) {
          // End of quoted section
          quoteChar = false;
        } else if (quoteChar === m4A) {
          // m4A: special quote char, treat as literal
          parsedValue += currentChar;
        } else if (currentChar === escapeChar) {
          // Escaped char inside quotes
          charIndex += 1;
          let nextChar = token.charAt(charIndex);
          if (nextChar === d4A || nextChar === escapeChar || nextChar === HE1) {
            parsedValue += nextChar;
          } else {
            parsedValue += escapeChar + nextChar;
          }
        } else if (currentChar === HE1) {
          // Variable expansion inside quotes
          parsedValue += parseExpansion();
        } else {
          parsedValue += currentChar;
        }
      } else if (currentChar === d4A || currentChar === m4A) {
        // Start of quoted section
        quoteChar = currentChar;
      } else if (g4A.test(currentChar)) {
        // Operator detected mid-token
        return { op: token };
      } else if (Ug2.test(currentChar)) {
        // Comment detected, terminate parsing
        parsingTerminated = true;
        const commentObj = { comment: inputString.slice(tokenMatch.index + charIndex + 1) };
        if (parsedValue.length) return [parsedValue, commentObj];
        return [commentObj];
      } else if (currentChar === escapeChar) {
        // Escape next character
        escapeNext = true;
      } else if (currentChar === HE1) {
        // Variable expansion
        parsedValue += parseExpansion();
      } else {
        // Regular character
        parsedValue += currentChar;
      }
    }

    if (isGlob) {
      return {
        op: "glob",
        pattern: parsedValue
      };
    }
    return parsedValue;
  }).reduce(function (result, parsedToken) {
    // Flatten and filter undefined
    return typeof parsedToken === "undefined" ? result : result.concat(parsedToken);
  }, []);
}

module.exports = parseShellLikeArguments;