/**
 * Processes an HTML element node based on its tag name and delegates handling to the appropriate function.
 *
 * @param {object} parentContext - The parent context or accumulator for processing (e.g., output array, parent node).
 * @param {object} htmlElement - The HTML element node to process. Must have a 'tagName' property.
 * @returns {void}
 */
function handleHtmlTagElement(parentContext, htmlElement) {
  const tagName = htmlElement.tagName;
  const tagLength = tagName.length;

  // Switch logic based on tag name length for performance
  switch (tagLength) {
    case 1:
      // Inline formatting tags and paragraph
      if (
        tagName === i.a ||
        tagName === i.createPropertyAccessor ||
        tagName === i.createObjectTracker ||
        tagName === i.s ||
        tagName === i.UL
      ) {
        processActiveFormattingElements(parentContext, htmlElement);
      } else if (tagName === i.initializeSyntaxHighlighting) {
        q55(parentContext, htmlElement);
      } else {
        RK(parentContext, htmlElement);
      }
      break;
    case 2:
      // List containers, list items, headers, breaks, emphasis, teletype
      if (
        tagName === i.DL ||
        tagName === i.UL ||
        tagName === i.OL
      ) {
        FO(parentContext, htmlElement);
      } else if (tagName === i.LI) {
        M55(parentContext, htmlElement);
      } else if (tagName === i.createAccessorFunctionProxy || tagName === i.DT) {
        L55(parentContext, htmlElement);
      } else if (
        tagName === i.trackAndPingOnPromise ||
        tagName === i.createUserMessageObject ||
        tagName === i.H3 ||
        tagName === i.H4 ||
        tagName === i.H5 ||
        tagName === i.H6
      ) {
        R55(parentContext, htmlElement);
      } else if (tagName === i.BR) {
        handleFormattingElementBreakInsertion(parentContext, htmlElement);
      } else if (tagName === i.EM || tagName === i.getObjectPrototype) {
        processActiveFormattingElements(parentContext, htmlElement);
      } else {
        RK(parentContext, htmlElement);
      }
      break;
    case 3:
      // Big, directory, division, navigation, preformatted
      if (tagName === i.BIG) {
        processActiveFormattingElements(parentContext, htmlElement);
      } else if (
        tagName === i.DIR ||
        tagName === i.DIV ||
        tagName === i.NAV ||
        tagName === i.PRE
      ) {
        FO(parentContext, htmlElement);
      } else {
        RK(parentContext, htmlElement);
      }
      break;
    case 4:
      // Body, html, form, code, font, nobr, main, menu
      if (tagName === i.BODY) {
        setAfterBodyInsertionModeIfBodyInScope(parentContext, htmlElement);
      } else if (tagName === i.HTML) {
        handleAfterBodyInsertionMode(parentContext, htmlElement);
      } else if (tagName === i.FORM) {
        handleFormElementScope(parentContext, htmlElement);
      } else if (
        tagName === i.CODE ||
        tagName === i.FONT ||
        tagName === i.NOBR
      ) {
        processActiveFormattingElements(parentContext, htmlElement);
      } else if (tagName === i.MAIN || tagName === i.MENU) {
        FO(parentContext, htmlElement);
      } else {
        RK(parentContext, htmlElement);
      }
      break;
    case 5:
      // Aside, small
      if (tagName === i.ASIDE) {
        FO(parentContext, htmlElement);
      } else if (tagName === i.SMALL) {
        processActiveFormattingElements(parentContext, htmlElement);
      } else {
        RK(parentContext, htmlElement);
      }
      break;
    case 6:
      // Center, figure, footer, header, hgroup, dialog, applet, object, strike, strong
      if (
        tagName === i.CENTER ||
        tagName === i.FIGURE ||
        tagName === i.FOOTER ||
        tagName === i.HEADER ||
        tagName === i.HGROUP ||
        tagName === i.DIALOG
      ) {
        FO(parentContext, htmlElement);
      } else if (tagName === i.APPLET || tagName === i.OBJECT) {
        HV2(parentContext, htmlElement);
      } else if (tagName === i.STRIKE || tagName === i.STRONG) {
        processActiveFormattingElements(parentContext, htmlElement);
      } else {
        RK(parentContext, htmlElement);
      }
      break;
    case 7:
      // Address, article, details, section, summary, listing, marquee
      if (
        tagName === i.ADDRESS ||
        tagName === i.ARTICLE ||
        tagName === i.DETAILS ||
        tagName === i.SECTION ||
        tagName === i.SUMMARY ||
        tagName === i.LISTING
      ) {
        FO(parentContext, htmlElement);
      } else if (tagName === i.MARQUEE) {
        HV2(parentContext, htmlElement);
      } else {
        RK(parentContext, htmlElement);
      }
      break;
    case 8:
      // Fieldset, template
      if (tagName === i.FIELDSET) {
        FO(parentContext, htmlElement);
      } else if (tagName === i.TEMPLATE) {
        handleOAuthClientAuthorization(parentContext, htmlElement);
      } else {
        RK(parentContext, htmlElement);
      }
      break;
    case 10:
      // Blockquote, figcaption
      if (tagName === i.BLOCKQUOTE || tagName === i.FIGCAPTION) {
        FO(parentContext, htmlElement);
      } else {
        RK(parentContext, htmlElement);
      }
      break;
    default:
      // Fallback for unrecognized tags
      RK(parentContext, htmlElement);
  }
}

module.exports = handleHtmlTagElement;