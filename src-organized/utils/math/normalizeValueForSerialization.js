/**
 * Normalizes a value for serialization, handling circular references, max depth, and property limits.
 * Used to prepare objects for logging or transmission, avoiding cycles and excessive depth.
 *
 * @param {any} key - The key or property name (used for recursion, usually empty string at root).
 * @param {any} value - The value to normalize (object, array, primitive, etc.).
 * @param {number} [maxDepth=Infinity] - Maximum depth to recurse into nested objects/arrays.
 * @param {number} [maxProperties=Infinity] - Maximum number of properties to serialize per object/array.
 * @param {[Function, Function]} [memo=bu2.memoBuilder()] - Tuple of [memoize, unmemoize] functions to track circular references.
 * @returns {any} The normalized value, safe for serialization.
 */
function normalizeValueForSerialization(
  key,
  value,
  maxDepth = Infinity,
  maxProperties = Infinity,
  memo = bu2.memoBuilder()
) {
  const [memoize, unmemoize] = memo;

  // Return primitives and non-NaN values directly
  if (
    value == null ||
    (["number", "boolean", "string"].includes(typeof value) && !eE1.isNaN(value))
  ) {
    return value;
  }

  // Get the object type string (e.g., "[object Object]")
  const objectTypeString = getObjectTypeString(key, value);
  if (!objectTypeString.startsWith("[object ")) {
    return objectTypeString;
  }

  // Skip normalization if explicitly marked
  if (value.__sentry_skip_normalization__) {
    return value;
  }

  // Allow override of normalization depth per object
  const effectiveDepth =
    typeof value.__sentry_override_normalization_depth__ === "number"
      ? value.__sentry_override_normalization_depth__
      : maxDepth;

  // If depth is 0, just return the type string (without "object ")
  if (effectiveDepth === 0) {
    return objectTypeString.replace("object ", "");
  }

  // Detect circular references
  if (memoize(value)) {
    return "[Circular ~]";
  }

  // Handle toJSON if present
  if (value && typeof value.toJSON === "function") {
    try {
      const jsonValue = value.toJSON();
      return normalizeValueForSerialization("", jsonValue, effectiveDepth - 1, maxProperties, memo);
    } catch (err) {
      // Ignore errors from toJSON
    }
  }

  // Prepare output container (array or object)
  const normalized = Array.isArray(value) ? [] : {};
  let propertyCount = 0;
  const plainObject = gu2.convertToPlainObject(value);

  // Iterate over own properties
  for (const property in plainObject) {
    if (!Object.prototype.hasOwnProperty.call(plainObject, property)) {
      continue;
    }
    if (propertyCount >= maxProperties) {
      normalized[property] = "[MaxProperties ~]";
      break;
    }
    const propertyValue = plainObject[property];
    normalized[property] = normalizeValueForSerialization(
      property,
      propertyValue,
      effectiveDepth - 1,
      maxProperties,
      memo
    );
    propertyCount++;
  }

  // Remove value from memoization stack after processing
  unmemoize(value);
  return normalized;
}

module.exports = normalizeValueForSerialization;