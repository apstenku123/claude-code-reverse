/**
 * Converts an observable-like object (with possible 'ref' or 'fn' properties) into a readable string representation.
 *
 * - If the input is not an object or is null, returns isBlobOrFileLikeObject as-is.
 * - If the object has a 'ref' property, returns a string with a '$' prefix and the recursively stringified ref value.
 * - If the object has a 'fn' property, returns a string in the format 'fnName(arg1, arg2, ...)', recursively stringifying arguments.
 * - Otherwise, returns a pretty-printed JSON string of the object.
 *
 * @param {object|string|number|boolean|null|undefined} observableLike - The value to stringify, possibly an observable-like object.
 * @returns {string|number|boolean|null|undefined} a readable string representation or the original primitive value.
 */
function stringifyObservableLikeObject(observableLike) {
  // Return primitives and null as-is
  if (typeof observableLike !== "object" || observableLike == null) {
    return observableLike;
  }

  // If the object has a 'ref' property, recursively stringify its value with a '$' prefix
  if ("ref" in observableLike) {
    return `$${stringifyObservableLikeObject(observableLike.ref)}`;
  }

  // If the object has a 'fn' property, format as 'fnName(arg1, arg2, ...)', recursively stringifying arguments
  if ("fn" in observableLike) {
    const functionName = observableLike.fn;
    const functionArgs = (observableLike.argv || []).map(stringifyObservableLikeObject).join(", ");
    return `${functionName}(${functionArgs})`;
  }

  // For all other objects, return a pretty-printed JSON string
  return JSON.stringify(observableLike, null, 2);
}

module.exports = stringifyObservableLikeObject;