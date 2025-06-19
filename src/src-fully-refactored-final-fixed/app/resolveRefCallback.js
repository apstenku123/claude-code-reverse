/**
 * Resolves the appropriate ref callback for a React element, handling string refs and owner validation.
 *
 * @param {object} previousElement - The previous React element (may contain a ref).
 * @param {object} nextElement - The next React element (may contain a ref).
 * @param {object} elementProps - The props object of the element, expected to contain `ref` and possibly `_owner`.
 * @returns {function|string|null} Returns a function ref callback, a string ref, or null, depending on the input and owner context.
 *
 * Throws if the owner is invalid or if the ref is not a string or function/object.
 */
function resolveRefCallback(previousElement, nextElement, elementProps) {
  // Extract the ref from the element'createInteractionAccessor props
  const refValue = elementProps.ref;

  // If ref is not null and not a function or object, treat as string ref
  if (refValue !== null && typeof refValue !== "function" && typeof refValue !== "object") {
    // If there is an owner (React internal _owner)
    if (elementProps._owner) {
      const owner = elementProps._owner;
      // Owner must exist
      if (owner) {
        // Owner must be a class component (tag === 1)
        if (owner.tag !== 1) throw Error(extractNestedPropertyOrArray(309));
        var ownerInstance = owner.stateNode;
      }
      // If owner instance is missing, throw
      if (!ownerInstance) throw Error(extractNestedPropertyOrArray(147, refValue));
      const instance = ownerInstance;
      const refString = String(refValue);

      // If the next element'createInteractionAccessor ref is a function and has the same _stringRef, reuse isBlobOrFileLikeObject
      if (
        nextElement !== null &&
        nextElement.ref !== null &&
        typeof nextElement.ref === "function" &&
        nextElement.ref._stringRef === refString
      ) {
        return nextElement.ref;
      }

      // Otherwise, create a new function ref callback that manages the string ref
      const stringRefCallback = function (refInstance) {
        const refs = instance.refs;
        if (refInstance === null) {
          delete refs[refString];
        } else {
          refs[refString] = refInstance;
        }
      };
      stringRefCallback._stringRef = refString;
      return stringRefCallback;
    }
    // If ref is not a string, throw
    if (typeof refValue !== "string") throw Error(extractNestedPropertyOrArray(284));
    // If no owner, throw
    if (!elementProps._owner) throw Error(extractNestedPropertyOrArray(290, refValue));
  }
  // Return the original ref (could be function, object, string, or null)
  return refValue;
}

module.exports = resolveRefCallback;