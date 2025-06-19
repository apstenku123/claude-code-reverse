/**
 * Parses an XML string and processes its elements, attributes, and entities.
 * Handles namespaces, character references, and error reporting.
 *
 * @param {string} xmlString - The XML string to parse.
 * @param {Object} namespaceMap - The initial namespace mapping.
 * @param {Object} entityMap - Map of named entities (e.g., { amp: '&', lt: '<' }).
 * @param {Object} handler - SAX-like handler with callbacks for parsing events.
 * @param {Object} errorReporter - Object with error, warning, and fatalError methods.
 * @returns {void}
 */
function parseXMLString(xmlString, namespaceMap, entityMap, handler, errorReporter) {
  /**
   * Converts a Unicode code point to a string, handling surrogate pairs if needed.
   * @param {number} codePoint
   * @returns {string}
   */
  function codePointToString(codePoint) {
    if (codePoint > 65535) {
      codePoint -= 65536;
      const highSurrogate = 55296 + (codePoint >> 10);
      const lowSurrogate = 56320 + (codePoint & 1023);
      return String.fromCharCode(highSurrogate, lowSurrogate);
    } else {
      return String.fromCharCode(codePoint);
    }
  }

  /**
   * Resolves an entity reference to its value.
   * @param {string} entityString
   * @returns {string}
   */
  function resolveEntity(entityString) {
    const entityName = entityString.slice(1, -1);
    if (Object.hasOwnProperty.call(entityMap, entityName)) {
      return entityMap[entityName];
    } else if (entityName.charAt(0) === "#") {
      // Numeric character reference
      return codePointToString(parseInt(entityName.substr(1).replace("x", "0x")));
    } else {
      errorReporter.error("entity not found:" + entityString);
      return entityString;
    }
  }

  /**
   * Emits character data between the last processed position and the given index.
   * @param {number} nextIndex
   */
  function emitCharacters(nextIndex) {
    if (nextIndex > currentIndex) {
      const text = xmlString.substring(currentIndex, nextIndex).replace(/&#?\w+;/g, resolveEntity);
      if (locator) updateLocator(currentIndex);
      handler.characters(text, 0, nextIndex - currentIndex);
      currentIndex = nextIndex;
    }
  }

  /**
   * Updates the locator'createInteractionAccessor line and column numbers based on the current position.
   * @param {number} position
   */
  function updateLocator(position) {
    while (position >= locatorMatchEnd && (locatorMatch = lineRegExp.exec(xmlString))) {
      locatorMatchStart = locatorMatch.index;
      locatorMatchEnd = locatorMatchStart + locatorMatch[0].length;
      locator.lineNumber++;
    }
    locator.columnNumber = position - locatorMatchStart + 1;
  }

  let locatorMatchStart = 0;
  let locatorMatchEnd = 0;
  const lineRegExp = /.*(?:\r\n?|\n)|.*$/g;
  const locator = handler.locator;
  const elementStack = [{ currentNSMap: namespaceMap }];
  const tagNameCache = {};
  let currentIndex = 0;

  while (true) {
    try {
      const nextTagIndex = xmlString.indexOf("<", currentIndex);
      if (nextTagIndex < 0) {
        // No more tags; emit remaining text if not just whitespace
        if (!xmlString.substr(currentIndex).match(/^\s*$/)) {
          const doc = handler.doc;
          const textNode = doc.createTextNode(xmlString.substr(currentIndex));
          doc.appendChild(textNode);
          handler.currentElement = textNode;
        }
        return;
      }
      if (nextTagIndex > currentIndex) emitCharacters(nextTagIndex);

      let tagEndIndex;
      switch (xmlString.charAt(nextTagIndex + 1)) {
        case "/": {
          // End tag
          tagEndIndex = xmlString.indexOf(">", nextTagIndex + 3);
          let rawTagName = xmlString.substring(nextTagIndex + 2, tagEndIndex).replace(/[ \processRuleBeginHandlers\n\r]+$/g, "");
          const lastElement = elementStack.pop();
          if (tagEndIndex < 0) {
            rawTagName = xmlString.substring(nextTagIndex + 2).replace(/[\s<].*/, "");
            errorReporter.error(`end tag name: ${rawTagName} is not complete:${lastElement.tagName}`);
            tagEndIndex = nextTagIndex + 1 + rawTagName.length;
          } else if (rawTagName.match(/\s</)) {
            rawTagName = rawTagName.replace(/[\s<].*/, "");
            errorReporter.error(`end tag name: ${rawTagName} maybe not complete`);
            tagEndIndex = nextTagIndex + 1 + rawTagName.length;
          }
          const localNSMap = lastElement.localNSMap;
          const tagNameMatches = lastElement.tagName === rawTagName;
          const tagNameMatchesCaseInsensitive = tagNameMatches || (lastElement.tagName && lastElement.tagName.toLowerCase() === rawTagName.toLowerCase());
          if (tagNameMatchesCaseInsensitive) {
            handler.endElement(lastElement.uri, lastElement.localName, rawTagName);
            if (localNSMap) {
              for (const prefix in localNSMap) {
                if (Object.prototype.hasOwnProperty.call(localNSMap, prefix)) {
                  handler.endPrefixMapping(prefix);
                }
              }
            }
            if (!tagNameMatches) {
              errorReporter.fatalError(`end tag name: ${rawTagName} is not match the current start tagName:${lastElement.tagName}`);
            }
          } else {
            // Tag mismatch; push back
            elementStack.push(lastElement);
          }
          tagEndIndex++;
          break;
        }
        case "?": {
          // Processing instruction
          if (locator) updateLocator(nextTagIndex);
          tagEndIndex = parseProcessingInstruction(xmlString, nextTagIndex, handler);
          break;
        }
        case "!": {
          // Comment or doctype
          if (locator) updateLocator(nextTagIndex);
          tagEndIndex = parseMarkupDeclaration(xmlString, nextTagIndex, handler, errorReporter);
          break;
        }
        default: {
          // Start tag
          if (locator) updateLocator(nextTagIndex);
          const tagObject = new eE2();
          const currentNSMap = elementStack[elementStack.length - 1].currentNSMap;
          tagEndIndex = parseTagAttributes(xmlString, nextTagIndex, tagObject, currentNSMap, resolveEntity, errorReporter);
          const attributeCount = tagObject.length;
          if (!tagObject.closed && isTagBeforePosition(xmlString, tagEndIndex, tagObject.tagName, tagNameCache)) {
            tagObject.closed = true;
            if (!entityMap.nbsp) errorReporter.warning("unclosed xml attribute");
          }
          if (locator && attributeCount) {
            const locatorSnapshot = copyLineAndColumnNumbers(locator, {});
            for (let i = 0; i < attributeCount; i++) {
              const attribute = tagObject[i];
              updateLocator(attribute.offset);
              attribute.locator = copyLineAndColumnNumbers(locator, {});
            }
            if (handler.locator = locatorSnapshot, processElementWithNamespaces(tagObject, handler, currentNSMap)) {
              elementStack.push(tagObject);
            }
            handler.locator = locator;
          } else if (processElementWithNamespaces(tagObject, handler, currentNSMap)) {
            elementStack.push(tagObject);
          }
          if (M11.isHTML(tagObject.uri) && !tagObject.closed) {
            tagEndIndex = LY5(xmlString, tagEndIndex, tagObject.tagName, resolveEntity, handler);
          } else {
            tagEndIndex++;
          }
        }
      }
    } catch (parseError) {
      if (parseError instanceof CustomError) throw parseError;
      errorReporter.error("element parse error: " + parseError);
      tagEndIndex = -1;
    }
    if (tagEndIndex > currentIndex) {
      currentIndex = tagEndIndex;
    } else {
      emitCharacters(Math.max(nextTagIndex, currentIndex) + 1);
    }
  }
}

module.exports = parseXMLString;