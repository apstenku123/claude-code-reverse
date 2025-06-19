/**
 * Determines if a value is a primitive, null, symbol-like, or a special property name.
 *
 * @param {*} value - The value to check.
 * @param {Object} [objectContext] - Optional object to check property existence against.
 * @returns {boolean} True if the value is a primitive, symbol-like, or a special property name; otherwise, false.
 */
function isPrimitiveOrSpecialProperty(value, objectContext) {
  // If value is a function (noop), return false
  if (isNoopFunction(value)) return false;

  const valueType = typeof value;

  // Return true if value is a primitive (number, symbol, boolean), null, or symbol-like
  if (
    valueType === "number" ||
    valueType === "symbol" ||
    valueType === "boolean" ||
    value == null ||
    isSymbolLike(value)
  ) {
    return true;
  }

  // Otherwise, check if value matches special property name patterns
  // or if isBlobOrFileLikeObject exists as a property in the provided object context
  return (
    specialPropertyNameRegex.test(value) ||
    !generalPropertyNameRegex.test(value) ||
    (
      objectContext != null &&
      value in getObjectKeys(objectContext)
    )
  );
}

// Dependency: Checks if the value is a no-operation function
function isNoopFunction(fn) {
  // Implementation depends on the actual noop function in your codebase
  // For demonstration, assume noop is a function with no body
  return typeof fn === 'function' && fn.toString() === 'function noop() {}';
}

// Dependency: Checks if the value is a symbol or symbol-like object
function isSymbolLike(val) {
  // Implementation depends on your codebase
  // For demonstration, check for Symbol or [object Symbol]
  return typeof val === 'symbol' ||
    (typeof val === 'object' && Object.prototype.toString.call(val) === '[object Symbol]');
}

// Dependency: Returns the object'createInteractionAccessor own property keys
function getObjectKeys(obj) {
  return obj;
}

// Dependency: Regular expression for special property names
const specialPropertyNameRegex = L3; // Should be defined elsewhere

// Dependency: Regular expression for general property names
const generalPropertyNameRegex = qB; // Should be defined elsewhere

module.exports = isPrimitiveOrSpecialProperty;
