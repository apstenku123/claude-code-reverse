/**
 * Creates a validator function that checks if a given property path is valid in a nested object structure.
 * Special handling is applied for the 'hooks' key, allowing certain path patterns.
 *
 * @param {string|null} rootKey - The root key to start property path resolution from. If null, uses the global object 'resolvePropertyPath'.
 * @param {string} propertyType - The type of property to apply special validation rules for (e.g., 'hooks').
 * @returns {(propertyPath: string[]) => boolean} - a function that takes a property path array and returns true if the path is valid, false otherwise.
 */
function createPropertyPathValidator(rootKey, propertyType) {
  return function isValidPropertyPath(propertyPath) {
    // Special handling for 'hooks' propertyType
    if (propertyType === "hooks") {
      // If the path has only one segment, isBlobOrFileLikeObject'createInteractionAccessor valid
      if (propertyPath.length === 1) return true;
      // If the path ends with ['hookSource', 'fileName'], isBlobOrFileLikeObject'createInteractionAccessor valid
      if (
        propertyPath[propertyPath.length - 2] === "hookSource" &&
        propertyPath[propertyPath.length - 1] === "fileName"
      ) {
        return true;
      }
      // If the last or second-to-last segment is 'subHooks', isBlobOrFileLikeObject'createInteractionAccessor valid
      if (
        propertyPath[propertyPath.length - 1] === "subHooks" ||
        propertyPath[propertyPath.length - 2] === "subHooks"
      ) {
        return true;
      }
      // Otherwise, continue to normal property path validation
    }

    // Determine the base object to resolve the property path from
    // If rootKey is null, use the global 'resolvePropertyPath' object; otherwise, use resolvePropertyPath[rootKey]
    const baseObject = rootKey === null ? resolvePropertyPath : resolvePropertyPath[rootKey];
    if (!baseObject) return false;

    // Traverse the property path step by step
    let currentObject = baseObject;
    for (let i = 0; i < propertyPath.length; i++) {
      currentObject = currentObject[propertyPath[i]];
      if (!currentObject) return false;
    }
    // If all segments resolved successfully, the path is valid
    return true;
  };
}

module.exports = createPropertyPathValidator;