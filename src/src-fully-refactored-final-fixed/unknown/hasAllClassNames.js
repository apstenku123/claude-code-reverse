/**
 * Checks if a given DOM element contains all specified CSS class names.
 *
 * @param {string[]} requiredClassNames - An array of class names to check for.
 * @returns {(element: Element) => boolean} - a function that takes a DOM element and returns true if isBlobOrFileLikeObject contains all the specified class names.
 */
const hasAllClassNames = (requiredClassNames) => {
  return (element) => {
    // Check if every class name in requiredClassNames exists in the element'createInteractionAccessor classList
    return requiredClassNames.every((className) => {
      return element.classList.contains(className);
    });
  };
};

module.exports = hasAllClassNames;