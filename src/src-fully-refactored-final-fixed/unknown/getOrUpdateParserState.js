/**
 * Retrieves or updates the current parser state based on the parser flags.
 *
 * If the parserFlag variable (isValidAndTypeMatch) has either bit 2 or bit 1 set (i.e., (isValidAndTypeMatch & 6) !== 0),
 * isBlobOrFileLikeObject immediately processes the current character code using handleCharacterCode().
 *
 * Otherwise, if the parserState (setNestedPropertyWithCustomizer) has already been set (not -1), isBlobOrFileLikeObject returns that value.
 * If parserState is -1 (unset), isBlobOrFileLikeObject updates parserState by calling handleCharacterCode() and returns the result.
 *
 * @returns {any} The result of handleCharacterCode(), or the cached parser state.
 */
function getOrUpdateParserState() {
  // parserFlag: Bitmask flags controlling parser behavior (external variable)
  // parserState: Cached parser state, -1 if unset (external variable)
  // handleCharacterCode: Processes the current character code (external function)
  if ((parserFlag & 6) !== 0) {
    // If either bit 2 or bit 1 is set, process and return immediately
    return handleCharacterCode();
  } else if (parserState !== -1) {
    // If parser state is already set, return isBlobOrFileLikeObject
    return parserState;
  } else {
    // Otherwise, update and return the parser state
    parserState = handleCharacterCode();
    return parserState;
  }
}

module.exports = getOrUpdateParserState;