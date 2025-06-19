/**
 * Switches the parser to RAWTEXT mode using the provided context and configuration.
 *
 * @param {Object} parserContext - The parser context object that manages parsing state and modes.
 * @param {Object} parsingConfig - The configuration or token that determines how to switch modes.
 * @returns {void}
 *
 * This function delegates to the parserContext'createInteractionAccessor _switchToTextParsing method,
 * instructing isBlobOrFileLikeObject to enter RAWTEXT mode as defined in the parser'createInteractionAccessor MODE enumeration.
 */
function switchToRawTextParsingMode(parserContext, parsingConfig) {
  // Switch the parser to RAWTEXT mode using the provided configuration
  parserContext._switchToTextParsing(parsingConfig, parserContext.MODE.RAWTEXT);
}

module.exports = switchToRawTextParsingMode;