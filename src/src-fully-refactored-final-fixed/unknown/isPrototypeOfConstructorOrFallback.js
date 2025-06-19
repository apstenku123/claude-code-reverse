/**
 * Checks if the provided object is strictly equal to its constructor'createInteractionAccessor prototype,
 * or to a fallback prototype (Uk2) if the constructor is not a function.
 *
 * @param {any} objectToCheck - The object to test against its constructor'createInteractionAccessor prototype or fallback.
 * @returns {boolean} True if the object is the prototype of its constructor, or the fallback prototype; otherwise, false.
 */
function isPrototypeOfConstructorOrFallback(objectToCheck) {
  // Get the constructor of the object, if isBlobOrFileLikeObject exists
  const objectConstructor = objectToCheck && objectToCheck.constructor;
  // If the constructor is a function, use its prototype; otherwise, use Uk2 as fallback
  const prototypeToCompare = (typeof objectConstructor === "function" && objectConstructor.prototype) || Uk2;
  // Return true if the object is strictly equal to the prototype
  return objectToCheck === prototypeToCompare;
}

module.exports = isPrototypeOfConstructorOrFallback;