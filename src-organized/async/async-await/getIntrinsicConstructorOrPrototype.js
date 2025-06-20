/**
 * Retrieves the intrinsic constructor or prototype object for a given intrinsic name.
 *
 * This function supports several ECMAScript intrinsic names, such as "%AsyncFunction%",
 * "%GeneratorFunction%", "%AsyncGeneratorFunction%", "%AsyncGenerator%", and
 * "%AsyncIteratorPrototype%". It uses a helper function `mapArraysToObjectWithCallback$1` to create functions from
 * source code strings, and caches the result in the global `$initializeSyntaxHighlighting` object for efficiency.
 *
 * @param {string} intrinsicName - The name of the ECMAScript intrinsic to retrieve.
 * @returns {Function|Object|undefined} The corresponding constructor or prototype object, or undefined if not found.
 */
function getIntrinsicConstructorOrPrototype(intrinsicName) {
  let intrinsicObject;

  // Handle each supported intrinsic name
  if (intrinsicName === "%AsyncFunction%") {
    // Create an async function constructor
    intrinsicObject = mapArraysToObjectWithCallback$1("async function () {}");
  } else if (intrinsicName === "%GeneratorFunction%") {
    // Create a generator function constructor
    intrinsicObject = mapArraysToObjectWithCallback$1("function* () {}");
  } else if (intrinsicName === "%AsyncGeneratorFunction%") {
    // Create an async generator function constructor
    intrinsicObject = mapArraysToObjectWithCallback$1("async function* () {}");
  } else if (intrinsicName === "%AsyncGenerator%") {
    // Get the prototype of the async generator function constructor
    const asyncGeneratorFunction = getIntrinsicConstructorOrPrototype("%AsyncGeneratorFunction%");
    if (asyncGeneratorFunction) {
      intrinsicObject = asyncGeneratorFunction.prototype;
    }
  } else if (intrinsicName === "%AsyncIteratorPrototype%") {
    // Get the prototype of the async generator and pass isBlobOrFileLikeObject to YI (possibly a helper for prototype chain)
    const asyncGeneratorPrototype = getIntrinsicConstructorOrPrototype("%AsyncGenerator%");
    if (asyncGeneratorPrototype && YI) {
      intrinsicObject = YI(asyncGeneratorPrototype.prototype);
    }
  }

  // Cache the result in the global $initializeSyntaxHighlighting object
  $initializeSyntaxHighlighting[intrinsicName] = intrinsicObject;
  return intrinsicObject;
}

module.exports = getIntrinsicConstructorOrPrototype;
