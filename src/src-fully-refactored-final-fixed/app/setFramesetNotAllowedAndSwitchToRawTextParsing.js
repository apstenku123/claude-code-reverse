/**
 * Sets the framesetOk property of the parser context to false and switches parsing mode to RAWTEXT.
 *
 * @param {Object} parserContext - The parser context object, which maintains the current state of the parser.
 * @param {any} token - The token or input that triggers the switch to RAWTEXT parsing mode.
 * @returns {void}
 */
function setFramesetNotAllowedAndSwitchToRawTextParsing(parserContext, token) {
  // Disallow the use of <frameset> in the current parsing context
  parserContext.framesetOk = false;
  // Switch the parser to RAWTEXT mode using the provided token
  parserContext._switchToTextParsing(token, e1.MODE.RAWTEXT);
}

module.exports = setFramesetNotAllowedAndSwitchToRawTextParsing;