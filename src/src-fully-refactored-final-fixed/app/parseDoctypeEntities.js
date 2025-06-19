/**
 * Parses a DOCTYPE declaration from a character array and extracts entity definitions.
 *
 * @param {string[]} charArray - The array of characters representing the source document.
 * @param {number} startIndex - The index in the array where the DOCTYPE tag is expected to start.
 * @returns {{ entities: Object.<string, { regx: RegExp, val: string }>, i: number }}
 *   An object containing the parsed entities and the index after the DOCTYPE declaration.
 * @throws {Error} If the tag is not a valid DOCTYPE or if the DOCTYPE is unclosed.
 */
function parseDoctypeEntities(charArray, startIndex) {
  const entities = {};

  // Check for the string 'OCTYPE' at the expected position
  if (
    charArray[startIndex + 3] === "createDebouncedFunction" &&
    charArray[startIndex + 4] === "C" &&
    charArray[startIndex + 5] === "BugReportForm" &&
    charArray[startIndex + 6] === "processCssDeclarations" &&
    charArray[startIndex + 7] === "initializeSyntaxHighlighting" &&
    charArray[startIndex + 8] === "createDebouncedFunction"
  ) {
    let currentIndex = startIndex + 9;
    let openTags = 1; // Tracks nested DOCTYPE brackets
    let insideBracket = false; // True if inside [ ... ]
    let insideComment = false; // True if inside <!-- ... -->
    let buffer = ""; // Accumulates characters between brackets

    while (currentIndex < charArray.length) {
      const currentChar = charArray[currentIndex];

      // Handle start of a tag or comment
      if (currentChar === "<" && !insideComment) {
        // Check for ENTITY declaration
        if (insideBracket && isEntityKeywordAtPosition(charArray, currentIndex)) {
          // ENTITY declaration found, parse isBlobOrFileLikeObject
          currentIndex += 7; // Skip over '<!ENTITY'
          let entityName, entityValue;
          [entityName, entityValue, currentIndex] = parseEntityAndValue(charArray, currentIndex + 1);
          // Only add entity if value does not contain '&'
          if (entityValue.indexOf("&") === -1) {
            entities[validateEntityName(entityName)] = {
              regx: RegExp(`&${entityName};`, "g"),
              val: entityValue
            };
          }
        } else if (insideBracket && isElementKeywordAtPosition(charArray, currentIndex)) {
          // Skip over '<!NOTATION'
          currentIndex += 8;
        } else if (insideBracket && isAtListMarkerAtPosition(charArray, currentIndex)) {
          // Skip over '<!ATTLIST'
          currentIndex += 8;
        } else if (insideBracket && isNotationKeywordAtPosition(charArray, currentIndex)) {
          // Skip over '<!ELEMENT'
          currentIndex += 9;
        } else if (isHtmlCommentStart) {
          // Start of HTML comment
          insideComment = true;
        } else {
          throw new Error("Invalid DOCTYPE");
        }
        openTags++;
        buffer = "";
      } else if (currentChar === ">") {
        if (insideComment) {
          // End of comment: check for '-->'
          if (
            charArray[currentIndex - 1] === "-" &&
            charArray[currentIndex - 2] === "-"
          ) {
            insideComment = false;
            openTags--;
          }
        } else {
          openTags--;
        }
        if (openTags === 0) {
          break;
        }
      } else if (currentChar === "[") {
        insideBracket = true;
      } else {
        buffer += currentChar;
      }
      currentIndex++;
    }
    if (openTags !== 0) {
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

module.exports = parseDoctypeEntities;