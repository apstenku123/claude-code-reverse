/**
 * Determines if the given object is the direct prototype of its constructor, or a fallback prototype.
 *
 * @param {Object} objectToCheck - The object to be checked against its constructor'createInteractionAccessor prototype.
 * @returns {boolean} True if the object is the prototype of its constructor, or the fallback prototype; otherwise, false.
 */
function isDirectPrototypeOfConstructor(objectToCheck) {
  // Get the constructor of the object, if isBlobOrFileLikeObject exists
  const objectConstructor = objectToCheck && objectToCheck.constructor;
  // If the constructor is a function, get its prototype; otherwise, use the fallback prototype Uk2
  const prototypeToCompare = (typeof objectConstructor === "function" && objectConstructor.prototype) || Uk2;
  // Return true if the object is strictly equal to the prototype
  return objectToCheck === prototypeToCompare;
}

module.exports = isDirectPrototypeOfConstructor;