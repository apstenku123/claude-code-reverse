/**
 * Checks if the given DOM element contains at least one of the specified tag names as a child element.
 *
 * @param {Element} domElement - The DOM element to search within.
 * @param {string[]} tagNames - An array of tag names to look for as child elements.
 * @returns {boolean} True if at least one tag name is found as a child, false otherwise.
 */
function hasAnyTagName(domElement, tagNames) {
  // Ensure the domElement supports getElementsByTagName
  if (!domElement.getElementsByTagName) {
    return false;
  }

  // Check if any of the provided tag names exist as children of the domElement
  return tagNames.some(function (tagName) {
    // getElementsByTagName returns a live HTMLCollection; check if any elements exist
    return domElement.getElementsByTagName(tagName).length > 0;
  });
}

module.exports = hasAnyTagName;