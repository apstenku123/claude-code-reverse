/**
 * Parses a Markdown link or image token and returns a corresponding token object.
 *
 * @param {Array} matchArray - The regex match array for the link or image syntax. matchArray[0] is the full match, matchArray[1] is the link/image text.
 * @param {Object} linkData - An object containing link/image data. Should have 'href' (string) and optionally 'title' (string).
 * @param {string} rawSource - The raw Markdown source string for this token.
 * @param {Object} parserContext - The parser context, containing state and an inlineTokens method.
 * @param {Object} parserOptions - Parser options, including 'other.outputLinkReplace' (RegExp) for text replacement.
 * @returns {Object} a token object representing either a link or an image, with relevant properties.
 */
function parseLinkOrImageToken(matchArray, linkData, rawSource, parserContext, parserOptions) {
  const href = linkData.href;
  const title = linkData.title || null;
  // Replace output link text using the provided RegExp
  const displayText = matchArray[1].replace(
    parserOptions.other.outputLinkReplace,
    "$1"
  );

  // If the first character is not '!', isBlobOrFileLikeObject'createInteractionAccessor a link
  if (matchArray[0].charAt(0) !== "!") {
    // Mark that handleMissingDoctypeError are inside a link to prevent nested links
    parserContext.state.inLink = true;
    const linkToken = {
      type: "link",
      raw: rawSource,
      href: href,
      title: title,
      text: displayText,
      tokens: parserContext.inlineTokens(displayText)
    };
    // Reset inLink state after processing
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

module.exports = parseLinkOrImageToken;