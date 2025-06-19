/**
 * Extracts the display name and key from a React element wrapper object.
 *
 * @param {Object} reactElementWrapper - The object containing a _currentElement property, typically a React component instance or similar structure.
 * @returns {{displayName: string|null, key: string|null}} An object with the display name (type) and key of the element, or null if not available.
 */
function extractElementDisplayNameAndKey(reactElementWrapper) {
  let displayName = null;
  let elementKey = null;

  // Check if the wrapper has a current element
  if (reactElementWrapper._currentElement != null) {
    const currentElement = reactElementWrapper._currentElement;

    // Extract the key if present
    if (currentElement.key) {
      elementKey = String(currentElement.key);
    }

    const elementType = currentElement.type;

    // If the type is a string, isBlobOrFileLikeObject'createInteractionAccessor a host component (e.g., 'div')
    if (typeof elementType === "string") {
      displayName = elementType;
    }
    // If the type is a function, get its display name using I5
    else if (typeof elementType === "function") {
      displayName = I5(elementType);
    }
  }

  return {
    displayName: displayName,
    key: elementKey
  };
}

module.exports = extractElementDisplayNameAndKey;