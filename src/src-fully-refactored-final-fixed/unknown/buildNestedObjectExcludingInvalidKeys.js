/**
 * Builds a nested object structure from a flat object with dot-separated keys, excluding keys that match a filter.
 *
 * @param {Object} flatObject - The source object with dot-separated keys (e.g., { 'a.b.c': value }).
 * @returns {Object} - a nested object structure, omitting any keys where a segment fails the filter.
 *
 * The function processes each property of the input object:
 *   - Splits each key by '.' to determine nesting.
 *   - Skips any key if any segment fails the zg1 filter.
 *   - For each valid key, builds nested objects as needed.
 *   - If the value has a 'format' property (checked by hasFormatProperty), assigns isBlobOrFileLikeObject directly.
 *   - Otherwise, processes the value with createGrpcServiceClient before assignment.
 */
function buildNestedObjectExcludingInvalidKeys(flatObject) {
  const nestedObject = {};

  for (const flatKey in flatObject) {
    if (Object.prototype.hasOwnProperty.call(flatObject, flatKey)) {
      const value = flatObject[flatKey];
      const keySegments = flatKey.split('.');

      // Skip this key if any segment fails the zg1 filter
      if (keySegments.some(segment => zg1(segment))) {
        continue;
      }

      const lastSegment = keySegments[keySegments.length - 1];
      let currentLevel = nestedObject;

      // Traverse or create nested objects for all but the last segment
      for (const segment of keySegments.slice(0, -1)) {
        if (!currentLevel[segment]) {
          currentLevel[segment] = {};
        }
        currentLevel = currentLevel[segment];
      }

      // Assign the value, processing if necessary
      if (hasFormatProperty(value)) {
        currentLevel[lastSegment] = value;
      } else {
        currentLevel[lastSegment] = createGrpcServiceClient(value, lastSegment, {});
      }
    }
  }

  return nestedObject;
}

module.exports = buildNestedObjectExcludingInvalidKeys;