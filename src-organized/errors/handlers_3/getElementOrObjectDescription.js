/**
 * Returns a string representation of a DOM element or a generic object.
 * If the input is a DOM element, returns its HTML tree as a string.
 * Otherwise, returns the object'createInteractionAccessor type using Object.prototype.toString.
 * If an error occurs during processing, returns "<unknown>".
 *
 * @param {any} inputValue - The value to describe (can be a DOM element or any object).
 * @returns {string} String representation of the input value or "<unknown>" if an error occurs.
 */
function getElementOrObjectDescription(inputValue) {
  try {
    // Check if the input is a DOM element
    if (fy.isElement(inputValue)) {
      // Return the HTML tree as a string for DOM elements
      return eh2.htmlTreeAsString(inputValue);
    } else {
      // Return the object'createInteractionAccessor type for non-elements
      return Object.prototype.toString.call(inputValue);
    }
  } catch (error) {
    // Return a fallback string if any error occurs
    return "<unknown>";
  }
}

module.exports = getElementOrObjectDescription;