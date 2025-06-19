/**
 * Switches the given parser context to RAWTEXT parsing mode.
 *
 * This function marks the parser context as not suitable for frameset parsing
 * and then invokes the internal method to switch the parser to RAWTEXT mode
 * using the provided tag name.
 *
 * @param {Object} parserContext - The parser context object to modify. Must have a 'framesetOk' property and a '_switchToTextParsing' method.
 * @param {string} tagName - The tag name that triggers the switch to RAWTEXT parsing mode.
 * @returns {void}
 */
function switchToRawTextParsing(parserContext, tagName) {
  // Mark the parser context as not suitable for frameset parsing
  parserContext.framesetOk = false;
  // Switch the parser to RAWTEXT parsing mode using the provided tag name
  parserContext._switchToTextParsing(tagName, e1.MODE.RAWTEXT);
}

module.exports = switchToRawTextParsing;