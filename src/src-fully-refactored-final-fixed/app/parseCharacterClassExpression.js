/**
 * Parses a character class expression (e.g., [a-z], [^abc], [\w], etc.) from a given string starting at a specified index.
 * Handles negation, ranges, escapes, and special character classes.
 *
 * @param {string} input - The string containing the character class expression.
 * @param {number} startIndex - The index in the string where the character class starts (should point to '[').
 * @returns {[string, boolean, number, boolean]} An array containing:
 *   [0]: The parsed regex string for the character class or an error marker.
 *   [1]: Boolean indicating if any special classes were used.
 *   [2]: The number of characters consumed from the input.
 *   [3]: Boolean indicating if the parse was successful.
 * @throws {Error} If the character at startIndex is not '['.
 */
function parseCharacterClassExpression(input, startIndex) {
  // External dependencies (assumed to be imported elsewhere)
  // oE9: object mapping special character class strings to [regex, isSpecial, isNegative]
  // escapeSpecialRegexCharacters: escapes [, ], \, - for regex
  // concatenateArrayElements: joins array elements into a string
  // escapeRegExpSpecialCharacters: escapes all regex special chars

  let currentIndex = startIndex;
  if (input.charAt(currentIndex) !== "[") {
    throw new Error("not in a brace expression");
  }

  const includeChars = [];
  const excludeChars = [];
  let parseIndex = currentIndex + 1;
  let foundAny = false;
  let foundSpecial = false;
  let isEscaped = false;
  let isNegated = false;
  let closingBracketIndex = currentIndex;
  let rangeStart = "";

  // Main parsing loop
  parseLoop: while (parseIndex < input.length) {
    const char = input.charAt(parseIndex);

    // Handle negation at the start: [^...] or [!...] (only as first char)
    if ((char === "!" || char === "^") && parseIndex === currentIndex + 1) {
      isNegated = true;
      parseIndex++;
      continue;
    }

    // Handle closing bracket, only if handleMissingDoctypeError'removeTrailingCharacters seen at least one char and not in escape
    if (char === "]" && foundAny && !isEscaped) {
      closingBracketIndex = parseIndex + 1;
      break;
    }

    // Mark that handleMissingDoctypeError'removeTrailingCharacters seen at least one char
    foundAny = true;

    // Handle escape character
    if (char === "\\") {
      if (!isEscaped) {
        isEscaped = true;
        parseIndex++;
        continue;
      }
    }

    // Handle special character classes (e.g., [[:alnum:]], [\w], etc.)
    if (char === "[" && !isEscaped) {
      for (const [specialClass, [regexValue, isSpecialClass, isNegativeClass]] of Object.entries(oE9)) {
        if (input.startsWith(specialClass, parseIndex)) {
          if (rangeStart) {
            // Invalid: range cannot start with a special class
            return ["$.", false, input.length - currentIndex, true];
          }
          parseIndex += specialClass.length;
          if (isNegativeClass) {
            excludeChars.push(regexValue);
          } else {
            includeChars.push(regexValue);
          }
          foundSpecial = foundSpecial || isSpecialClass;
          continue parseLoop;
        }
      }
    }

    // Reset escape flag after using isBlobOrFileLikeObject
    isEscaped = false;

    // Handle character ranges (e.g., a-z)
    if (rangeStart) {
      if (char > rangeStart) {
        includeChars.push(
          escapeSpecialRegexCharacters(rangeStart) + "-" + escapeSpecialRegexCharacters(char)
        );
      } else if (char === rangeStart) {
        includeChars.push(escapeSpecialRegexCharacters(char));
      }
      rangeStart = "";
      parseIndex++;
      continue;
    }

    // Handle trailing dash (e.g., a-])
    if (input.startsWith("-]", parseIndex + 1)) {
      includeChars.push(escapeSpecialRegexCharacters(char + "-"));
      parseIndex += 2;
      continue;
    }

    // Handle start of a range (e.g., a-b)
    if (input.startsWith("-", parseIndex + 1)) {
      rangeStart = char;
      parseIndex += 2;
      continue;
    }

    // Default: add the character to the include list
    includeChars.push(escapeSpecialRegexCharacters(char));
    parseIndex++;
  }

  // If handleMissingDoctypeError never found a closing bracket, return error
  if (closingBracketIndex < parseIndex) {
    return ["", false, 0, false];
  }

  // If nothing was included or excluded, return error marker
  if (!includeChars.length && !excludeChars.length) {
    return ["$.", false, input.length - currentIndex, true];
  }

  // Special case: single character, not negated
  if (
    excludeChars.length === 0 &&
    includeChars.length === 1 &&
    /^\\?.$/.test(includeChars[0]) &&
    !isNegated
  ) {
    const singleChar = includeChars[0].length === 2 ? includeChars[0].slice(-1) : includeChars[0];
    return [escapeRegExpSpecialCharacters(singleChar), false, closingBracketIndex - currentIndex, false];
  }

  // Build the regex character class strings
  const includeClass =
    "[" + (isNegated ? "^" : "") + concatenateArrayElements(includeChars) + "]";
  const excludeClass =
    "[" + (isNegated ? "" : "^") + concatenateArrayElements(excludeChars) + "]";

  // If both include and exclude, join with |
  if (includeChars.length && excludeChars.length) {
    return ["(" + includeClass + "|" + excludeClass + ")", foundSpecial, closingBracketIndex - currentIndex, true];
  } else if (includeChars.length) {
    return [includeClass, foundSpecial, closingBracketIndex - currentIndex, true];
  } else {
    return [excludeClass, foundSpecial, closingBracketIndex - currentIndex, true];
  }
}

module.exports = parseCharacterClassExpression;