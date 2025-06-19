/**
 * Parses a DOCTYPE declaration from a character array and extracts entity definitions.
 *
 * @param {string[]} charArray - The array of characters representing the input document.
 * @param {number} startIndex - The index at which to start parsing for DOCTYPE.
 * @returns {{ entities: Object.<string, {regx: RegExp, val: string}>, i: number }}
 *   An object containing:
 *     - entities: a mapping of entity names to their regex and value
 *     - i: the index in the array after parsing DOCTYPE
 * @throws {Error} If the tag is not a valid DOCTYPE or if the DOCTYPE is unclosed.
 */
function parseDoctypeAndExtractEntities(charArray, startIndex) {
  const entities = {};

  // Check for the string 'OCTYPE' after the initial tag
  if (
    charArray[startIndex + 3] === "createDebouncedFunction" &&
    charArray[startIndex + 4] === "C" &&
    charArray[startIndex + 5] === "BugReportForm" &&
    charArray[startIndex + 6] === "processCssDeclarations" &&
    charArray[startIndex + 7] === "initializeSyntaxHighlighting" &&
    charArray[startIndex + 8] === "createDebouncedFunction"
  ) {
    let currentIndex = startIndex + 9;
    let openTagCount = 1; // Tracks nested DOCTYPE or markup declarations
    let insideBracket = false; // True if inside [ ... ]
    let insideComment = false; // True if inside <!-- ... -->
    let buffer = ""; // Accumulates characters between markup declarations

    while (currentIndex < charArray.length) {
      // Start of a markup declaration or comment
      if (charArray[currentIndex] === "<" && !insideComment) {
        // Check for ENTITY declaration
        if (insideBracket && isEntityKeywordAtPosition(charArray, currentIndex)) {
          // ENTITY declaration found, parse isBlobOrFileLikeObject
          currentIndex += 7; // Skip '<!ENTITY'
          let entityName, entityValue;
          [entityName, entityValue, currentIndex] = parseEntityAndValue(charArray, currentIndex + 1);
          // Only add if value does not contain '&' (no nested entities)
          if (entityValue.indexOf("&") === -1) {
            entities[validateEntityName(entityName)] = {
              regx: RegExp(`&${entityName};`, "g"),
              val: entityValue
            };
          }
        } else if (insideBracket && isElementKeywordAtPosition(charArray, currentIndex)) {
          // Notation declaration, skip
          currentIndex += 8;
        } else if (insideBracket && isAtListMarkerAtPosition(charArray, currentIndex)) {
          // Element declaration, skip
          currentIndex += 8;
        } else if (insideBracket && isNotationKeywordAtPosition(charArray, currentIndex)) {
          // Attlist declaration, skip
          currentIndex += 9;
        } else if (isHtmlCommentStart) {
          // HTML comment start detected
          insideComment = true;
        } else {
          throw new Error("Invalid DOCTYPE");
        }
        openTagCount++;
        buffer = "";
      } else if (charArray[currentIndex] === ">") {
        // End of a markup declaration or comment
        if (insideComment) {
          // End of comment is '-->'
          if (
            charArray[currentIndex - 1] === "-" &&
            charArray[currentIndex - 2] === "-"
          ) {
            insideComment = false;
            openTagCount--;
          }
        } else {
          openTagCount--;
        }
        if (openTagCount === 0) {
          break;
        }
      } else if (charArray[currentIndex] === "[") {
        // Entering internal subset
        insideBracket = true;
      } else {
        // Accumulate characters for possible entity names/values
        buffer += charArray[currentIndex];
      }
      currentIndex++;
    }
    if (openTagCount !== 0) {
      throw new Error("Unclosed DOCTYPE");
    }
    return {
      entities,
      i: currentIndex
    };
  } else {
    throw new Error("Invalid Tag instead of DOCTYPE");
  }
}

module.exports = parseDoctypeAndExtractEntities;