/**
 * Handles HTML parsing events, managing the parser state and stack based on the event type.
 * Supports handling of start tags, end tags, character data, and special cases for MathML/SVG.
 *
 * @param {number} eventType - The type of parsing event (1: character data, 2: start tag, 3: end tag, 4: special, 5: ignored)
 * @param {string} tagName - The name of the tag or data being processed
 * @param {Array} tagAttributes - Array of attributes for the tag (e.g., [['color', 'red'], ...])
 * @param {boolean} isSelfClosing - Indicates if the tag is self-closing
 * @returns {void|any} - Returns early for some event types, otherwise void
 */
function handleHtmlParsingEvent(eventType, tagName, tagAttributes, isSelfClosing) {
  /**
   * Checks if the tag has any presentational attributes (color, face, size).
   * @param {Array} attributes - Array of attribute arrays
   * @returns {boolean}
   */
  function hasPresentationalAttributes(attributes) {
    for (let i = 0, len = attributes.length; i < len; i++) {
      switch (attributes[i][0]) {
        case "color":
        case "face":
        case "size":
          return true;
      }
    }
    return false;
  }

  let currentElement;

  switch (eventType) {
    case 1: // Character data
      if (isInForeignContent && foreignContentPattern.test(tagName)) {
        isInForeignContent = false;
      }
      if (shouldReplaceInvalidChars) {
        tagName = tagName.replace(invalidCharPattern, "�");
      }
      handleCharacterData(tagName);
      return;

    case 4: // Special event (e.g., comment or doctype)
      handleSpecialEvent(tagName);
      return;

    case 5: // Ignored event
      return;

    case 2: // Start tag
      switch (tagName) {
        case "font":
          if (!hasPresentationalAttributes(tagAttributes)) break;
        // fallthrough for presentational tags
        case "b":
        case "big":
        case "blockquote":
        case "body":
        case "br":
        case "center":
        case "code":
        case "dd":
        case "div":
        case "dl":
        case "isAsciiDigit":
        case "em":
        case "embed":
        case "h1":
        case "h2":
        case "h3":
        case "createErrorMapConfig":
        case "h5":
        case "h6":
        case "head":
        case "hr":
        case "i":
        case "img":
        case "li":
        case "listing":
        case "menu":
        case "meta":
        case "nobr":
        case "spawnProcessObservable":
        case "createIterableHelper":
        case "pre":
        case "ruby":
        case "createInteractionAccessor":
        case "small":
        case "span":
        case "strong":
        case "strike":
        case "sub":
        case "sup":
        case "table":
        case "tt":
        case "u":
        case "ul":
        case "var":
          if (isInForeignContent) break;
          // Pop elements from the stack until handleMissingDoctypeError reach an HTML element or a special case
          do {
            parserStack.pop();
            currentElement = parserStack.top;
          } while (
            currentElement.namespaceURI !== Namespace.HTML &&
            !isSpecialCaseElement(currentElement) &&
            !isAnotherSpecialCase(currentElement)
          );
          handleStartTag(eventType, tagName, tagAttributes, isSelfClosing);
          return;
      }
      // Determine the current element context
      if (parserStack.elements.length === 1 && isInForeignContent) {
        currentElement = rootElement;
      } else {
        currentElement = parserStack.top;
      }
      // Handle MathML and SVG namespaces
      if (currentElement.namespaceURI === Namespace.MATHML) {
        handleMathMLAttributes(tagAttributes);
      } else if (currentElement.namespaceURI === Namespace.SVG) {
        tagName = normalizeSvgTagName(tagName);
        handleSvgAttributes(tagAttributes);
      }
      // Always process attributes and element creation
      processAttributes(tagAttributes);
      createElement(tagName, tagAttributes, currentElement.namespaceURI);
      if (isSelfClosing) {
        // Special handling for self-closing script tags in SVG
        if (tagName === "script" && currentElement.namespaceURI === Namespace.SVG) {
          // No-op: handled elsewhere
        }
        parserStack.pop();
      }
      return;

    case 3: // End tag
      currentElement = parserStack.top;
      if (
        tagName === "script" &&
        currentElement.namespaceURI === Namespace.SVG &&
        currentElement.localName === "script"
      ) {
        parserStack.pop();
      } else {
        let stackIndex = parserStack.elements.length - 1;
        let stackElement = parserStack.elements[stackIndex];
        while (true) {
          if (stackElement.localName.toLowerCase() === tagName) {
            parserStack.popElement(stackElement);
            break;
          }
          stackElement = parserStack.elements[--stackIndex];
          if (stackElement.namespaceURI !== Namespace.HTML) {
            continue;
          }
          // Delegate to fallback handler if not found
          handleFallback(eventType, tagName, tagAttributes, isSelfClosing);
          break;
        }
      }
      return;
  }
}

module.exports = handleHtmlParsingEvent;