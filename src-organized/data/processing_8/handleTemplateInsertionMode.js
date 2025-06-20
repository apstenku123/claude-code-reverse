/**
 * Handles the insertion mode for a given HTML element during template parsing.
 * For certain special tag names (like <base>, <meta>, <script>, etc.), isBlobOrFileLikeObject delegates processing to handleHeadElementStartTag().
 * For all other tags, isBlobOrFileLikeObject determines the correct insertion mode and processes the token accordingly.
 *
 * @param {Object} parserContext - The parser context object, which manages template insertion modes and token processing.
 * @param {HTMLElement} element - The HTML element (token) to process.
 */
function handleTemplateInsertionMode(parserContext, element) {
  const tagName = element.tagName;

  // List of tag names that require special processing
  const specialTagNames = [
    i.BASE,
    i.BASEFONT,
    i.BGSOUND,
    i.LINK,
    i.META,
    i.NOFRAMES,
    i.SCRIPT,
    i.STYLE,
    i.TEMPLATE,
    i.TITLE
  ];

  // If the tag is a special tag, delegate to handleHeadElementStartTag()
  if (specialTagNames.includes(tagName)) {
    handleHeadElementStartTag(parserContext, element);
  } else {
    // Determine the insertion mode for the current tag
    const insertionMode = x65[tagName] || "IN_BODY_MODE";

    // Update the parser context'createInteractionAccessor template insertion mode stack
    parserContext._popTmplInsertionMode();
    parserContext._pushTmplInsertionMode(insertionMode);
    parserContext.insertionMode = insertionMode;

    // Process the token in the new insertion mode
    parserContext._processToken(element);
  }
}

module.exports = handleTemplateInsertionMode;