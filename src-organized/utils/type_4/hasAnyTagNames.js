/**
 * Checks if the given DOM element contains at least one element for any of the specified tag names.
 *
 * @param {Element} domElement - The DOM element to search within.
 * @param {string[]} tagNames - An array of tag names to search for within the DOM element.
 * @returns {boolean} True if at least one tag name exists within the DOM element, otherwise false.
 */
function hasAnyTagNames(domElement, tagNames) {
  // Ensure the DOM element supports getElementsByTagName
  if (!domElement.getElementsByTagName) {
    return false;
  }

  // Check if any of the provided tag names exist within the DOM element
  return tagNames.some(function(tagName) {
    // getElementsByTagName returns a live HTMLCollection; check if any elements are found
    return domElement.getElementsByTagName(tagName).length > 0;
  });
}

module.exports = hasAnyTagNames;