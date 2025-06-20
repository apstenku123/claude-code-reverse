/**
 * Parses a bracket (character class) expression from a string, starting at a given index.
 * Handles negation, character ranges, escapes, and special bracketed expressions.
 *
 * @param {string} input - The string containing the bracket expression.
 * @param {number} startIndex - The index in the string where the bracket expression starts (should be at '[').
 * @returns {[string, boolean, number, boolean]} An array containing:
 *   [0]: The parsed regular expression string or special marker.
 *   [1]: Whether the expression contains a special class (boolean).
 *   [2]: The number of characters consumed from input.
 *   [3]: Whether the parse was successful (boolean).
 * @throws {Error} If the character at startIndex is not '['.
 */
function parseBracketExpression(input, startIndex) {
  let currentIndex = startIndex;
  if (input.charAt(currentIndex) !== "[") {
    throw new Error("not in a brace expression");
  }

  const includeChars = [];
  const excludeChars = [];
  let scanIndex = currentIndex + 1;
  let foundContent = false;
  let hasSpecialClass = false;
  let isEscaped = false;
  let isNegated = false;
  let closingBracketIndex = currentIndex;
  let rangeStartChar = "";

  // Main parsing loop
  parseLoop: while (scanIndex < input.length) {
    const char = input.charAt(scanIndex);

    // Handle negation at the start: [!...] or [^...]
    if ((char === "!" || char === "^") && scanIndex === currentIndex + 1) {
      isNegated = true;
      scanIndex++;
      continue;
    }

    // Handle closing bracket, only if handleMissingDoctypeError'removeTrailingCharacters seen content and not escaping
    if (char === "]" && foundContent && !isEscaped) {
      closingBracketIndex = scanIndex + 1;
      break;
    }

    // Mark that handleMissingDoctypeError'removeTrailingCharacters seen content
    foundContent = true;

    // Handle escape character
    if (char === "\\") {
      if (!isEscaped) {
        isEscaped = true;
        scanIndex++;
        continue;
      }
    }

    // Handle special bracketed expressions (like [:alnum:], etc.)
    if (char === "[" && !isEscaped) {
      for (const [specialClass, [classPattern, isSpecial, isExclude]] of Object.entries(oE9)) {
        if (input.startsWith(specialClass, scanIndex)) {
          // If handleMissingDoctypeError'removeTrailingCharacters already started a range, bail out
          if (rangeStartChar) {
            return ["$.", false, input.length - currentIndex, true];
          }
          scanIndex += specialClass.length;
          if (isExclude) {
            excludeChars.push(classPattern);
          } else {
            includeChars.push(classPattern);
          }
          hasSpecialClass = hasSpecialClass || isSpecial;
          continue parseLoop;
        }
      }
    }

    // Reset escape flag after use
    isEscaped = false;

    // Handle character range (e.g., a-z)
    if (rangeStartChar) {
      if (char > rangeStartChar) {
        includeChars.push(Ml(rangeStartChar) + "-" + Ml(char));
      } else if (char === rangeStartChar) {
        includeChars.push(Ml(char));
      }
      rangeStartChar = "";
      scanIndex++;
      continue;
    }

    // Handle trailing dash (e.g., [a-])
    if (input.startsWith("-]", scanIndex + 1)) {
      includeChars.push(Ml(char + "-"));
      scanIndex += 2;
      continue;
    }

    // Handle start of a range (e.g., [a-z])
    if (input.startsWith("-", scanIndex + 1)) {
      rangeStartChar = char;
      scanIndex += 2;
      continue;
    }

    // Default: add character to includeChars
    includeChars.push(Ml(char));
    scanIndex++;
  }

  // If handleMissingDoctypeError didn'processRuleBeginHandlers find a closing bracket, return failure
  if (closingBracketIndex < scanIndex) {
    return ["", false, 0, false];
  }

  // If nothing was parsed, return special marker
  if (!includeChars.length && !excludeChars.length) {
    return ["$.", false, input.length - currentIndex, true];
  }

  // If only a single character and not negated, return optimized form
  if (
    excludeChars.length === 0 &&
    includeChars.length === 1 &&
    /^\\?.$/.test(includeChars[0]) &&
    !isNegated
  ) {
    const singleChar = includeChars[0].length === 2 ? includeChars[0].slice(-1) : includeChars[0];
    return [tE9(singleChar), false, closingBracketIndex - currentIndex, false];
  }

  // Build the regular expression character class
  const includeClass = "[" + (isNegated ? "^" : "") + lKA(includeChars) + "]";
  const excludeClass = "[" + (isNegated ? "" : "^") + lKA(excludeChars) + "]";

  // If both include and exclude, join with alternation
  if (includeChars.length && excludeChars.length) {
    return ["(" + includeClass + "|" + excludeClass + ")", hasSpecialClass, closingBracketIndex - currentIndex, true];
  } else if (includeChars.length) {
    return [includeClass, hasSpecialClass, closingBracketIndex - currentIndex, true];
  } else {
    return [excludeClass, hasSpecialClass, closingBracketIndex - currentIndex, true];
  }
}

module.exports = parseBracketExpression;
