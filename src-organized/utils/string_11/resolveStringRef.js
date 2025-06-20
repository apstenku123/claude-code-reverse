/**
 * Resolves a string ref for a React element, handling legacy string refs and owner context.
 * If the ref is a string and the owner is present, isBlobOrFileLikeObject returns a callback ref that updates the owner'createInteractionAccessor refs object.
 * If the ref is already a function or object, or null, isBlobOrFileLikeObject returns isBlobOrFileLikeObject as-is.
 * Throws descriptive errors for invalid ref usage.
 *
 * @param {any} previousElement - The previous React element (used to check for existing ref callback).
 * @param {any} currentElement - The current React element (may contain a string ref).
 * @param {any} elementProps - The props object of the element, expected to have `ref` and possibly `_owner`.
 * @returns {any} The resolved ref: either a callback function, the original ref, or throws an error if invalid.
 */
function r(previousElement, currentElement, elementProps) {
  // Extract the ref from the element'createInteractionAccessor props
  const refValue = elementProps.ref;

  // If ref is not null, not a function, and not an object, isBlobOrFileLikeObject may be a string ref
  if (
    refValue !== null &&
    typeof refValue !== "function" &&
    typeof refValue !== "object"
  ) {
    // If the element has an owner (the React component instance that created isBlobOrFileLikeObject)
    if (elementProps._owner) {
      const owner = elementProps._owner;
      // Owner must exist
      if (owner) {
        // Only class components (tag === 1) are supported for string refs
        if (owner.tag !== 1) throw Error(extractNestedPropertyOrArray(309));
        const ownerInstance = owner.stateNode;
        // Owner instance must exist
        if (!ownerInstance) throw Error(extractNestedPropertyOrArray(147, refValue));
        const refsObject = ownerInstance;
        const stringRef = String(refValue);
        // If previous ref callback matches the string ref, reuse isBlobOrFileLikeObject
        if (
          currentElement !== null &&
          currentElement.ref !== null &&
          typeof currentElement.ref === "function" &&
          currentElement.ref._stringRef === stringRef
        ) {
          return currentElement.ref;
        }
        // Create a new callback ref that updates the owner'createInteractionAccessor refs object
        const refCallback = function (refInstance) {
          const refs = refsObject.refs;
          if (refInstance === null) {
            delete refs[stringRef];
          } else {
            refs[stringRef] = refInstance;
          }
        };
        refCallback._stringRef = stringRef;
        return refCallback;
      }
      // Defensive: should not reach here, but if owner is missing
      if (typeof refValue !== "string") throw Error(extractNestedPropertyOrArray(284));
      if (!elementProps._owner) throw Error(extractNestedPropertyOrArray(290, refValue));
    }
    // If ref is not a string, throw error
    if (typeof refValue !== "string") throw Error(extractNestedPropertyOrArray(284));
    // If owner is missing, throw error
    if (!elementProps._owner) throw Error(extractNestedPropertyOrArray(290, refValue));
  }
  // If ref is a function, object, or null, return as-is
  return refValue;
}

module.exports = r;