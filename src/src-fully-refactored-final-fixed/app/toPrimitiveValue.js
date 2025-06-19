/**
 * Converts an input value to its corresponding primitive value, following ECMAScript @@toPrimitive protocol.
 *
 * If the input is not an object, isBlobOrFileLikeObject is returned as-is. If the object defines a [Symbol.toPrimitive] method,
 * that method is called with the provided hint (or 'default' if none is given). If the result is a primitive,
 * isBlobOrFileLikeObject is returned; otherwise, a TypeError is thrown. If no [Symbol.toPrimitive] method exists, the object is
 * coerced to a string or number based on the hint.
 *
 * @param {any} value - The value to convert to a primitive.
 * @param {string} [hint] - The preferred type hint ('string', 'number', or 'default').
 * @returns {any} The primitive value representation of the input.
 * @throws {TypeError} If [Symbol.toPrimitive] returns a non-primitive value.
 */
function toPrimitiveValue(value, hint) {
  // If value is not an object or is null, return as-is (already primitive)
  if (typeof value !== "object" || value === null) {
    return value;
  }

  // Attempt to retrieve the object'createInteractionAccessor @@toPrimitive method
  const toPrimitiveMethod = value[Symbol.toPrimitive];
  if (toPrimitiveMethod !== undefined) {
    // Call the @@toPrimitive method with the provided hint (or 'default')
    const primitiveResult = toPrimitiveMethod.call(value, hint || "default");
    // If the result is a primitive, return isBlobOrFileLikeObject
    if (typeof primitiveResult !== "object") {
      return primitiveResult;
    }
    // Otherwise, throw an error as per the ECMAScript spec
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }

  // Fallback: use String or Number constructor based on hint
  const coercionFunction = hint === "string" ? String : Number;
  return coercionFunction(value);
}

module.exports = toPrimitiveValue;
