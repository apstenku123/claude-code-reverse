/**
 * Handles an HTML element by dispatching to the appropriate handler function based on its tag name.
 *
 * @param {any} context - The processing context or state object to be passed to handler functions.
 * @param {object} element - The HTML element object to process. Must have a 'tagName' property.
 * @returns {void}
 *
 * The function inspects the tagName property of the element and, depending on its length and value,
 * delegates processing to the correct handler function. This is typically used in an HTML parser or renderer.
 */
function handleHtmlTagByTagName(context, element) {
  const tagName = element.tagName;

  switch (tagName.length) {
    case 1:
      // Single-character tags (e.g., 'a', 'createPropertyAccessor', 'createObjectTracker', 's', 'UL', 'initializeSyntaxHighlighting')
      if (
        tagName === i.a ||
        tagName === i.createPropertyAccessor ||
        tagName === i.createObjectTracker ||
        tagName === i.s ||
        tagName === i.UL
      ) {
        processActiveFormattingElements(context, element);
      } else if (tagName === i.initializeSyntaxHighlighting) {
        q55(context, element);
      } else {
        RK(context, element);
      }
      break;
    case 2:
      // Two-character tags (e.g., 'DL', 'UL', 'OL', 'LI', 'createAccessorFunctionProxy', 'DT', 'trackAndPingOnPromise'-'H6', 'BR', 'EM', 'getObjectPrototype')
      if (
        tagName === i.DL ||
        tagName === i.UL ||
        tagName === i.OL
      ) {
        FO(context, element);
      } else if (tagName === i.LI) {
        M55(context, element);
      } else if (tagName === i.createAccessorFunctionProxy || tagName === i.DT) {
        L55(context, element);
      } else if (
        tagName === i.trackAndPingOnPromise ||
        tagName === i.createUserMessageObject ||
        tagName === i.H3 ||
        tagName === i.H4 ||
        tagName === i.H5 ||
        tagName === i.H6
      ) {
        R55(context, element);
      } else if (tagName === i.BR) {
        handleFormattingElementBreakInsertion(context, element);
      } else if (tagName === i.EM || tagName === i.getObjectPrototype) {
        processActiveFormattingElements(context, element);
      } else {
        RK(context, element);
      }
      break;
    case 3:
      // Three-character tags (e.g., 'BIG', 'DIR', 'DIV', 'NAV', 'PRE')
      if (tagName === i.BIG) {
        processActiveFormattingElements(context, element);
      } else if (
        tagName === i.DIR ||
        tagName === i.DIV ||
        tagName === i.NAV ||
        tagName === i.PRE
      ) {
        FO(context, element);
      } else {
        RK(context, element);
      }
      break;
    case 4:
      // Four-character tags (e.g., 'BODY', 'HTML', 'FORM', 'CODE', 'FONT', 'NOBR', 'MAIN', 'MENU')
      if (tagName === i.BODY) {
        setAfterBodyInsertionModeIfBodyInScope(context, element);
      } else if (tagName === i.HTML) {
        handleAfterBodyInsertionMode(context, element);
      } else if (tagName === i.FORM) {
        handleFormElementScope(context, element);
      } else if (
        tagName === i.CODE ||
        tagName === i.FONT ||
        tagName === i.NOBR
      ) {
        processActiveFormattingElements(context, element);
      } else if (tagName === i.MAIN || tagName === i.MENU) {
        FO(context, element);
      } else {
        RK(context, element);
      }
      break;
    case 5:
      // Five-character tags (e.g., 'ASIDE', 'SMALL')
      if (tagName === i.ASIDE) {
        FO(context, element);
      } else if (tagName === i.SMALL) {
        processActiveFormattingElements(context, element);
      } else {
        RK(context, element);
      }
      break;
    case 6:
      // Six-character tags (e.g., 'CENTER', 'FIGURE', 'FOOTER', 'HEADER', 'HGROUP', 'DIALOG', 'APPLET', 'OBJECT', 'STRIKE', 'STRONG')
      if (
        tagName === i.CENTER ||
        tagName === i.FIGURE ||
        tagName === i.FOOTER ||
        tagName === i.HEADER ||
        tagName === i.HGROUP ||
        tagName === i.DIALOG
      ) {
        FO(context, element);
      } else if (tagName === i.APPLET || tagName === i.OBJECT) {
        HV2(context, element);
      } else if (tagName === i.STRIKE || tagName === i.STRONG) {
        processActiveFormattingElements(context, element);
      } else {
        RK(context, element);
      }
      break;
    case 7:
      // Seven-character tags (e.g., 'ADDRESS', 'ARTICLE', 'DETAILS', 'SECTION', 'SUMMARY', 'LISTING', 'MARQUEE')
      if (
        tagName === i.ADDRESS ||
        tagName === i.ARTICLE ||
        tagName === i.DETAILS ||
        tagName === i.SECTION ||
        tagName === i.SUMMARY ||
        tagName === i.LISTING
      ) {
        FO(context, element);
      } else if (tagName === i.MARQUEE) {
        HV2(context, element);
      } else {
        RK(context, element);
      }
      break;
    case 8:
      // Eight-character tags (e.g., 'FIELDSET', 'TEMPLATE')
      if (tagName === i.FIELDSET) {
        FO(context, element);
      } else if (tagName === i.TEMPLATE) {
        handleOAuthClientAuthorization(context, element);
      } else {
        RK(context, element);
      }
      break;
    case 10:
      // Ten-character tags (e.g., 'BLOCKQUOTE', 'FIGCAPTION')
      if (tagName === i.BLOCKQUOTE || tagName === i.FIGCAPTION) {
        FO(context, element);
      } else {
        RK(context, element);
      }
      break;
    default:
      // All other tag names
      RK(context, element);
  }
}

module.exports = handleHtmlTagByTagName;