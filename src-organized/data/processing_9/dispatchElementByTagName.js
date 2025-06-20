/**
 * Dispatches an HTML element node to the appropriate handler function based on its tag name.
 * This function acts as a central router for handling different HTML elements during parsing or DOM manipulation.
 *
 * @param {object} parserContext - The current parser context or state object, containing options and stacks.
 * @param {object} elementNode - The HTML element node to process. Must have a 'tagName' property.
 * @returns {void}
 */
function dispatchElementByTagName(parserContext, elementNode) {
  const tagName = elementNode.tagName;

  // Switch on the length of the tag name for efficient dispatch
  switch (tagName.length) {
    case 1:
      // Single-letter tags: <i>, <createInteractionAccessor>, <b>, <u>, <createIterableHelper>, <a>
      if (
        tagName === i.createObjectTracker ||
        tagName === i.s ||
        tagName === i.createPropertyAccessor ||
        tagName === i.UL
      ) {
        insertElementWithActiveFormatting(parserContext, elementNode);
      } else if (tagName === i.initializeSyntaxHighlighting) {
        insertElementWithParagraphClosure(parserContext, elementNode);
      } else if (tagName === i.a) {
        Z55(parserContext, elementNode);
      } else {
        AC(parserContext, elementNode);
      }
      break;
    case 2:
      // Two-letter tags: <dl>, <spawnProcessObservable>, <ul>, <h1>-<h6>, <li>, <dd>, <isAsciiDigit>, <em>, <tt>, <br>, <hr>, <rb>, <rt>, <rp>, <th>, <streamAssistantResponseWithObservable>, <tr>
      if (
        tagName === i.DL ||
        tagName === i.OL ||
        tagName === i.UL
      ) {
        insertElementWithParagraphClosure(parserContext, elementNode);
      } else if (
        tagName === i.trackAndPingOnPromise ||
        tagName === i.createUserMessageObject ||
        tagName === i.H3 ||
        tagName === i.H4 ||
        tagName === i.H5 ||
        tagName === i.H6
      ) {
        insertHeadingOrParagraphElement(parserContext, elementNode);
      } else if (
        tagName === i.LI ||
        tagName === i.createAccessorFunctionProxy ||
        tagName === i.DT
      ) {
        handleListAndDefinitionElementInsertion(parserContext, elementNode);
      } else if (
        tagName === i.EM ||
        tagName === i.getObjectPrototype
      ) {
        insertElementWithActiveFormatting(parserContext, elementNode);
      } else if (tagName === i.BR) {
        handleSelfClosingHtmlElement(parserContext, elementNode);
      } else if (tagName === i.HR) {
        handleParagraphElementInsertion(parserContext, elementNode);
      } else if (tagName === i.handleElementProcessing) {
        KV2(parserContext, elementNode);
      } else if (
        tagName === i.RT ||
        tagName === i.RP
      ) {
        H55(parserContext, elementNode);
      } else if (
        tagName !== i.TH &&
        tagName !== i.TD &&
        tagName !== i.TR
      ) {
        AC(parserContext, elementNode);
      }
      break;
    case 3:
      // Three-letter tags: <div>, <dir>, <nav>, <pre>, <big>, <img>, <wbr>, <xmp>, <svg>, <rtc>, <col>
      if (
        tagName === i.DIV ||
        tagName === i.DIR ||
        tagName === i.NAV
      ) {
        insertElementWithParagraphClosure(parserContext, elementNode);
      } else if (tagName === i.PRE) {
        handleParagraphInsertion(parserContext, elementNode);
      } else if (tagName === i.BIG) {
        insertElementWithActiveFormatting(parserContext, elementNode);
      } else if (
        tagName === i.IMG ||
        tagName === i.WBR
      ) {
        handleSelfClosingHtmlElement(parserContext, elementNode);
      } else if (tagName === i.XMP) {
        handleRawTextElementStart(parserContext, elementNode);
      } else if (tagName === i.SVG) {
        E55(parserContext, elementNode);
      } else if (tagName === i.RTC) {
        KV2(parserContext, elementNode);
      } else if (tagName !== i.COL) {
        AC(parserContext, elementNode);
      }
      break;
    case 4:
      // Four-letter tags: <html>, <base>, <link>, <meta>, <body>, <main>, <menu>, <form>, <code>, <font>, <nobr>, <area>, <math>, <head>
      if (tagName === i.HTML) {
        adoptAttributesIfNoTemplateOpen(parserContext, elementNode);
      } else if (
        tagName === i.BASE ||
        tagName === i.LINK ||
        tagName === i.META
      ) {
        handleHeadElementStartTag(parserContext, elementNode);
      } else if (tagName === i.BODY) {
        adoptAttributesToProperlyNestedBodyElement(parserContext, elementNode);
      } else if (
        tagName === i.MAIN ||
        tagName === i.MENU
      ) {
        insertElementWithParagraphClosure(parserContext, elementNode);
      } else if (tagName === i.FORM) {
        handleFormElementInsertion(parserContext, elementNode);
      } else if (
        tagName === i.CODE ||
        tagName === i.FONT
      ) {
        insertElementWithActiveFormatting(parserContext, elementNode);
      } else if (tagName === i.NOBR) {
        D55(parserContext, elementNode);
      } else if (tagName === i.AREA) {
        handleSelfClosingHtmlElement(parserContext, elementNode);
      } else if (tagName === i.MATH) {
        insertMathMLElementWithFormatting(parserContext, elementNode);
      } else if (tagName === i.MENU) {
        z55(parserContext, elementNode);
      } else if (tagName !== i.HEAD) {
        AC(parserContext, elementNode);
      }
      break;
    case 5:
      // Five-letter tags: <style>, <title>, <aside>, <small>, <table>, <embed>, <input>, <param>, <track>, <image>, <frame>, <tbody>, <tfoot>, <thead>
      if (
        tagName === i.STYLE ||
        tagName === i.TITLE
      ) {
        handleHeadElementStartTag(parserContext, elementNode);
      } else if (tagName === i.ASIDE) {
        insertElementWithParagraphClosure(parserContext, elementNode);
      } else if (tagName === i.SMALL) {
        insertElementWithActiveFormatting(parserContext, elementNode);
      } else if (tagName === i.TABLE) {
        handleTableElementInsertion(parserContext, elementNode);
      } else if (tagName === i.EMBED) {
        handleSelfClosingHtmlElement(parserContext, elementNode);
      } else if (tagName === i.INPUT) {
        handleInputElementInsertion(parserContext, elementNode);
      } else if (
        tagName === i.PARAM ||
        tagName === i.TRACK
      ) {
        XV2(parserContext, elementNode);
      } else if (tagName === i.IMAGE) {
        J55(parserContext, elementNode);
      } else if (
        tagName !== i.FRAME &&
        tagName !== i.TBODY &&
        tagName !== i.TFOOT &&
        tagName !== i.THEAD
      ) {
        AC(parserContext, elementNode);
      }
      break;
    case 6:
      // Six-letter tags: <script>, <center>, <figure>, <footer>, <header>, <hgroup>, <dialog>, <button>, <strike>, <strong>, <applet>, <object>, <keygen>, <source>, <iframe>, <select>, <option>
      if (tagName === i.SCRIPT) {
        handleHeadElementStartTag(parserContext, elementNode);
      } else if (
        tagName === i.CENTER ||
        tagName === i.FIGURE ||
        tagName === i.FOOTER ||
        tagName === i.HEADER ||
        tagName === i.HGROUP ||
        tagName === i.DIALOG
      ) {
        insertElementWithParagraphClosure(parserContext, elementNode);
      } else if (tagName === i.BUTTON) {
        handleButtonElementInsertion(parserContext, elementNode);
      } else if (
        tagName === i.STRIKE ||
        tagName === i.STRONG
      ) {
        insertElementWithActiveFormatting(parserContext, elementNode);
      } else if (
        tagName === i.APPLET ||
        tagName === i.OBJECT
      ) {
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
      // Seven-letter tags: <bgsound>, <details>, <address>, <article>, <section>, <summary>, <listing>, <marquee>, <noembed>, <caption>
      if (tagName === i.BGSOUND) {
        handleHeadElementStartTag(parserContext, elementNode);
      } else if (
        tagName === i.DETAILS ||
        tagName === i.ADDRESS ||
        tagName === i.ARTICLE ||
        tagName === i.SECTION ||
        tagName === i.SUMMARY
      ) {
        insertElementWithParagraphClosure(parserContext, elementNode);
      } else if (tagName === i.LISTING) {
        handleParagraphInsertion(parserContext, elementNode);
      } else if (tagName === i.MARQUEE) {
        insertElementWithFormatting(parserContext, elementNode);
      } else if (tagName === i.NOEMBED) {
        CV2(parserContext, elementNode);
      } else if (tagName !== i.CAPTION) {
        AC(parserContext, elementNode);
      }
      break;
    case 8:
      // Eight-letter tags: <basefont>, <frameset>, <fieldset>, <textarea>, <template>, <noscript>, <optgroup>, <colgroup>
      if (tagName === i.BASEFONT) {
        handleHeadElementStartTag(parserContext, elementNode);
      } else if (tagName === i.FRAMESET) {
        handleFramesetInsertion(parserContext, elementNode);
      } else if (tagName === i.FIELDSET) {
        insertElementWithParagraphClosure(parserContext, elementNode);
      } else if (tagName === i.TEXTAREA) {
        switchToTextMode(parserContext, elementNode);
      } else if (tagName === i.TEMPLATE) {
        handleHeadElementStartTag(parserContext, elementNode);
      } else if (tagName === i.NOSCRIPT) {
        // Only process <noscript> if scripting is enabled
        if (parserContext.options.scriptingEnabled) {
          CV2(parserContext, elementNode);
        } else {
          AC(parserContext, elementNode);
        }
      } else if (tagName === i.OPTGROUP) {
        insertOptionElementIfNeeded(parserContext, elementNode);
      } else if (tagName !== i.COLGROUP) {
        AC(parserContext, elementNode);
      }
      break;
    case 9:
      // Nine-letter tags: <plaintext>
      if (tagName === i.PLAINTEXT) {
        handlePlaintextElementInsertion(parserContext, elementNode);
      } else {
        AC(parserContext, elementNode);
      }
      break;
    case 10:
      // Ten-letter tags: <blockquote>, <figcaption>
      if (
        tagName === i.BLOCKQUOTE ||
        tagName === i.FIGCAPTION
      ) {
        insertElementWithParagraphClosure(parserContext, elementNode);
      } else {
        AC(parserContext, elementNode);
      }
      break;
    default:
      // Fallback for unknown or unsupported tag names
      AC(parserContext, elementNode);
  }
}

module.exports = dispatchElementByTagName;