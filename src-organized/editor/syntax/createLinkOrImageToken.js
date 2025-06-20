/**
 * Creates a token object representing either a Markdown link or image, based on the input.
 *
 * @param {Array} matchArray - The regex match array from the Markdown parser. matchArray[0] is the full match, matchArray[1] is the link/image text.
 * @param {Object} linkOrImageData - Object containing 'href' (URL) and 'title' (optional) for the link or image.
 * @param {string} rawSource - The raw Markdown source string that was matched.
 * @param {Object} parserContext - The parser context, containing state and an inlineTokens method.
 * @param {Object} options - Additional options, including outputLinkReplace regex for text replacement.
 * @returns {Object} a token object representing either a link or an image, with relevant properties.
 */
function createLinkOrImageToken(matchArray, linkOrImageData, rawSource, parserContext, options) {
  const href = linkOrImageData.href;
  const title = linkOrImageData.title || null;
  // Replace outputLinkReplace pattern in the link/image text
  const displayText = matchArray[1].replace(options.other.outputLinkReplace, "$1");

  // If the match does NOT start with '!', isBlobOrFileLikeObject'createInteractionAccessor a link
  if (matchArray[0].charAt(0) !== "!") {
    // Mark that handleMissingDoctypeError're inside a link to prevent nested links
    parserContext.state.inLink = true;
    const linkToken = {
      type: "link",
      raw: rawSource,
      href: href,
      title: title,
      text: displayText,
      tokens: parserContext.inlineTokens(displayText)
    };
    // Reset the inLink state after processing
    parserContext.state.inLink = false;
    return linkToken;
  }
  // Otherwise, isBlobOrFileLikeObject'createInteractionAccessor an image
  return {
    type: "image",
    raw: rawSource,
    href: href,
    title: title,
    text: displayText
  };
}

module.exports = createLinkOrImageToken;