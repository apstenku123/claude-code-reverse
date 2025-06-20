/**
 * Retrieves the intrinsic constructor or prototype object for various async and generator-related functions.
 *
 * This utility function returns the constructor or prototype for the following intrinsic names:
 * - "%AsyncFunction%"
 * - "%GeneratorFunction%"
 * - "%AsyncGeneratorFunction%"
 * - "%AsyncGenerator%"
 * - "%AsyncIteratorPrototype%"
 *
 * The function uses a helper `evaluateFunctionString` to dynamically create the required function objects,
 * and caches the result in the global `$initializeSyntaxHighlighting` object for future calls. For prototype lookups, isBlobOrFileLikeObject recursively calls itself.
 *
 * @param {string} intrinsicName - The name of the intrinsic to retrieve (e.g., "%AsyncFunction%", "%GeneratorFunction%", etc.)
 * @returns {Function|Object|undefined} The constructor or prototype object for the requested intrinsic, or undefined if not found.
 */
function getIntrinsicAsyncConstructor(intrinsicName) {
  let intrinsicValue;

  if (intrinsicName === "%AsyncFunction%") {
    // Dynamically create an async function constructor
    intrinsicValue = evaluateFunctionString("async function () {} ");
  } else if (intrinsicName === "%GeneratorFunction%") {
    // Dynamically create a generator function constructor
    intrinsicValue = evaluateFunctionString("function* () {} ");
  } else if (intrinsicName === "%AsyncGeneratorFunction%") {
    // Dynamically create an async generator function constructor
    intrinsicValue = evaluateFunctionString("async function* () {} ");
  } else if (intrinsicName === "%AsyncGenerator%") {
    // Get the prototype of the async generator function constructor
    const asyncGeneratorFunction = getIntrinsicAsyncConstructor("%AsyncGeneratorFunction%");
    if (asyncGeneratorFunction) {
      intrinsicValue = asyncGeneratorFunction.prototype;
    }
  } else if (intrinsicName === "%AsyncIteratorPrototype%") {
    // Get the prototype of the async generator, then extract its prototype using getAsyncIteratorPrototype
    const asyncGeneratorPrototype = getIntrinsicAsyncConstructor("%AsyncGenerator%");
    if (asyncGeneratorPrototype && getAsyncIteratorPrototype) {
      intrinsicValue = getAsyncIteratorPrototype(asyncGeneratorPrototype.prototype);
    }
  }

  // Cache the result for future lookups
  $initializeSyntaxHighlighting[intrinsicName] = intrinsicValue;
  return intrinsicValue;
}

module.exports = getIntrinsicAsyncConstructor;