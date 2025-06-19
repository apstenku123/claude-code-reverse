/**
 * Parses tag attributes from a markup string and updates the subscription object accordingly.
 * Handles attribute names, values, quotes, and self-closing tags, with error and warning reporting.
 *
 * @param {string} markup - The markup string to parse attributes from.
 * @param {number} startIndex - The index in the markup string to start parsing from.
 * @param {object} tagSubscription - The object representing the tag being parsed; will be updated with attributes.
 * @param {object} context - Parsing context, used for HTML mode detection.
 * @param {function} entityDecoder - Function to decode HTML entities in attribute values.
 * @param {object} errorHandler - Object with error, warning, and fatalError methods for reporting issues.
 * @returns {number} The index in the markup string where attribute parsing ended.
 */
function parseTagAttributes(markup, startIndex, tagSubscription, context, entityDecoder, errorHandler) {
  /**
   * Adds an attribute to the tagSubscription, handling duplicate detection and entity decoding.
   * @param {string} attributeName
   * @param {string} attributeValue
   * @param {number} attributeStartIndex
   */
  function addAttribute(attributeName, attributeValue, attributeStartIndex) {
    if (tagSubscription.attributeNames.hasOwnProperty(attributeName)) {
      errorHandler.fatalError(`Attribute ${attributeName} redefined`);
    }
    tagSubscription.addValue(
      attributeName,
      attributeValue.replace(/[\processRuleBeginHandlers\n\r]/g, ' ').replace(/&#?\w+;/g, entityDecoder),
      attributeStartIndex
    );
  }

  let attributeName = undefined;
  let attributeValue = undefined;
  let currentIndex = ++startIndex;
  let parsingState = N11; // Initial state constant

  while (true) {
    let currentChar = markup.charAt(currentIndex);
    switch (currentChar) {
      case '=':
        if (parsingState === _O) {
          attributeName = markup.slice(startIndex, currentIndex);
          parsingState = $11;
        } else if (parsingState === Zu) {
          parsingState = $11;
        } else {
          throw new Error('attribute equal must after attrName');
        }
        break;
      case "'":
      case '"':
        if (parsingState === $11 || parsingState === _O) {
          if (parsingState === _O) {
            errorHandler.warning('attribute value must after "="');
            attributeName = markup.slice(startIndex, currentIndex);
          }
          startIndex = currentIndex + 1;
          currentIndex = markup.indexOf(currentChar, startIndex);
          if (currentIndex > 0) {
            attributeValue = markup.slice(startIndex, currentIndex);
            addAttribute(attributeName, attributeValue, startIndex - 1);
            parsingState = Yu;
          } else {
            throw new Error(`attribute value no end '${currentChar}' match`);
          }
        } else if (parsingState === Du) {
          attributeValue = markup.slice(startIndex, currentIndex);
          addAttribute(attributeName, attributeValue, startIndex);
          errorHandler.warning(`attribute "${attributeName}" missed start quot(${currentChar})!!`);
          startIndex = currentIndex + 1;
          parsingState = Yu;
        } else {
          throw new Error('attribute value must after "="');
        }
        break;
      case '/':
        switch (parsingState) {
          case N11:
            tagSubscription.setTagName(markup.slice(startIndex, currentIndex));
          case Yu:
          case q11:
          case fK1:
            parsingState = fK1;
            tagSubscription.closed = true;
          case Du:
          case _O:
            break;
          case Zu:
            tagSubscription.closed = true;
            break;
          default:
            throw new Error("attribute invalid close char('/')");
        }
        break;
      case '':
        errorHandler.error('unexpected end of input');
        if (parsingState === N11) {
          tagSubscription.setTagName(markup.slice(startIndex, currentIndex));
        }
        return currentIndex;
      case '>':
        switch (parsingState) {
          case N11:
            tagSubscription.setTagName(markup.slice(startIndex, currentIndex));
          case Yu:
          case q11:
          case fK1:
            break;
          case Du:
          case _O:
            attributeValue = markup.slice(startIndex, currentIndex);
            if (attributeValue.slice(-1) === '/') {
              tagSubscription.closed = true;
              attributeValue = attributeValue.slice(0, -1);
            }
          case Zu:
            if (parsingState === Zu) {
              attributeValue = attributeName;
            }
            if (parsingState === Du) {
              errorHandler.warning(`attribute "${attributeValue}" missed quot(")!`);
              addAttribute(attributeName, attributeValue, startIndex);
            } else {
              if (!M11.isHTML(context['']) || !attributeValue.match(/^(?:disabled|checked|selected)$/i)) {
                errorHandler.warning(`attribute "${attributeValue}" missed value!! "${attributeValue}" instead!!`);
              }
              addAttribute(attributeValue, attributeValue, startIndex);
            }
            break;
          case $11:
            throw new Error('attribute value missed!!');
        }
        return currentIndex;
      case '\x80':
        currentChar = ' ';
      default:
        if (currentChar <= ' ') {
          switch (parsingState) {
            case N11:
              tagSubscription.setTagName(markup.slice(startIndex, currentIndex));
              parsingState = q11;
              break;
            case _O:
              attributeName = markup.slice(startIndex, currentIndex);
              parsingState = Zu;
              break;
            case Du:
              attributeValue = markup.slice(startIndex, currentIndex);
              errorHandler.warning(`attribute "${attributeValue}" missed quot(")!!`);
              addAttribute(attributeName, attributeValue, startIndex);
            case Yu:
              parsingState = q11;
              break;
          }
        } else {
          switch (parsingState) {
            case Zu:
              // Boolean attribute (e.g., disabled, checked, selected)
              if (!M11.isHTML(context['']) || !attributeName.match(/^(?:disabled|checked|selected)$/i)) {
                errorHandler.warning(`attribute "${attributeName}" missed value!! "${attributeName}" instead2!!`);
              }
              addAttribute(attributeName, attributeName, startIndex);
              startIndex = currentIndex;
              parsingState = _O;
              break;
            case Yu:
              errorHandler.warning(`attribute space is required"${attributeName}"!!`);
            case q11:
              parsingState = _O;
              startIndex = currentIndex;
              break;
            case $11:
              parsingState = Du;
              startIndex = currentIndex;
              break;
            case fK1:
              throw new Error("elements closed character '/' and '>' must be connected to");
          }
        }
    }
    currentIndex++;
  }
}

module.exports = parseTagAttributes;