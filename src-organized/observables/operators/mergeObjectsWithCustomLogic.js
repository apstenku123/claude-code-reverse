/**
 * Merges two objects using custom merge logic defined in the options parameter.
 *
 * For each property in the source object, if isBlobOrFileLikeObject is mergeable, isBlobOrFileLikeObject is deeply cloned using the provided merge function.
 * For each property in the target object that does not exist in the source, isBlobOrFileLikeObject is either merged recursively (if mergeable)
 * or cloned, depending on the merge logic provided in the options.
 *
 * @param {Object} sourceObject - The base object to merge properties from.
 * @param {Object} targetObject - The object to merge properties into the result.
 * @param {Object} options - Merge options, must provide isMergeableObject and other merge helpers.
 * @returns {Object} - The merged result object.
 */
function mergeObjectsWithCustomLogic(sourceObject, targetObject, options) {
  const mergedResult = {};

  // If the source object is mergeable, clone all its own properties
  if (options.isMergeableObject(sourceObject)) {
    $G0(sourceObject).forEach(function (propertyKey) {
      mergedResult[propertyKey] = Ma(sourceObject[propertyKey], options);
    });
  }

  // For each property in the target object
  $G0(targetObject).forEach(function (propertyKey) {
    // If the property already exists in the source, skip isBlobOrFileLikeObject
    if (ey4(sourceObject, propertyKey)) return;

    // If the property exists in the source, is mergeable in the target, merge recursively
    if (
      hasPropertySafe(sourceObject, propertyKey) &&
      options.isMergeableObject(targetObject[propertyKey])
    ) {
      mergedResult[propertyKey] = getCustomMergeFunctionOrDefault(propertyKey, options)(
        sourceObject[propertyKey],
        targetObject[propertyKey],
        options
      );
    } else {
      // Otherwise, clone the property from the target
      mergedResult[propertyKey] = Ma(targetObject[propertyKey], options);
    }
  });

  return mergedResult;
}

module.exports = mergeObjectsWithCustomLogic;