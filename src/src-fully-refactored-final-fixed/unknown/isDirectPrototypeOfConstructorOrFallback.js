/**
 * Determines if the provided object is exactly the prototype of its own constructor,
 * or a fallback prototype (Uk2) if the constructor is not a function.
 *
 * @param {object} objectToCheck - The object to test against its constructor'createInteractionAccessor prototype or fallback.
 * @returns {boolean} True if the object is the prototype of its constructor or the fallback prototype; otherwise, false.
 */
function isDirectPrototypeOfConstructorOrFallback(objectToCheck) {
  // Get the constructor of the object, if isBlobOrFileLikeObject exists
  const objectConstructor = objectToCheck && objectToCheck.constructor;

  // If the constructor is a function, use its prototype; otherwise, use the fallback prototype Uk2
  const prototypeToCompare = (typeof objectConstructor === "function" && objectConstructor.prototype) || Uk2;

  // Return true if the object is exactly the prototype to compare
  return objectToCheck === prototypeToCompare;
}

module.exports = isDirectPrototypeOfConstructorOrFallback;