/**
 * Handles an HTML element node by dispatching to the appropriate handler based on its tag name.
 * This function acts as a central dispatcher for processing different HTML elements during parsing or rendering.
 *
 * @param {object} parserContext - The parser context or state object, containing options and other parsing state.
 * @param {object} elementNode - The HTML element node to process. Must have a 'tagName' property.
 * @returns {void}
 */
function handleHtmlElementByTagName(parserContext, elementNode) {
  const tagName = elementNode.tagName;
  const tagLength = tagName.length;

  switch (tagLength) {
    case 1:
      // Single-letter tags (e.g., createObjectTracker, s, createPropertyAccessor, UL, initializeSyntaxHighlighting, a)
      if (tagName === i.createObjectTracker || tagName === i.s || tagName === i.createPropertyAccessor || tagName === i.UL) {
        jd(parserContext, elementNode);
      } else if (tagName === i.initializeSyntaxHighlighting) {
        zA$(parserContext, elementNode);
      } else if (tagName === i.a) {
        Z55(parserContext, elementNode);
      } else {
        AC(parserContext, elementNode);
      }
      break;
    case 2:
      // Two-letter tags (e.g., DL, OL, UL, trackAndPingOnPromise-H6, LI, createAccessorFunctionProxy, DT, EM, getObjectPrototype, BR, HR, handleElementProcessing, RT, RP)
      if (tagName === i.DL || tagName === i.OL || tagName === i.UL) {
        zA$(parserContext, elementNode);
      } else if (
        tagName === i.trackAndPingOnPromise || tagName === i.createUserMessageObject || tagName === i.H3 ||
        tagName === i.H4 || tagName === i.H5 || tagName === i.H6
      ) {
        insertHeadingOrParagraphElement(parserContext, elementNode);
      } else if (tagName === i.LI || tagName === i.createAccessorFunctionProxy || tagName === i.DT) {
        handleListAndDefinitionElementInsertion(parserContext, elementNode);
      } else if (tagName === i.EM || tagName === i.getObjectPrototype) {
        jd(parserContext, elementNode);
      } else if (tagName === i.BR) {
        handleSelfClosingHtmlElement(parserContext, elementNode);
      } else if (tagName === i.HR) {
        handleParagraphElementInsertion(parserContext, elementNode);
      } else if (tagName === i.handleElementProcessing) {
        KV2(parserContext, elementNode);
      } else if (tagName === i.RT || tagName === i.RP) {
        H55(parserContext, elementNode);
      } else if (tagName !== i.TH && tagName !== i.TD && tagName !== i.TR) {
        // For all other 2-letter tags except table cells/rows
        AC(parserContext, elementNode);
      }
      break;
    case 3:
      // Three-letter tags (e.g., DIV, DIR, NAV, PRE, BIG, IMG, WBR, XMP, SVG, RTC)
      if (tagName === i.DIV || tagName === i.DIR || tagName === i.NAV) {
        zA$(parserContext, elementNode);
      } else if (tagName === i.PRE) {
        handleParagraphInsertion(parserContext, elementNode);
      } else if (tagName === i.BIG) {
        jd(parserContext, elementNode);
      } else if (tagName === i.IMG || tagName === i.WBR) {
        handleSelfClosingHtmlElement(parserContext, elementNode);
      } else if (tagName === i.XMP) {
        handleRawTextElementStart(parserContext, elementNode);
      } else if (tagName === i.SVG) {
        E55(parserContext, elementNode);
      } else if (tagName === i.RTC) {
        KV2(parserContext, elementNode);
      } else if (tagName !== i.COL) {
        // For all other 3-letter tags except COL
        AC(parserContext, elementNode);
      }
      break;
    case 4:
      // Four-letter tags (e.g., HTML, BASE, LINK, META, BODY, MAIN, MENU, FORM, CODE, FONT, NOBR, AREA, MATH, HEAD)
      if (tagName === i.HTML) {
        adoptAttributesIfNoTemplateOpen(parserContext, elementNode);
      } else if (tagName === i.BASE || tagName === i.LINK || tagName === i.META) {
        handleHeadElementStartTag(parserContext, elementNode);
      } else if (tagName === i.BODY) {
        adoptAttributesToProperlyNestedBodyElement(parserContext, elementNode);
      } else if (tagName === i.MAIN || tagName === i.MENU) {
        zA$(parserContext, elementNode);
      } else if (tagName === i.FORM) {
        handleFormElementInsertion(parserContext, elementNode);
      } else if (tagName === i.CODE || tagName === i.FONT) {
        jd(parserContext, elementNode);
      } else if (tagName === i.NOBR) {
        D55(parserContext, elementNode);
      } else if (tagName === i.AREA) {
        handleSelfClosingHtmlElement(parserContext, elementNode);
      } else if (tagName === i.MATH) {
        insertMathMLElementWithFormatting(parserContext, elementNode);
      } else if (tagName === i.MENU) {
        z55(parserContext, elementNode);
      } else if (tagName !== i.HEAD) {
        // For all other 4-letter tags except HEAD
        AC(parserContext, elementNode);
      }
      break;
    case 5:
      // Five-letter tags (e.g., STYLE, TITLE, ASIDE, SMALL, TABLE, EMBED, INPUT, PARAM, TRACK, IMAGE, FRAME, TBODY, TFOOT, THEAD)
      if (tagName === i.STYLE || tagName === i.TITLE) {
        handleHeadElementStartTag(parserContext, elementNode);
      } else if (tagName === i.ASIDE) {
        zA$(parserContext, elementNode);
      } else if (tagName === i.SMALL) {
        jd(parserContext, elementNode);
      } else if (tagName === i.TABLE) {
        handleTableElementInsertion(parserContext, elementNode);
      } else if (tagName === i.EMBED) {
        handleSelfClosingHtmlElement(parserContext, elementNode);
      } else if (tagName === i.INPUT) {
        handleInputElementInsertion(parserContext, elementNode);
      } else if (tagName === i.PARAM || tagName === i.TRACK) {
        XV2(parserContext, elementNode);
      } else if (tagName === i.IMAGE) {
        J55(parserContext, elementNode);
      } else if (
        tagName !== i.FRAME &&
        tagName !== i.TBODY &&
        tagName !== i.TFOOT &&
        tagName !== i.THEAD
      ) {
        // For all other 5-letter tags except table/frame tags
        AC(parserContext, elementNode);
      }
      break;
    case 6:
      // Six-letter tags (e.g., SCRIPT, CENTER, FIGURE, FOOTER, HEADER, HGROUP, DIALOG, BUTTON, STRIKE, STRONG, APPLET, OBJECT, KEYGEN, SOURCE, IFRAME, SELECT, OPTION)
      if (tagName === i.SCRIPT) {
        handleHeadElementStartTag(parserContext, elementNode);
      } else if (
        tagName === i.CENTER || tagName === i.FIGURE || tagName === i.FOOTER ||
        tagName === i.HEADER || tagName === i.HGROUP || tagName === i.DIALOG
      ) {
        zA$(parserContext, elementNode);
      } else if (tagName === i.BUTTON) {
        handleButtonElementInsertion(parserContext, elementNode);
      } else if (tagName === i.STRIKE || tagName === i.STRONG) {
        jd(parserContext, elementNode);
      } else if (tagName === i.APPLET || tagName === i.OBJECT) {
        insertElementWithFormatting(parserContext, elementNode);
      } else if (tagName === i.KEYGEN) {
        handleSelfClosingHtmlElement(parserContext, elementNode);
      } else if (tagName === i.SOURCE) {
        XV2(parserContext, elementNode);
      } else if (tagName === i.IFRAME) {
        setFramesetNotAllowedAndSwitchToRawTextParsing(parserContext, elementNode);
      } else if (tagName === i.SELECT) {
        handleSelectElementInsertion(parserContext, elementNode);
      } else if (tagName === i.OPTION) {
        insertOptionElementIfNeeded(parserContext, elementNode);
      } else {
        AC(parserContext, elementNode);
      }
      break;
    case 7:
      // Seven-letter tags (e.g., BGSOUND, DETAILS, ADDRESS, ARTICLE, SECTION, SUMMARY, LISTING, MARQUEE, NOEMBED, CAPTION)
      if (tagName === i.BGSOUND) {
        handleHeadElementStartTag(parserContext, elementNode);
      } else if (
        tagName === i.DETAILS || tagName === i.ADDRESS || tagName === i.ARTICLE ||
        tagName === i.SECTION || tagName === i.SUMMARY
      ) {
        zA$(parserContext, elementNode);
      } else if (tagName === i.LISTING) {
        handleParagraphInsertion(parserContext, elementNode);
      } else if (tagName === i.MARQUEE) {
        insertElementWithFormatting(parserContext, elementNode);
      } else if (tagName === i.NOEMBED) {
        CV2(parserContext, elementNode);
      } else if (tagName !== i.CAPTION) {
        // For all other 7-letter tags except CAPTION
        AC(parserContext, elementNode);
      }
      break;
    case 8:
      // Eight-letter tags (e.g., BASEFONT, FRAMESET, FIELDSET, TEXTAREA, TEMPLATE, NOSCRIPT, OPTGROUP, COLGROUP)
      if (tagName === i.BASEFONT) {
        handleHeadElementStartTag(parserContext, elementNode);
      } else if (tagName === i.FRAMESET) {
        handleFramesetInsertion(parserContext, elementNode);
      } else if (tagName === i.FIELDSET) {
        zA$(parserContext, elementNode);
      } else if (tagName === i.TEXTAREA) {
        switchToTextMode(parserContext, elementNode);
      } else if (tagName === i.TEMPLATE) {
        handleHeadElementStartTag(parserContext, elementNode);
      } else if (tagName === i.NOSCRIPT) {
        // NOSCRIPT handling depends on scriptingEnabled option
        if (parserContext.options.scriptingEnabled) {
          CV2(parserContext, elementNode);
        } else {
          AC(parserContext, elementNode);
        }
      } else if (tagName === i.OPTGROUP) {
        insertOptionElementIfNeeded(parserContext, elementNode);
      } else if (tagName !== i.COLGROUP) {
        // For all other 8-letter tags except COLGROUP
        AC(parserContext, elementNode);
      }
      break;
    case 9:
      // Nine-letter tags (e.g., PLAINTEXT)
      if (tagName === i.PLAINTEXT) {
        handlePlaintextElementInsertion(parserContext, elementNode);
      } else {
        AC(parserContext, elementNode);
      }
      break;
    case 10:
      // Ten-letter tags (e.g., BLOCKQUOTE, FIGCAPTION)
      if (tagName === i.BLOCKQUOTE || tagName === i.FIGCAPTION) {
        zA$(parserContext, elementNode);
      } else {
        AC(parserContext, elementNode);
      }
      break;
    default:
      // All other tag lengths
      AC(parserContext, elementNode);
  }
}

module.exports = handleHtmlElementByTagName;