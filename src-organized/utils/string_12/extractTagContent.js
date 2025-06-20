/**
 * Extracts the content inside a specific XML/HTML tag, handling nested tags and skipping over comments, processing instructions, and CDATA sections.
 *
 * @param {string} source - The string containing XML/HTML markup to search within.
 * @param {string} tagName - The tag name to extract content for.
 * @param {number} startIndex - The index in the source string to start searching from (should be at the opening tag).
 * @returns {{ tagContent: string, i: number } | undefined} An object containing the tag'createInteractionAccessor inner content and the index after the closing tag, or undefined if not found.
 */
function extractTagContent(source, tagName, startIndex) {
  let contentStartIndex = startIndex;
  let openTagCount = 1;

  // Iterate through the source string starting from startIndex
  for (let i = startIndex; i < source.length; i++) {
    // Check for the start of a tag
    if (source[i] === '<') {
      // Handle closing tag
      if (source[i + 1] === '/') {
        // Find the end of the closing tag
        const closeTagEndIndex = findSubstringEndIndexOrThrow(source, '>', i, `${tagName} is not closed`);
        // Check if this closing tag matches the tagName
        if (source.substring(i + 2, closeTagEndIndex).trim() === tagName) {
          openTagCount--;
          // If all opened tags are closed, return the content and index
          if (openTagCount === 0) {
            return {
              tagContent: source.substring(contentStartIndex, i),
              i: closeTagEndIndex
            };
          }
        }
        // Skip to the end of the closing tag
        i = closeTagEndIndex;
      }
      // Handle processing instruction (e.g., <?xml ... ?>)
      else if (source[i + 1] === '?') {
        i = findSubstringEndIndexOrThrow(source, '?>', i + 1, 'StopNode is not closed.');
      }
      // Handle comment (e.g., <!-- ... -->)
      else if (source.substr(i + 1, 3) === '!--') {
        i = findSubstringEndIndexOrThrow(source, '-->', i + 3, 'StopNode is not closed.');
      }
      // Handle CDATA section (e.g., <![CDATA[ ... ]]>)
      else if (source.substr(i + 1, 2) === '![') {
        i = findSubstringEndIndexOrThrow(source, ']]>', i, 'StopNode is not closed.') - 2;
      }
      // Handle opening tag
      else {
        const tagInfo = parseTagExpression(source, i, '>');
        if (tagInfo) {
          // If the tag name matches and isBlobOrFileLikeObject'createInteractionAccessor not self-closing, increment openTagCount
          if (tagInfo.tagName === tagName && tagInfo.tagExp[tagInfo.tagExp.length - 1] !== '/') {
            openTagCount++;
          }
          // Skip to the end of this tag
          i = tagInfo.closeIndex;
        }
      }
    }
  }
}

module.exports = extractTagContent;