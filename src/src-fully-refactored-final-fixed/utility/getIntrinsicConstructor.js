/**
 * Retrieves the intrinsic constructor or prototype object for a given intrinsic name.
 *
 * This function maps well-known intrinsic names (such as "%AsyncFunction%", "%GeneratorFunction%", etc.)
 * to their corresponding constructors or prototypes by evaluating function strings or recursively resolving dependencies.
 * The result is cached in the $initializeSyntaxHighlighting object for future calls.
 *
 * @param {string} intrinsicName - The name of the intrinsic to retrieve (e.g., "%AsyncFunction%", "%GeneratorFunction%", etc.).
 * @returns {Function|Object|undefined} The constructor function or prototype object for the given intrinsic, or undefined if not found.
 */
function getIntrinsicConstructor(intrinsicName) {
  let intrinsicValue;

  // Handle AsyncFunction
  if (intrinsicName === "%AsyncFunction%") {
    intrinsicValue = mapArraysToObjectWithCallback$1("async function () {}");
  }
  // Handle GeneratorFunction
  else if (intrinsicName === "%GeneratorFunction%") {
    intrinsicValue = mapArraysToObjectWithCallback$1("function* () {}");
  }
  // Handle AsyncGeneratorFunction
  else if (intrinsicName === "%AsyncGeneratorFunction%") {
    intrinsicValue = mapArraysToObjectWithCallback$1("async function* () {}");
  }
  // Handle AsyncGenerator (prototype of AsyncGeneratorFunction)
  else if (intrinsicName === "%AsyncGenerator%") {
    const asyncGeneratorFunction = getIntrinsicConstructor("%AsyncGeneratorFunction%");
    if (asyncGeneratorFunction) {
      intrinsicValue = asyncGeneratorFunction.prototype;
    }
  }
  // Handle AsyncIteratorPrototype (prototype of AsyncGenerator)
  else if (intrinsicName === "%AsyncIteratorPrototype%") {
    const asyncGenerator = getIntrinsicConstructor("%AsyncGenerator%");
    // YI is assumed to be a function that retrieves the prototype chain
    if (asyncGenerator && YI) {
      intrinsicValue = YI(asyncGenerator.prototype);
    }
  }

  // Cache the result for future calls
  $initializeSyntaxHighlighting[intrinsicName] = intrinsicValue;
  return intrinsicValue;
}

module.exports = getIntrinsicConstructor;