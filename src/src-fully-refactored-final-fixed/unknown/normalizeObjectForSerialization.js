/**
 * Recursively normalizes an object for safe serialization, handling circular references,
 * maximum depth, and maximum property count. Skips normalization for primitive values and
 * objects marked to skip normalization. Supports custom toJSON methods and Sentry-specific
 * normalization depth overrides.
 *
 * @param {any} key - The property key or name (used for recursion, usually empty string at root).
 * @param {any} value - The value to normalize (object, array, or primitive).
 * @param {number} [maxDepth=Infinity] - Maximum depth to recurse for normalization.
 * @param {number} [maxProperties=Infinity] - Maximum number of properties to include per object.
 * @param {[Function, Function]} [memo=bu2.memoBuilder()] - Tuple of memoization functions for circular reference detection.
 * @returns {any} The normalized value, safe for serialization.
 */
function normalizeObjectForSerialization(
  key,
  value,
  maxDepth = Infinity,
  maxProperties = Infinity,
  memo = bu2.memoBuilder()
) {
  const [isCircularReference, removeMemoizedReference] = memo;

  // Return primitives and non-object types as-is
  if (
    value == null ||
    (["number", "boolean", "string"].includes(typeof value) && !eE1.isNaN(value))
  ) {
    return value;
  }

  // Get string tag for the value (e.g., [object Object], [object Array], etc.)
  const objectTag = getObjectTypeString(key, value);
  if (!objectTag.startsWith("[object ")) {
    return objectTag;
  }

  // Skip normalization if explicitly marked
  if (value.__sentry_skip_normalization__) {
    return value;
  }

  // Allow per-object override of normalization depth
  const effectiveDepth =
    typeof value.__sentry_override_normalization_depth__ === "number"
      ? value.__sentry_override_normalization_depth__
      : maxDepth;

  // If depth is zero, return the object tag without the word 'object'
  if (effectiveDepth === 0) {
    return objectTag.replace("object ", "");
  }

  // Detect circular references
  if (isCircularReference(value)) {
    return "[Circular ~]";
  }

  // Handle custom toJSON methods safely
  if (value && typeof value.toJSON === "function") {
    try {
      const jsonValue = value.toJSON();
      return normalizeObjectForSerialization("", jsonValue, effectiveDepth - 1, maxProperties, memo);
    } catch (error) {
      // Ignore errors from toJSON
    }
  }

  // Prepare result container (array or object)
  const normalizedResult = Array.isArray(value) ? [] : {};
  let propertyCount = 0;
  const plainObject = gu2.convertToPlainObject(value);

  // Iterate over own properties only
  for (const property in plainObject) {
    if (!Object.prototype.hasOwnProperty.call(plainObject, property)) {
      continue;
    }
    if (propertyCount >= maxProperties) {
      normalizedResult[property] = "[MaxProperties ~]";
      break;
    }
    const propertyValue = plainObject[property];
    normalizedResult[property] = normalizeObjectForSerialization(
      property,
      propertyValue,
      effectiveDepth - 1,
      maxProperties,
      memo
    );
    propertyCount++;
  }

  // Remove memoized reference after processing
  removeMemoizedReference(value);
  return normalizedResult;
}

module.exports = normalizeObjectForSerialization;