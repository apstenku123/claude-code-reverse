/**
 * Resolves a child element based on its type, key, and value.
 * Handles primitive values, React elements, lazy elements, and iterable/array types.
 *
 * @param {object} parentElement - The parent element or context.
 * @param {object|null} previousElement - The previous element (may be null).
 * @param {any} childValue - The value of the child (string, number, object, etc).
 * @param {number} index - The index or position of the child.
 * @returns {object|null} The resolved child element, or null if not matched.
 */
function resolveChildElement(parentElement, previousElement, childValue, index) {
  // Extract the key from the previous element, if present
  const previousKey = previousElement !== null ? previousElement.key : null;

  // Handle primitive child values (string or number)
  if ((typeof childValue === "string" && childValue !== "") || typeof childValue === "number") {
    // If a key exists, do not create a new element
    return previousKey !== null ? null : createElement(parentElement, previousElement, String(childValue), index);
  }

  // Handle object child values (React elements, lazy elements, iterables, etc)
  if (typeof childValue === "object" && childValue !== null) {
    switch (childValue.$$typeof) {
      case REACT_ELEMENT_TYPE:
        // If keys match, reuse the element; otherwise, return null
        return childValue.key === previousKey ? updateElement(parentElement, previousElement, childValue, index) : null;
      case REACT_PORTAL_TYPE:
        // If keys match, reuse the portal; otherwise, return null
        return childValue.key === previousKey ? updatePortal(parentElement, previousElement, childValue, index) : null;
      case REACT_LAZY_TYPE:
        // For lazy elements, resolve the payload and recurse
        const initializeLazy = childValue._init;
        return resolveChildElement(parentElement, previousElement, initializeLazy(childValue._payload), index);
    }
    // Handle arrays or iterables
    if (isArray(childValue) || isIterable(childValue)) {
      // If a key exists, do not create a new element
      return previousKey !== null ? null : createFragment(parentElement, previousElement, childValue, index, null);
    }
    // If not handled, report an error
    reportInvalidChild(parentElement, childValue);
  }
  // If no valid child, return null
  return null;
}

module.exports = resolveChildElement;