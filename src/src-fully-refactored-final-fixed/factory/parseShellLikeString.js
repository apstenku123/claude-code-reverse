/**
 * Parses a shell-like string into tokens, handling quotes, escapes, globs, and comments.
 *
 * @param {string} inputString - The shell-like string to parse.
 * @param {Object} [variables={}] - An object containing variable substitutions.
 * @param {Object} [options={}] - Options for parsing (e.g., custom escape character).
 * @returns {Array} An array of parsed tokens, objects for globs, or comments.
 */
function parseShellLikeString(inputString, variables = {}, options = {}) {
  // Use custom escape character if provided, default to '\'
  const escapeChar = options.escape || '\\';

  // Build regex patterns for parsing
  // h4A, u4A, wg2, Eg2, g4A, Ug2, getAllRegexMatches, formatValueWithPrefix, d4A, m4A, HE1 are assumed to be defined externally
  const quotedPattern = `['\"${h4A}`;
  const tokenPattern = `([\\${escapeChar}${quotedPattern}]|[^\\s'\"${h4A}])+`;
  const mainPattern = [
    `(${u4A})`,
    `(${tokenPattern}|${wg2}|${Eg2})+`
  ].join('|');
  const mainRegex = new RegExp(mainPattern, 'g');

  // Tokenize the input string
  const tokenMatches = getAllRegexMatches(inputString, mainRegex);
  if (tokenMatches.length === 0) return [];

  let parsingStopped = false;

  return tokenMatches
    .map(function (tokenMatch) {
      const token = tokenMatch[0];
      if (!token || parsingStopped) return;

      // If token is an operator, return as op
      if (g4A.test(token)) {
        return { op: token };
      }

      let inQuote = false;
      let escapeNext = false;
      let parsedValue = '';
      let isGlob = false;
      let charIndex;

      /**
       * Handles variable or parameter substitution inside the token.
       * @returns {string} The substituted value.
       */
      function handleSubstitution() {
        charIndex += 1;
        let endBraceIndex, substitutionName, currentChar = token.charAt(charIndex);
        if (currentChar === '{') {
          // Handle ${VAR} substitution
          charIndex += 1;
          if (token.charAt(charIndex) === '}') {
            throw new Error('Bad substitution: ' + token.slice(charIndex - 2, charIndex + 1));
          }
          endBraceIndex = token.indexOf('}', charIndex);
          if (endBraceIndex < 0) {
            throw new Error('Bad substitution: ' + token.slice(charIndex));
          }
          substitutionName = token.slice(charIndex, endBraceIndex);
          charIndex = endBraceIndex;
        } else if (/[*@#?$!_-]/.test(currentChar)) {
          // Handle $*, $@, etc.
          substitutionName = currentChar;
          charIndex += 1;
        } else {
          // Handle $VAR style
          const remainder = token.slice(charIndex);
          const match = remainder.match(/[^\w\d_]/);
          if (!match) {
            substitutionName = remainder;
            charIndex = token.length;
          } else {
            substitutionName = remainder.slice(0, match.index);
            charIndex += match.index - 1;
          }
        }
        return formatValueWithPrefix(variables, '', substitutionName);
      }

      for (charIndex = 0; charIndex < token.length; charIndex++) {
        let currentChar = token.charAt(charIndex);
        // Detect glob pattern
        if (!inQuote && (currentChar === '*' || currentChar === '?')) {
          isGlob = true;
        }
        if (escapeNext) {
          // Previous character was escape, add this character literally
          parsedValue += currentChar;
          escapeNext = false;
        } else if (inQuote) {
          // Inside a quote
          if (currentChar === inQuote) {
            inQuote = false;
          } else if (inQuote === m4A) {
            // Inside single quote, add literally
            parsedValue += currentChar;
          } else if (currentChar === escapeChar) {
            // Handle escape inside quote
            charIndex += 1;
            currentChar = token.charAt(charIndex);
            if (currentChar === d4A || currentChar === escapeChar || currentChar === HE1) {
              parsedValue += currentChar;
            } else {
              parsedValue += escapeChar + currentChar;
            }
          } else if (currentChar === HE1) {
            // Handle substitution inside quote
            parsedValue += handleSubstitution();
          } else {
            parsedValue += currentChar;
          }
        } else if (currentChar === d4A || currentChar === m4A) {
          // Start of quote
          inQuote = currentChar;
        } else if (g4A.test(currentChar)) {
          // Operator detected, return as op
          return { op: token };
        } else if (Ug2.test(currentChar)) {
          // Comment detected, stop parsing further
          parsingStopped = true;
          const commentObj = { comment: inputString.slice(tokenMatch.index + charIndex + 1) };
          if (parsedValue.length) return [parsedValue, commentObj];
          return [commentObj];
        } else if (currentChar === escapeChar) {
          // Escape next character
          escapeNext = true;
        } else if (currentChar === HE1) {
          // Handle substitution
          parsedValue += handleSubstitution();
        } else {
          // Regular character
          parsedValue += currentChar;
        }
      }
      if (isGlob) {
        return {
          op: 'glob',
          pattern: parsedValue
        };
      }
      return parsedValue;
    })
    .reduce(function (result, token) {
      // Flatten undefined and arrays
      if (typeof token === 'undefined') return result;
      return result.concat(token);
    }, []);
}

module.exports = parseShellLikeString;