/**
 * Processes a lexeme match during syntax highlighting or tokenization.
 * Handles match types such as 'begin', 'end', and 'illegal', manages state, and throws errors for invalid or zero-width matches.
 *
 * @param {string} matchedText - The text that was matched by the lexer or parser.
 * @param {Object} matchInfo - Information about the match, including type, index, and matched groups.
 * @returns {number} The length of the matched text, or 0/1 depending on the match type and state.
 * @throws {Error} Throws for illegal lexemes or zero-width matches when not allowed.
 */
function processLexemeMatch(matchedText, matchInfo) {
  // Extract the matched group (usually the full match or first capture group)
  const matchedGroup = matchInfo && matchInfo[0];

  // Update the global offset/state with the matched text
  d0 += matchedText;

  // If there is no matched group, trigger a reset and return 0
  if (matchedGroup == null) {
    A1(); // Reset or handle end-of-input
    return 0;
  }

  // Handle zero-width match at the end of a rule
  if (
    currentRule.type === "begin" &&
    matchInfo.type === "end" &&
    currentRule.index === matchInfo.index &&
    matchedGroup === ""
  ) {
    // Update state with the next character after the match
    d0 += inputText.slice(matchInfo.index, matchInfo.index + 1);
    if (!allowZeroWidthMatch) {
      const error = new Error("0 width match regex");
      error.languageName = languageName;
      error.badRule = currentRule.rule;
      throw error;
    }
    return 1;
  }

  // Update the current rule if handleMissingDoctypeError are at the beginning of a new rule
  if (currentRule = matchInfo, matchInfo.type === "begin") {
    return handleBeginMatch(matchInfo);
  } else if (matchInfo.type === "illegal" && !ignoreIllegalLexeme) {
    // Throw an error for illegal lexemes
    const error = new Error(
      `Illegal lexeme "${matchedGroup}" for mode "${currentMode.className || "<unnamed>"}"`
    );
    error.mode = currentMode;
    throw error;
  } else if (matchInfo.type === "end") {
    // Process and validate the end match
    const result = processAndValidateInput(matchInfo);
    if (result !== globalResultAccumulator) {
      return result;
    }
  }

  // If illegal match but empty string, treat as valid
  if (matchInfo.type === "illegal" && matchedGroup === "") {
    return 1;
  }

  // Infinite loop protection: too many iterations compared to matches
  if (iterationCount > 1e5 && iterationCount > matchInfo.index * 3) {
    throw new Error("potential infinite loop, way more iterations than matches");
  }

  // Normal case: update state and return match length
  d0 += matchedGroup;
  return matchedGroup.length;
}

module.exports = processLexemeMatch;