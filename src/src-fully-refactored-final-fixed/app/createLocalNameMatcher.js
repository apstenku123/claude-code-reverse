/**
 * Determines if a given localName matches the provided tag name, accounting for case sensitivity in HTML.
 *
 * If the tag name is already in lower case, delegates to the createLocalNameMatcher function for matching.
 * Otherwise, returns a matcher function that checks localName equality based on whether the context is HTML.
 *
 * @param {string} tagName - The tag name to match against (may be mixed or upper case).
 * @returns {function|any} If tagName is lower case, returns the result of createLocalNameMatcher(tagName). Otherwise, returns a matcher function.
 */
function createLocalNameMatcher(tagName) {
  // Convert the tag name to lower case using the provided utility
  const lowerCaseTagName = q3.toASCIILowerCase(tagName);

  // If the tag name is already lower case, use the optimized createLocalNameMatcher function
  if (lowerCaseTagName === tagName) {
    return createLocalNameMatcher(tagName);
  }

  // Otherwise, return a matcher function that checks localName equality
  return function (elementContext) {
    // If the context is HTML, compare with lower case; otherwise, compare with original tag name
    return elementContext.isHTML
      ? elementContext.localName === lowerCaseTagName
      : elementContext.localName === tagName;
  };
}

module.exports = createLocalNameMatcher;