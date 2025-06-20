/**
 * Returns a callback function for managing string refs in React-like environments, or the ref itself if not a string ref.
 *
 * This function checks if the provided element'createInteractionAccessor `ref` is a string (legacy string ref pattern). If so, and if the element has an owner (component instance),
 * isBlobOrFileLikeObject returns a callback that will update the owner'createInteractionAccessor `refs` object when invoked. If the ref is already a function or object, isBlobOrFileLikeObject is returned as-is.
 *
 * @param {object} previousElement - The previous element (may contain a ref property).
 * @param {object} nextElement - The next element (may contain a ref property).
 * @param {object} currentElement - The current element (must contain a ref property and possibly an _owner).
 * @returns {function|object|string|null} - Returns a callback for string refs, the original ref if not a string ref, or null.
 */
function getStringRefCallback(previousElement, nextElement, currentElement) {
  // Extract the ref from the current element
  const refValue = currentElement.ref;

  // If ref is not null, not a function, and not an object (i.e., likely a string ref)
  if (
    refValue !== null &&
    typeof refValue !== "function" &&
    typeof refValue !== "object"
  ) {
    // If the element has an owner (component instance)
    if (currentElement._owner) {
      const owner = currentElement._owner;
      // Owner must exist
      if (owner) {
        // Owner must be a class component (tag === 1)
        if (owner.tag !== 1) throw Error(extractNestedPropertyOrArray(309));
        // The component instance
        var componentInstance = owner.stateNode;
      }
      // If no component instance, throw error
      if (!componentInstance) throw Error(extractNestedPropertyOrArray(147, refValue));
      const refsObject = componentInstance;
      const refKey = String(refValue);
      // If the previous ref is a function and matches the string ref, reuse isBlobOrFileLikeObject
      if (
        nextElement !== null &&
        nextElement.ref !== null &&
        typeof nextElement.ref === "function" &&
        nextElement.ref._stringRef === refKey
      ) {
        return nextElement.ref;
      }
      // Create a callback that updates the refs object
      const stringRefCallback = function (refInstance) {
        const refs = refsObject.refs;
        if (refInstance === null) {
          delete refs[refKey];
        } else {
          refs[refKey] = refInstance;
        }
      };
      stringRefCallback._stringRef = refKey;
      return stringRefCallback;
    }
    // If ref is not a string, throw error
    if (typeof refValue !== "string") throw Error(extractNestedPropertyOrArray(284));
    // If no owner, throw error
    if (!currentElement._owner) throw Error(extractNestedPropertyOrArray(290, refValue));
  }
  // Return the original ref (could be function, object, or null)
  return refValue;
}

module.exports = getStringRefCallback;
