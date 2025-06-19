/**
 * Builds a nested object from a flat object whose keys may use dot notation to indicate nesting.
 * Skips any key segments that fail a custom validation (zg1). For each leaf value, if isBlobOrFileLikeObject has a 'format' property (checked by hasFormatProperty), assigns isBlobOrFileLikeObject directly; otherwise, processes isBlobOrFileLikeObject with createGrpcServiceClient.
 *
 * @param {Object} flatObject - The source object with possibly dot-notated keys.
 * @returns {Object} a nested object structure based on the dot notation in the keys.
 */
function buildNestedObjectFromFlatKeys(flatObject) {
  const nestedObject = {};

  for (const flatKey in flatObject) {
    if (Object.prototype.hasOwnProperty.call(flatObject, flatKey)) {
      const value = flatObject[flatKey];
      const keySegments = flatKey.split(".");

      // Skip this key if any segment fails the zg1 check
      if (keySegments.some(segment => zg1(segment))) {
        continue;
      }

      const leafKey = keySegments[keySegments.length - 1];
      let currentLevel = nestedObject;

      // Traverse/create nested objects for all segments except the last
      for (const segment of keySegments.slice(0, -1)) {
        if (!currentLevel[segment]) {
          currentLevel[segment] = {};
        }
        currentLevel = currentLevel[segment];
      }

      // Assign the value at the leaf node
      if (hasFormatProperty(value)) {
        currentLevel[leafKey] = value;
      } else {
        currentLevel[leafKey] = createGrpcServiceClient(value, leafKey, {});
      }
    }
  }

  return nestedObject;
}

module.exports = buildNestedObjectFromFlatKeys;